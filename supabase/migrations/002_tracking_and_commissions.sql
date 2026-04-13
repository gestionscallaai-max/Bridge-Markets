-- Crear tabla de clics
CREATE TABLE IF NOT EXISTS clicks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    partner_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    landing_slug TEXT,
    ip_address TEXT,
    user_agent TEXT,
    referer TEXT,
    source TEXT DEFAULT 'direct', -- e.g., 'facebook', 'email', 'google'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de comisiones
CREATE TABLE IF NOT EXISTS commissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    partner_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
    amount DECIMAL(10, 2) DEFAULT 0.00,
    currency TEXT DEFAULT 'USD',
    status TEXT DEFAULT 'pending', -- pending, approved, paid, rejected
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Actualizar tabla de leads para atribución
ALTER TABLE leads ADD COLUMN IF NOT EXISTS click_id UUID REFERENCES clicks(id) ON DELETE SET NULL;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS country_code TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS source TEXT;

-- Habilitar RLS
ALTER TABLE clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE commissions ENABLE ROW LEVEL SECURITY;

-- Políticas para clicks
CREATE POLICY "Partners can view their own clicks"
    ON clicks FOR SELECT
    USING (auth.uid() = partner_id);

CREATE POLICY "Allow public insert for clicks"
    ON clicks FOR INSERT
    WITH CHECK (true); -- Cualquiera puede registrar un clic (tracking)

-- Políticas para commissions
CREATE POLICY "Partners can view their own commissions"
    ON commissions FOR SELECT
    USING (auth.uid() = partner_id);

-- Función para crear comisión automáticamente
CREATE OR REPLACE FUNCTION fn_auto_create_commission()
RETURNS TRIGGER AS $$
BEGIN
    -- Si el estado cambia a 'funded' o 'trading', crear comisión
    IF (NEW.status IN ('funded', 'trading') AND (OLD.status IS NULL OR OLD.status NOT IN ('funded', 'trading'))) THEN
        INSERT INTO commissions (partner_id, lead_id, amount, description, status)
        VALUES (NEW.partner_id, NEW.id, 50.00, 'Comisión automática por lead fondeado: ' || NEW.name, 'pending');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para leads
DROP TRIGGER IF EXISTS trg_lead_funded_commission ON leads;
CREATE TRIGGER trg_lead_funded_commission
AFTER UPDATE ON leads
FOR EACH ROW
EXECUTE FUNCTION fn_auto_create_commission();

-- Índices para rendimiento
CREATE INDEX IF NOT EXISTS idx_clicks_partner ON clicks(partner_id);
CREATE INDEX IF NOT EXISTS idx_commissions_partner ON commissions(partner_id);
CREATE INDEX IF NOT EXISTS idx_leads_partner ON leads(partner_id);
