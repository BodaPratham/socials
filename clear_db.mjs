import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bktxepugegybrgcnorpv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJrdHhlcHVnZWd5YnJnY25vcnB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxMzYwNTEsImV4cCI6MjA4NTcxMjA1MX0.s8QORUsAKYghqP4UsvGEjIgnkoBSiOKZK4tr9UDDZrE';

const supabase = createClient(supabaseUrl, supabaseKey);

async function clear() {
  console.log('Clearing old mocked data to fix dashboard freezing and fresh start...');
  const tables = ['page_visits', 'link_clicks', 'marketplace_transactions', 'contacts', 'products', 'links', 'profiles'];
  for (const table of tables) {
    const { error } = await supabase.from(table).delete().neq('id', '00000000-0000-0000-0000-000000000000');
    console.log(`Cleared ${table}:`, error ? error.message : 'Success');
  }
}
clear();
