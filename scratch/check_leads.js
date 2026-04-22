
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
    console.error('Missing URL or Key');
    process.exit(1);
}

const supabase = createClient(url, key);

async function check() {
    // Intentar leer un lead o simplemente describir la tabla si es posible
    const { data, error } = await supabase
        .from('leads')
        .select('*')
        .limit(1);
    
    if (error) {
        console.error('Error accessing leads table:', error);
    } else {
        console.log('Successfully accessed leads table. Sample:', data);
    }
}

check();
