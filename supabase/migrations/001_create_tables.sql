-- ============================================================
-- Bridge Markets — Database Schema
-- ============================================================

-- 1. Profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    partner_id TEXT UNIQUE,
    full_name TEXT,
    email TEXT,
    country TEXT,
    whatsapp TEXT,
    role TEXT DEFAULT 'partner',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, partner_id, full_name)
    VALUES (
        NEW.id,
        NEW.email,
        'BM_' || UPPER(SUBSTRING(md5(NEW.id::text) FROM 1 FOR 8)),
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists to avoid errors on re-run
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- 2. Landings table (stores generated landing pages)
CREATE TABLE IF NOT EXISTS public.landings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    html TEXT NOT NULL,
    full_name TEXT,
    country TEXT,
    language TEXT DEFAULT 'ES',
    whatsapp TEXT,
    email TEXT,
    landing_type TEXT DEFAULT 'institucional',
    partner_id TEXT,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.landings ENABLE ROW LEVEL SECURITY;

-- Policies for landings
CREATE POLICY "Anyone can read published landings"
    ON public.landings FOR SELECT
    USING (is_published = true);

CREATE POLICY "Service role can insert landings"
    ON public.landings FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Service role can update landings"
    ON public.landings FOR UPDATE
    USING (true);


-- 3. Leads table (captures form submissions from landings)
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT,
    email TEXT,
    whatsapp TEXT,
    landing_slug TEXT REFERENCES public.landings(slug) ON DELETE SET NULL,
    partner_id TEXT,
    source TEXT DEFAULT 'landing',
    status TEXT DEFAULT 'new',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Policies for leads
CREATE POLICY "Service role can insert leads"
    ON public.leads FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Partners can view their leads"
    ON public.leads FOR SELECT
    USING (true);


-- 4. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_landings_slug ON public.landings(slug);
CREATE INDEX IF NOT EXISTS idx_landings_partner ON public.landings(partner_id);
CREATE INDEX IF NOT EXISTS idx_leads_partner ON public.leads(partner_id);
CREATE INDEX IF NOT EXISTS idx_leads_landing ON public.leads(landing_slug);
CREATE INDEX IF NOT EXISTS idx_profiles_partner_id ON public.profiles(partner_id);
