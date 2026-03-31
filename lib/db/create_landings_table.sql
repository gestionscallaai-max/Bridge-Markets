-- Create landings table
CREATE TABLE public.landings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,      -- The URL slug for the landing page (e.g. 'asd')
    html TEXT NOT NULL,             -- The generated HTML content
    full_name TEXT,                 -- Partner's full name
    country TEXT,                   -- Partner's country
    language TEXT,                  -- Landing page language (e.g., 'ES')
    whatsapp TEXT,                  -- WhatsApp contact number
    email TEXT,                     -- Contact email
    landing_type TEXT,              -- Type of landing page (e.g., 'bursatiles')
    partner_id TEXT NOT NULL,       -- ID of the partner who created it
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Basic indexes for faster querying
CREATE INDEX idx_landings_slug ON public.landings(slug);
CREATE INDEX idx_landings_partner_id ON public.landings(partner_id);

-- Enable Row Level Security (RLS) if needed
ALTER TABLE public.landings ENABLE ROW LEVEL SECURITY;

-- Allow public read access (assuming landing pages should be publicly accessible by slug)
CREATE POLICY "Public profiles are viewable by everyone."
  ON public.landings FOR SELECT
  USING ( true );
