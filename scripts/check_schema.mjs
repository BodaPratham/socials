
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bktxepugegybrgcnorpv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJrdHhlcHVnZWd5YnJnY25vcnB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxMzYwNTEsImV4cCI6MjA4NTcxMjA1MX0.s8QORUsAKYghqP4UsvGEjIgnkoBSiOKZK4tr9UDDZrE';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
  const { data, error } = await supabase.from('profiles').select('*').limit(1);
  if (error) console.error(error);
  else console.log(Object.keys(data[0] || {}).join(', '));
}

checkSchema();
