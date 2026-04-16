const { createClient } = require('@supabase/supabase-js');
// I'll use the values found in .env.local
const supabaseUrl = 'https://tqanafjbzdtrzfwvayub.supabase.co';
const supabaseKey = 'sb_publishable_ejs558dyhzj4fDgAN1rMAA_X_2its2i'; // This is publishable
// I need the service role key to bypass RLS. 
// I'll try to find it in the files.
