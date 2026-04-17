import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkContext() {
    const { data: partners } = await supabase.from('partners').select('id, name, role').limit(5);
    const { data: landings } = await supabase.from('landings').select('slug, partner_id').limit(5);
    
    console.log('PARTNERS:', JSON.stringify(partners, null, 2));
    console.log('LANDINGS:', JSON.stringify(landings, null, 2));
}

checkContext();
