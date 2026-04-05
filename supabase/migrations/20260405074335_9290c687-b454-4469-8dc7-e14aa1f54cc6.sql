
-- Create a public-safe view that excludes email
CREATE OR REPLACE VIEW public.public_builders AS
  SELECT id, name, role, company, country, slug, photo_url, banner_image_url,
         skills, cloud_focus, statement, builder_story, what_building,
         motivation, linkedin, github, portfolio, claim_status, user_id,
         created_at, updated_at
  FROM public.builders;

-- Grant anon access to the view
GRANT SELECT ON public.public_builders TO anon;
GRANT SELECT ON public.public_builders TO authenticated;
