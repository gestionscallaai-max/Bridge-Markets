-- Create the library_docs table
CREATE TABLE IF NOT EXISTS public.library_docs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    file_url TEXT NOT NULL,
    thumbnail_url TEXT,
    category TEXT NOT NULL DEFAULT 'Otros',
    language TEXT NOT NULL DEFAULT 'ES',
    size_bytes BIGINT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.library_docs ENABLE ROW LEVEL SECURITY;

-- Policies
-- 1. Everyone logged in can view
CREATE POLICY "Logged in users can view documents" ON public.library_docs
    FOR SELECT USING (auth.role() = 'authenticated');

-- 2. Only admins can insert/update/delete
CREATE POLICY "Admins have full access to documents" ON public.library_docs
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.partners 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_library_docs_updated_at
BEFORE UPDATE ON public.library_docs
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();
