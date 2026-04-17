import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const envFile = fs.readFileSync('.env.local', 'utf8');
const env = envFile.split('\n').reduce((acc, line) => {
    const [key, ...val] = line.split('=');
    if (key && val) acc[key.trim()] = val.join('=').trim();
    return acc;
}, {});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function checkSchema() {
    console.log('--- CHECKING LEADS SCHEMA ---');
    const { data, error } = await supabase.rpc('get_table_info', { table_name: 'leads' });
    
    // If RPC fails (likely), we try a simple select
    const { data: lead, error: err2 } = await supabase.from('leads').select('*').limit(1);
    
    if (lead && lead.length > 0) {
        console.log('Columns found in leads:', Object.keys(lead[0]));
    } else {
        console.log('Could not get columns (no data). Try querying pg_attribute via RPC or checking the error message.');
        // Try a dummy insert to see the error message which often hints at columns
        const { error: err3 } = await supabase.from('leads').insert({ dummy_col: 'test' });
        console.log('Insert error hint:', err3?.message);
    }
}

checkSchema();
