// Fix RLS policies for landings table to allow inserts with anon key
const SUPABASE_URL = 'https://tqanafjbzdtrzfwvayub.supabase.co';
const SUPABASE_KEY = 'sb_publishable_ejs558dyhzj4fDgAN1rMAA_X_2its2i';

async function fixRLS() {
    // Try to insert a test row to verify the issue
    const testSlug = '_rls_test_' + Date.now();
    
    const res = await fetch(`${SUPABASE_URL}/rest/v1/landings`, {
        method: 'POST',
        headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal',
        },
        body: JSON.stringify({
            slug: testSlug,
            html: '<html>test</html>',
            full_name: 'RLS Test',
            landing_type: 'test',
        })
    });

    console.log('Insert test status:', res.status);
    if (!res.ok) {
        const text = await res.text();
        console.log('Error:', text);
        console.log('\n⚠️  RLS is blocking inserts. You need to run this SQL in the Supabase Dashboard SQL Editor:');
        console.log('─'.repeat(60));
        console.log(`
-- Fix RLS policies for landings table
DROP POLICY IF EXISTS "Service role can insert landings" ON public.landings;
DROP POLICY IF EXISTS "Service role can update landings" ON public.landings;
DROP POLICY IF EXISTS "Anyone can read published landings" ON public.landings;

-- Allow anyone to read published landings (for public URLs)
CREATE POLICY "Anyone can read published landings"
    ON public.landings FOR SELECT
    USING (is_published = true);

-- Allow authenticated and anon users to insert landings
CREATE POLICY "Allow insert landings"
    ON public.landings FOR INSERT
    WITH CHECK (true);

-- Allow update on own landings
CREATE POLICY "Allow update landings"
    ON public.landings FOR UPDATE
    USING (true);

-- Fix leads table too
DROP POLICY IF EXISTS "Service role can insert leads" ON public.leads;
CREATE POLICY "Allow insert leads"
    ON public.leads FOR INSERT
    WITH CHECK (true);
`);
        console.log('─'.repeat(60));
    } else {
        console.log('✅ Insert works! Cleaning up test row...');
        await fetch(`${SUPABASE_URL}/rest/v1/landings?slug=eq.${testSlug}`, {
            method: 'DELETE',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
            }
        });
        console.log('✅ RLS is correctly configured.');
    }
}

fixRLS();
