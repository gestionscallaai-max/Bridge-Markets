-- Table for promotional materials (Posts)
CREATE TABLE IF NOT EXISTS public.material_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    filename TEXT NOT NULL,
    file_size BIGINT,
    mime_type TEXT,
    language TEXT DEFAULT 'ES',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.material_posts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Public material_posts are viewable by everyone." ON public.material_posts;
DROP POLICY IF EXISTS "Admin can maintain material_posts." ON public.material_posts;

-- Policy: Everyone (Authenticated Partners) can view
CREATE POLICY "Public material_posts are viewable by everyone."
ON public.material_posts FOR SELECT
USING (true);

-- Policy: Only Admin can insert/update/delete
-- We use WITH CHECK to ensure the user has the 'admin' role when inserting new rows.
CREATE POLICY "Admin can maintain material_posts."
ON public.material_posts FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM public.partners 
        WHERE partners.id = auth.uid() 
        AND partners.role = 'admin'
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.partners 
        WHERE partners.id = auth.uid() 
        AND partners.role = 'admin'
    )
);

-- Extra safety: Grant everything to authenticated users for the table if policies are met
GRANT ALL ON public.material_posts TO authenticated;
GRANT ALL ON public.material_posts TO service_role;
