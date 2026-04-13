-- 1. LIMPIEZA DE TABLAS
TRUNCATE public.materials;

-- 2. POLÍTICAS DE SEGURIDAD (RLS) PARA LANDINGS
DROP POLICY IF EXISTS "Enable insert for all users" ON public.landings;
DROP POLICY IF EXISTS "Enable update for all users" ON public.landings;
DROP POLICY IF EXISTS "Public can insert landings" ON public.landings;
DROP POLICY IF EXISTS "Authenticated users can insert landings" ON public.landings;
DROP POLICY IF EXISTS "Service role can insert landings" ON public.landings;
DROP POLICY IF EXISTS "Service role can update landings" ON public.landings;

-- Permitir inserción y actualización para todos (necesario si la API usa el anon key)
CREATE POLICY "Enable insert for all users" ON public.landings FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON public.landings FOR UPDATE USING (true);

-- 3. POLÍTICAS PARA MATERIALES
DROP POLICY IF EXISTS "Public can view active materials" ON public.materials;
CREATE POLICY "Public can view active materials" ON public.materials FOR SELECT USING (is_active = true);

-- 4. SEMILLADO DE MATERIALES (Categorías alineadas con el Frontend)
-- Categorías: 'Promociones', 'Institucional', 'Prop Firm', 'Divisas', 'Cripto', 'Sintéticos'

INSERT INTO public.materials (name, description, category, type, image_url, download_url, sizes, languages, is_active, is_featured) VALUES
('Premium Chess Advantage', 'Estrategia y ventaja competitiva del broker.', 'Institucional', 'Banner', 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=1200', '#', '{1200x628,1080x1080}', '{ES,GB}', true, true),
('Forex Global Markets', 'Spreads bajos y ejecución ultra-rápida.', 'Divisas', 'Banner', 'https://images.unsplash.com/photo-1611974717482-947312d9326e?q=80&w=1200', '#', '{1200x628}', '{ES,GB,PT}', true, false),
('Crypto Pro Trader', 'Bitcoin y Ethereum con apalancamiento.', 'Cripto', 'Banner', 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=1200', '#', '{1200x628}', '{ES,GB}', true, false),
('Sintéticos 24/7 Mastery', 'Mercados abiertos incluso el fin de semana.', 'Sintéticos', 'Banner', 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1200', '#', '{1200x628}', '{ES,GB}', true, false),
('Prop Firm Opportunity', 'Gestiona capital de terceros con Bridge.', 'Prop Firm', 'Banner', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200', '#', '{1200x628,1080x1080}', '{ES,GB}', true, true),
('Bono Bienvenida 100%', 'Atrae nuevos clientes con nuestro bono estrella.', 'Promociones', 'Banner', 'https://images.unsplash.com/photo-1614028674126-6329e41f2ff3?q=80&w=1200', '#', '{1200x628}', '{ES,GB}', true, true),
('Elite Institutional', 'Servicios VIP para grandes cuentas.', 'Institucional', 'Banner', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200', '#', '{1200x628}', '{ES,GB}', true, false);
