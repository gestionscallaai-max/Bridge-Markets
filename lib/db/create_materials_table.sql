-- ============================================================
-- Tabla: materials
-- Permite al admin subir materiales promocionales dinámicos
-- que los partners pueden ver y descargar desde el panel.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.materials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    
    -- Identificación del material
    name TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL CHECK (category IN ('Forex', 'Metales Preciosos', 'Acciones', 'Criptomonedas', 'Índices Bursátiles', 'Índices Sintéticos', 'Promociones')),
    type TEXT NOT NULL DEFAULT 'banner' CHECK (type IN ('banner', 'landing', 'video', 'copy')),
    
    -- Archivos / Assets
    image_url TEXT,            -- URL pública de la imagen de previsualización
    download_url TEXT,         -- URL del archivo descargable (PNG, ZIP, etc)
    
    -- Metadatos adicionales
    sizes TEXT[],              -- Ej: ARRAY['300x250', '728x90']
    languages TEXT[],          -- Ej: ARRAY['es', 'en', 'pt']
    is_active BOOLEAN NOT NULL DEFAULT true,
    is_featured BOOLEAN NOT NULL DEFAULT false
);

-- RLS: Por ahora solo lectura pública (cualquier partner autenticado puede verlos)
ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Partners can view active materials" ON public.materials;
CREATE POLICY "Partners can view active materials"
    ON public.materials FOR SELECT
    USING (is_active = true);

-- Solo admins podrán insertar/actualizar (usar service_role desde backend)
-- Para admin panel, usar la service_role key y deshabilitar RLS en esa llamada.

-- ============================================================
-- Datos iniciales (seed) — Los mismos que ya tienes en código
-- ============================================================

INSERT INTO public.materials (name, description, category, type, sizes, languages, is_featured) VALUES
    ('Forex Spread Bajo', 'Banner campaña spread cero en majors', 'Forex', 'banner', ARRAY['300x250', '728x90', '1248x600', '160x600'], ARRAY['es', 'en', 'pt'], true),
    ('Forex Pro Trader', 'Banner para traders avanzados', 'Forex', 'banner', ARRAY['300x250', '728x90', '1248x600'], ARRAY['es', 'en'], false),
    ('Prop Firm Challenge', 'Banner fondeo hasta $200K USD', 'Promociones', 'banner', ARRAY['300x250', '728x90', '1248x600'], ARRAY['es', 'en', 'pt'], true),
    ('Gold Trading', 'Banner campaña XAUUSD', 'Metales Preciosos', 'banner', ARRAY['300x250', '728x90', '1248x600'], ARRAY['es', 'pt'], false),
    ('Crypto Bull Run', 'Banner campaña cripto alcista', 'Criptomonedas', 'banner', ARRAY['300x250', '728x90', '1248x600'], ARRAY['es', 'pt'], true),
    ('Índices Globales', 'Banner principales índices mundiales', 'Índices Bursátiles', 'banner', ARRAY['300x250', '728x90', '1248x600', '160x600'], ARRAY['es', 'en', 'pt'], false)
ON CONFLICT DO NOTHING;
