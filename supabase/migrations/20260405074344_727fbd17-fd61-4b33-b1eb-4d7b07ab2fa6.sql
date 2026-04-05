
-- Recreate view with SECURITY INVOKER to respect querying user's RLS
CREATE OR REPLACE VIEW public.public_builders
WITH (security_invoker = true) AS
  SELECT id, name, role, company, country, slug, photo_url, banner_image_url,
         skills, cloud_focus, statement, builder_story, what_building,
         motivation, linkedin, github, portfolio, claim_status, user_id,
         created_at, updated_at
  FROM public.builders;
