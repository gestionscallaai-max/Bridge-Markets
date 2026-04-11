// Script to create tables via Supabase Management API
// Usage: node supabase/create-tables.mjs

const SUPABASE_URL = 'https://tqanafjbzdtrzfwvayub.supabase.co';
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || 'sb_publishable_ejs558dyhzj4fDgAN1rMAA_X_2its2i';

// We'll use the REST API to check if tables exist first
async function checkTables() {
    console.log('🔍 Checking existing tables...\n');
    
    const tables = ['profiles', 'landings', 'leads'];
    
    for (const table of tables) {
        try {
            const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?limit=0`, {
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`,
                }
            });
            
            if (res.ok) {
                console.log(`✅ Table '${table}' exists`);
            } else {
                const text = await res.text();
                console.log(`❌ Table '${table}' - Status ${res.status}: ${text.substring(0, 100)}`);
            }
        } catch (err) {
            console.log(`❌ Table '${table}' - Error: ${err.message}`);
        }
    }
}

checkTables();
