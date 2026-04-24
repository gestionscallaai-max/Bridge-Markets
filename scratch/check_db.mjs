  
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing env vars');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
  console.log('--- Checking LEADS table ---');
  const { data: leads, error: leadsErr } = await supabase.from('leads').select('*').limit(1);
  if (leadsErr) {
    console.error('Error fetching leads:', leadsErr);
  } else {
    console.log('Leads columns:', Object.keys(leads[0] || {}));
  }

  console.log('\n--- Checking CLICKS table ---');
  const { data: clicks, error: clicksErr } = await supabase.from('clicks').select('*').limit(1);
  if (clicksErr) {
    console.error('Error fetching clicks:', clicksErr);
  } else {
    console.log('Clicks columns:', Object.keys(clicks[0] || {}));
  }
}

checkSchema();
