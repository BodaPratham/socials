import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bktxepugegybrgcnorpv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJrdHhlcHVnZWd5YnJnY25vcnB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxMzYwNTEsImV4cCI6MjA4NTcxMjA1MX0.s8QORUsAKYghqP4UsvGEjIgnkoBSiOKZK4tr9UDDZrE';
// Note: we can't read profiles without auth unless RLS allows it. Let's try.
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false }).limit(5);
  console.log('Latest profiles:', data);
  if (error) console.error(error);
}

check();
