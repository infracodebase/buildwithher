
-- Drop foreign key to auth.users (Clerk manages users externally)
ALTER TABLE public.builders DROP CONSTRAINT IF EXISTS builders_user_id_fkey;

-- Drop policies that depend on user_id column
DROP POLICY IF EXISTS "Owners can update their builder profile" ON public.builders;
DROP POLICY IF EXISTS "Authenticated users can claim unclaimed profiles" ON public.builders;

-- Change user_id type to text for Clerk user IDs
ALTER TABLE public.builders ALTER COLUMN user_id TYPE text USING user_id::text;

-- Recreate update policy compatible with Clerk JWT
CREATE POLICY "Owners can update their builder profile"
ON public.builders
FOR UPDATE
TO authenticated
USING ((auth.jwt() ->> 'sub') = user_id)
WITH CHECK ((auth.jwt() ->> 'sub') = user_id);

-- Fix claim_requests table too
ALTER TABLE public.claim_requests DROP CONSTRAINT IF EXISTS claim_requests_claimer_user_id_fkey;

DROP POLICY IF EXISTS "Authenticated users can submit claim requests" ON public.claim_requests;
DROP POLICY IF EXISTS "Users can view own claim requests" ON public.claim_requests;

ALTER TABLE public.claim_requests ALTER COLUMN claimer_user_id TYPE text USING claimer_user_id::text;

CREATE POLICY "Authenticated users can submit claim requests"
ON public.claim_requests
FOR INSERT
TO authenticated
WITH CHECK ((auth.jwt() ->> 'sub') = claimer_user_id);

CREATE POLICY "Users can view own claim requests"
ON public.claim_requests
FOR SELECT
TO authenticated
USING ((auth.jwt() ->> 'sub') = claimer_user_id);
