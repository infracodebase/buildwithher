
-- Add email column for secure ownership linking
ALTER TABLE public.builders ADD COLUMN IF NOT EXISTS email text;

-- Add claim_status to track ownership state
-- 'unclaimed' = no owner, 'pending' = claim request submitted, 'claimed' = linked to user
ALTER TABLE public.builders ADD COLUMN IF NOT EXISTS claim_status text NOT NULL DEFAULT 'unclaimed';

-- Create index on email for fast lookups during auto-linking
CREATE INDEX IF NOT EXISTS idx_builders_email ON public.builders (email) WHERE email IS NOT NULL;

-- Create index on claim_status for filtering
CREATE INDEX IF NOT EXISTS idx_builders_claim_status ON public.builders (claim_status);

-- Create claim_requests table for secure manual claims (Case 3)
CREATE TABLE IF NOT EXISTS public.claim_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  builder_id uuid NOT NULL REFERENCES public.builders(id) ON DELETE CASCADE,
  claimer_user_id uuid NOT NULL,
  claimer_email text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  resolved_at timestamptz,
  UNIQUE(builder_id, claimer_user_id)
);

ALTER TABLE public.claim_requests ENABLE ROW LEVEL SECURITY;

-- Anyone authenticated can submit a claim request
CREATE POLICY "Authenticated users can submit claim requests"
ON public.claim_requests FOR INSERT TO authenticated
WITH CHECK (auth.uid() = claimer_user_id);

-- Users can view their own claim requests
CREATE POLICY "Users can view own claim requests"
ON public.claim_requests FOR SELECT TO authenticated
USING (auth.uid() = claimer_user_id);

-- Update the builders update policy to also allow setting user_id when claim_status is unclaimed and user_id is null
-- This enables the auto-link flow (Case 1 & 2)
-- Drop and recreate the update policy to be more precise
DROP POLICY IF EXISTS "Users can update their own builder profile" ON public.builders;

-- Owner can update their profile
CREATE POLICY "Owners can update their builder profile"
ON public.builders FOR UPDATE TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Allow authenticated users to claim unclaimed profiles (set user_id) 
-- Only when user_id is currently null (prevents overwriting)
CREATE POLICY "Authenticated users can claim unclaimed profiles"
ON public.builders FOR UPDATE TO authenticated
USING (user_id IS NULL)
WITH CHECK (user_id = auth.uid());
