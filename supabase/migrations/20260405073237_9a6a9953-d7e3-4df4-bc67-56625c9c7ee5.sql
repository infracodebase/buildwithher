
-- Fix 1: Restrict builder profile INSERT to authenticated users with identity match
DROP POLICY IF EXISTS "Anyone can submit a builder profile" ON public.builders;

CREATE POLICY "Authenticated users can create their own profile"
ON public.builders
FOR INSERT
TO authenticated
WITH CHECK ((auth.jwt() ->> 'sub'::text) = user_id);

-- Fix 2: Restrict builder-photos uploads to authenticated users with path ownership
DROP POLICY IF EXISTS "Anyone can upload builder photos" ON storage.objects;

CREATE POLICY "Authenticated users can upload builder photos"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'builder-photos'
  AND (storage.foldername(name))[1] = (auth.jwt() ->> 'sub'::text)
);

-- Fix 3: Scope profile-banners UPDATE to own files
DROP POLICY IF EXISTS "Users can update their own banners" ON storage.objects;

CREATE POLICY "Users can update their own banners"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'profile-banners'
  AND (storage.foldername(name))[1] = (auth.jwt() ->> 'sub'::text)
);

-- Fix 4: Scope profile-banners INSERT to own folder
DROP POLICY IF EXISTS "Authenticated users can upload profile banners" ON storage.objects;

CREATE POLICY "Authenticated users can upload profile banners"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'profile-banners'
  AND (storage.foldername(name))[1] = (auth.jwt() ->> 'sub'::text)
);

-- Fix 5: Add DELETE policies for storage cleanup
CREATE POLICY "Users can delete their own builder photos"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'builder-photos'
  AND (storage.foldername(name))[1] = (auth.jwt() ->> 'sub'::text)
);

CREATE POLICY "Users can delete their own banners"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'profile-banners'
  AND (storage.foldername(name))[1] = (auth.jwt() ->> 'sub'::text)
);
