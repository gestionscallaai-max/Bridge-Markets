import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// Manually parse .env.local
const env = fs.readFileSync('.env.local', 'utf8')
    .split('\n')
    .reduce((acc, line) => {
        const [key, ...val] = line.split('=');
        if (key && val) acc[key.trim()] = val.join('=').trim();
        return acc;
    }, {});

const supabase = createClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY // Use anon key for now, if RLS permits public insert
);

async function checkContext() {
    try {
        const { data: partners } = await supabase.from('partners').select('id, name').limit(5);
        const { data: landings } = await supabase.from('landings').select('slug').limit(5);
        
        console.log('PARTNERS_FOUND:', partners);
        console.log('LANDINGS_FOUND:', landings);
    } catch (e) {
        console.error('ERROR:', e);
    }
}

checkContext();
