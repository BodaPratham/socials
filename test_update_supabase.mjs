import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';

const supabaseUrl = 'https://bktxepugegybrgcnorpv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJrdHhlcHVnZWd5YnJnY25vcnB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxMzYwNTEsImV4cCI6MjA4NTcxMjA1MX0.s8QORUsAKYghqP4UsvGEjIgnkoBSiOKZK4tr9UDDZrE';
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const currentTs = Date.now();
  let logStr = '';
  
  logStr += '--- SIGNING UP NEW USER ---\n';
  const email = `test_update_${currentTs}@example.com`;
  const { data, error } = await supabase.auth.signUp({
    email,
    password: 'password123'
  });

  if (error) {
    logStr += `Signup Failed: ${error.message}\n`;
    fs.writeFileSync('db_update_output.txt', logStr);
    return;
  }
  
  const user = data.user;
  logStr += `Logged in as: ${user.id}\n`;

  logStr += '--- ATTEMPTING UPDATE ---\n';
  let resUpdate = await supabase.from('profiles').update({ c_username: `testupdate${currentTs}` }).eq('id', user.id).select();
  logStr += `Update Data: ${JSON.stringify(resUpdate.data, null, 2)}\n`;
  logStr += `Update Error: ${resUpdate.error?.message}\n`;

  logStr += '--- FETCHING PROFILE AFTER UPDATE ---\n';
  let resCheck = await supabase.from('profiles').select('*').eq('id', user.id).maybeSingle();
  logStr += `Profile Data Post-Update: ${JSON.stringify(resCheck.data, null, 2)}\n`;

  fs.writeFileSync('db_update_output.txt', logStr);
}

test();
