import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const envFile = fs.readFileSync('.env.local', 'utf8');
const env = envFile.split('\n').reduce((acc, line) => {
    const [key, ...val] = line.split('=');
    if (key && val) acc[key.trim()] = val.join('=').trim();
    return acc;
}, {});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY);

async function verify() {
    const { count: clicks } = await supabase.from('clicks').select('*', { count: 'exact', head: true });
    const { count: leads } = await supabase.from('leads').select('*', { count: 'exact', head: true });
    
    console.log(`TOTAL CLICKS: ${clicks}`);
    console.log(`TOTAL LEADS: ${leads}`);
}

verify();
