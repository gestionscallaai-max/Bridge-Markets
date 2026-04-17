import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const envFile = fs.readFileSync('.env.local', 'utf8');
const env = envFile.split('\n').reduce((acc, line) => {
    const [key, ...val] = line.split('=');
    if (key && val) acc[key.trim()] = val.join('=').trim();
    return acc;
}, {});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY);

async function discover() {
    console.log('--- VERBOSE DISCOVERY ---');
    const { data: clicks, error: cErr } = await supabase.from('clicks').select('*').limit(5);
    console.log('CLICKS DATA:', JSON.stringify(clicks, null, 2));
    if (cErr) console.log('CLICKS ERR:', cErr);

    const { data: leads, error: lErr } = await supabase.from('leads').select('*').limit(5);
    console.log('LEADS DATA:', JSON.stringify(leads, null, 2));
    if (lErr) console.log('LEADS ERR:', lErr);
}

discover();
