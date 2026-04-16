-- ============================================================
-- Migration: Add role + referral_link fields to partners table
-- Run this in Supabase SQL Editor
-- ============================================================

-- 1. Add role column (if it doesn't exist)
ALTER TABLE public.partners ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'partner_view';

-- 2. Add referral_link column (if it doesn't exist)
ALTER TABLE public.partners ADD COLUMN IF NOT EXISTS referral_link TEXT;

-- 3. Update existing partner accounts to partner_view role
--    (only updates rows where role is NULL or 'partner', skips admins)
UPDATE public.partners 
SET role = 'partner_view' 
WHERE role IS NULL OR role = 'partner';

-- 4. Update the trigger to assign partner_view role + save referral_link
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
