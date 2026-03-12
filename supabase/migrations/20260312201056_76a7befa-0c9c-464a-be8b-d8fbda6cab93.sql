-- Create builders table for community submissions
CREATE TABLE public.builders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  photo_url TEXT,
  country TEXT NOT NULL,
  role TEXT NOT NULL,
  company TEXT,
  cloud_focus TEXT[] DEFAULT '{}',
  skills TEXT[] DEFAULT '{}',
  what_building TEXT,
  statement TEXT,
  linkedin TEXT,
  github TEXT,
  portfolio TEXT,
  slug TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.builders ENABLE ROW LEVEL SECURITY;

-- Anyone can view builders (public wall)
CREATE POLICY "Builders are viewable by everyone"
  ON public.builders FOR SELECT USING (true);

-- Anyone can submit (no auth required for community submissions)
CREATE POLICY "Anyone can submit a builder profile"
  ON public.builders FOR INSERT WITH CHECK (true);

-- Create storage bucket for builder photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('builder-photos', 'builder-photos', true);

-- Public read access for builder photos
CREATE POLICY "Builder photos are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'builder-photos');

-- Anyone can upload builder photos
CREATE POLICY "Anyone can upload builder photos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'builder-photos');

-- Enable realtime for builders table
ALTER PUBLICATION supabase_realtime ADD TABLE builders;