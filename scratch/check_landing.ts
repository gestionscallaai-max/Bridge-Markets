    
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(url, key);

async function check() {
    const { data, error } = await supabase
        .from('landings')
        .select('slug, status')
        .eq('slug', 'prop_official_v3-es-1776829007838')
        .single();
    
    console.log('Landing Data:', data);
    console.log('Error:', error);
}

check();
