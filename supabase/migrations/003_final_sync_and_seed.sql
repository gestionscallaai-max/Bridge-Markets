-- ============================================================
-- Bridge Markets — Sincronización Final de Funcionalidad
-- ============================================================

-- 1. Asegurar consistencia en la tabla de Comisiones
DO $$ 
BEGIN
    -- Renombrar 'type' a 'description' si existe para no perder datos
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='commissions' AND column_name='type') THEN
        ALTER TABLE public.commissions RENAME COLUMN type TO description;
    END IF;

    -- Añadir columna de moneda si no existe
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='commissions' AND column_name='currency') THEN
        ALTER TABLE public.commissions ADD COLUMN currency TEXT DEFAULT 'USD';
    END IF;
END $$;

-- 2. Asegurar que Partner ID en Landings sea consistente
-- Cambiamos a TEXT para soportar tanto UUID como Friendly IDs (BM_...)
ALTER TABLE public.landings ALTER COLUMN partner_id TYPE TEXT;

-- 3. Trigger de Comisiones Automáticas
-- Esta función crea una comisión de $50 USD cuando un lead es marcado como 'funded'
CREATE OR REPLACE FUNCTION public.fn_auto_create_commission()
RETURNS TRIGGER AS $$
BEGIN
    IF (NEW.status = 'funded' AND (OLD.status IS NULL OR OLD.status != 'funded')) THEN
        INSERT INTO public.commissions (partner_id, lead_id, amount, description, status, currency)
        VALUES (NEW.partner_id, NEW.id, 50.00, 'Comisión por Lead Fondeado: ' || NEW.name, 'pending', 'USD');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_lead_funded_commission ON public.leads;
CREATE TRIGGER trg_lead_funded_commission
    AFTER UPDATE ON public.leads
    FOR EACH ROW EXECUTE FUNCTION public.fn_auto_create_commission();

-- 4. Seeding de Materiales Premium (Banners)
-- Limpiamos primero para evitar duplicados en esta entrega
DELETE FROM public.materials WHERE category IN ('Institucional', 'Forex', 'Cripto', 'Prop Firm', 'Índices');

INSERT INTO public.materials (name, description, category, type, image_url, download_url, sizes, languages, is_active, is_featured)
VALUES 
('Bono 100% Bienvenida', 'Banner promocional para nuevos clientes con bono de depósito.', 'Promociones', 'Banner', 'https://images.unsplash.com/photo-1611974717482-947312d9326e?q=80&w=800', '#', ARRAY['1200x628', '1080x1080'], ARRAY['ES', 'GB', 'PT'], true, true),
('Trading Institucional Pro', 'Enfoque en spreads bajos y ejecución ECN.', 'Institucional', 'Banner', 'https://images.unsplash.com/photo-1642388691910-867df309995c?q=80&w=800', '#', ARRAY['1200x628'], ARRAY['ES', 'GB'], true, true),
('Forex Market Global', 'Principales pares de divisas con apalancamiento ajustable.', 'Forex', 'Banner', 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=800', '#', ARRAY['1080x1080'], ARRAY['ES', 'GB', 'FR'], true, true),
('Cripto Evolution', 'Trading de BTC, ETH y más 24/7 sin interrupciones.', 'Cripto', 'Banner', 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800', '#', ARRAY['1200x628'], ARRAY['ES', 'GB'], true, false),
('Prop Firm Challenge', 'Gana una cuenta fondeada demostrando tus habilidades.', 'Prop Firm', 'Banner', 'https://images.unsplash.com/photo-1644624136979-450aa228807d?q=80&w=800', '#', ARRAY['1080x1080'], ARRAY['ES', 'GB'], true, false),
('Sintéticos 24/7', 'Volatilidad constante en mercados sintéticos.', 'Índices', 'Banner', 'https://images.unsplash.com/photo-1614028674126-6329e47444cb?q=80&w=800', '#', ARRAY['1200x628'], ARRAY['ES'], true, false);

-- 5. Políticas de RLS para visibilidad total del Partner
-- Aseguramos que el Partner pueda ver sus propios datos
DROP POLICY IF EXISTS "Partners can view their own commissions" ON public.commissions;
CREATE POLICY "Partners can view their own commissions" ON public.commissions
    FOR SELECT USING (auth.uid()::text = partner_id OR partner_id = (SELECT partner_id FROM public.profiles WHERE id = auth.uid()));

DROP POLICY IF EXISTS "Partners can view their own leads" ON public.leads;
CREATE POLICY "Partners can view their own leads" ON public.leads
    FOR SELECT USING (auth.uid()::text = partner_id OR partner_id = (SELECT partner_id FROM public.profiles WHERE id = auth.uid()));
