-- =========================================================================
--  SYNC: AUTH.USERS -> PUBLIC.PROFILES (TRIGGER)
-- =========================================================================

-- Esta función se ejecuta automáticamente cuando un usuario se registra.
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
DECLARE
  new_partner_id TEXT;
BEGIN
  -- Generar un ID de Partner aleatorio (Ej. BM_83749210)
  -- Toma un número al azar entre 10000000 y 99999999
  new_partner_id := 'BM_' || floor(random() * (99999999 - 10000000 + 1) + 10000000)::text;

  -- Inserta la nueva fila en la tabla profiles
  -- NOTA: NEW.raw_user_meta_data->>'full_name' saca el nombre que pasamos en el signUp frontend.
  INSERT INTO public.profiles (id, full_name, partner_id, email, status)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    new_partner_id,
    NEW.email,
    'active'
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Crea el Trigger asociado a la tabla de autenticación (auth.users)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
