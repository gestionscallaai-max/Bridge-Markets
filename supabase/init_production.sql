-- init_production.sql
-- Archivo Maestro para Inicializar Base de Datos en Producción para Bridge Markets

-- Habilitar extensión UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Table: partners
CREATE TABLE IF NOT EXISTS public.partners (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    tier TEXT DEFAULT 'Silver',
    role TEXT DEFAULT 'partner_view', -- 'admin', 'partner', 'partner_view'
    referral_link TEXT, -- Link de referido del partner
    wallet_balance NUMERIC DEFAULT 0.00,
    monthly_goal INTEGER DEFAULT 100,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Table: landings
CREATE TABLE IF NOT EXISTS public.landings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    partner_id UUID REFERENCES public.partners(id) ON DELETE CASCADE,
    landing_type TEXT NOT NULL,
    language TEXT NOT NULL,
    html TEXT NOT NULL,
    data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Table: leads
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    partner_id UUID REFERENCES public.partners(id) ON DELETE CASCADE,
    landing_slug TEXT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    country TEXT,
    status TEXT DEFAULT 'new',
    source TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Table: clicks (Tracking Web)
CREATE TABLE IF NOT EXISTS public.clicks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    partner_id UUID REFERENCES public.partners(id) ON DELETE CASCADE,
    landing_slug TEXT,
    ip_address TEXT,
    user_agent TEXT,
    country TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Table: referral_links
CREATE TABLE IF NOT EXISTS public.referral_links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    partner_id UUID REFERENCES public.partners(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    clicks INTEGER DEFAULT 0,
    campaigns TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Table: localized_assets (Banners History - Material Post)
CREATE TABLE IF NOT EXISTS public.localized_assets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    partner_id UUID REFERENCES public.partners(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    format TEXT NOT NULL,
    market TEXT NOT NULL,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================
-- RECORD LEVEL SECURITY (RLS) - UPDATED FOR ROLES
-- ==========================================

ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.landings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referral_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.localized_assets ENABLE ROW LEVEL SECURITY;

-- Helper function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.partners 
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Partners: Sólo ven y editan su perfil (Admins ven todo)
DROP POLICY IF EXISTS "Users can view their own partner profile" ON public.partners;
CREATE POLICY "Users can view their own partner profile" ON public.partners FOR SELECT USING (auth.uid() = id OR public.is_admin());

DROP POLICY IF EXISTS "Users can update their own partner profile" ON public.partners;
CREATE POLICY "Users can update their own partner profile" ON public.partners FOR UPDATE USING (auth.uid() = id OR public.is_admin());

-- Landings: Público SELECT, Owner admin (Admins ven todo)
DROP POLICY IF EXISTS "Public can read landings by slug" ON public.landings;
CREATE POLICY "Public can read landings by slug" ON public.landings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Partners manage their own landings" ON public.landings;
CREATE POLICY "Partners manage their own landings" ON public.landings FOR ALL USING (auth.uid() = partner_id OR public.is_admin());

-- Leads: Owner ve los suyos, Público inserta (Admins ven todo)
DROP POLICY IF EXISTS "Partners view their own leads" ON public.leads;
CREATE POLICY "Partners view their own leads" ON public.leads FOR SELECT USING (auth.uid() = partner_id OR public.is_admin());

DROP POLICY IF EXISTS "Public can insert leads" ON public.leads;
CREATE POLICY "Public can insert leads" ON public.leads FOR INSERT WITH CHECK (true);

-- Clicks: Owner tracking, Público inserta (Admins ven todo)
DROP POLICY IF EXISTS "Partners view their own clicks" ON public.clicks;
CREATE POLICY "Partners view their own clicks" ON public.clicks FOR SELECT USING (auth.uid() = partner_id OR public.is_admin());

DROP POLICY IF EXISTS "Public can insert clicks" ON public.clicks;
CREATE POLICY "Public can insert clicks" ON public.clicks FOR INSERT WITH CHECK (true);

-- Referral Links: Propios del Owner (Admins ven todo)
DROP POLICY IF EXISTS "Partners manage their own referral links" ON public.referral_links;
CREATE POLICY "Partners manage their own referral links" ON public.referral_links FOR ALL USING (auth.uid() = partner_id OR public.is_admin());

-- Localized Assets: Propios del Owner (Admins ven todo)
DROP POLICY IF EXISTS "Partners manage their own localized assets" ON public.localized_assets;
CREATE POLICY "Partners manage their own localized assets" ON public.localized_assets FOR ALL USING (auth.uid() = partner_id OR public.is_admin());

-- ==========================================
-- AUTO CREACIÓN DE PERFIL PARTNER AL REGISTRAR (TRIGGER)
-- ==========================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.partners (id, name, email, role, referral_link)
  VALUES (
    new.id, 
    COALESCE(new.raw_user_meta_data->>'full_name', 'Nuevo Partner'), 
    new.email,
    'partner_view',
    COALESCE(new.raw_user_meta_data->>'referral_link', NULL)
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- FIN DEL DOCUMENTO
