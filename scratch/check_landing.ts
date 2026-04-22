    
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(url, key);

async function check() {
    const slug = 'institutional_mother-es-1776869703896';
    const { data, error } = await supabase
        .from('landings')
        .select('id, slug, status, created_at')
        .eq('slug', slug);
    
    console.log('Results for slug:', slug);
    console.log(JSON.stringify(data, null, 2));
    if (error) console.error('Error:', error);
}

check();
