
-- Add new columns to builders table
ALTER TABLE public.builders 
  ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS banner_image_url TEXT,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Create profile-banners storage bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('profile-banners', 'profile-banners', true)
ON CONFLICT (id) DO NOTHING;

-- RLS policy: allow authenticated users to update their own builder profile
CREATE POLICY "Users can update their own builder profile"
ON public.builders
FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Storage RLS: allow authenticated users to upload to profile-banners
CREATE POLICY "Anyone can view profile banners"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'profile-banners');

CREATE POLICY "Authenticated users can upload profile banners"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'profile-banners');

CREATE POLICY "Users can update their own banners"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'profile-banners');
