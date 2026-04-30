
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bktxepugegybrgcnorpv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJrdHhlcHVnZWd5YnJnY25vcnB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxMzYwNTEsImV4cCI6MjA4NTcxMjA1MX0.s8QORUsAKYghqP4UsvGEjIgnkoBSiOKZK4tr9UDDZrE';

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const usernameWithSpace = 'Pratham Socials';
  console.log(`Inserting test profile with handle: "${usernameWithSpace}"`);
  
  const { data, error } = await supabase.from('profiles').insert({
    id: '00000000-0000-4000-a000-000000000001',
    username: 'prathamsocials',
    c_username: usernameWithSpace,
    bio: 'Test profile with space'
  }).select();

  if (error) console.error("Insert Error:", error.message);
  else console.log("Inserted:", data);
}

test();
