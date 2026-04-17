import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// Manually parse .env.local
const envFile = fs.readFileSync('.env.local', 'utf8');
const env = envFile.split('\n').reduce((acc, line) => {
    const [key, ...val] = line.split('=');
    if (key && val) acc[key.trim()] = val.join('=').trim();
    return acc;
}, {});

const supabase = createClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
);

async function checkContext() {
    console.log('--- DB CONTEXT CHECK ---');
    console.log('URL:', env.NEXT_PUBLIC_SUPABASE_URL);

    try {
        const { data: partners, error: pError } = await supabase.from('partners').select('id, name, role').limit(5);
        if (pError) throw pError;
        
        const { data: landings, error: lError } = await supabase.from('landings').select('slug, partner_id').limit(5);
        if (lError) throw lError;

        console.log('PARTNERS:', partners);
        console.log('LANDINGS:', landings);
    } catch (e) {
        console.error('FETCH ERROR:', e.message);
    }
}

checkContext();
