import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bktxepugegybrgcnorpv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJrdHhlcHVnZWd5YnJnY25vcnB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxMzYwNTEsImV4cCI6MjA4NTcxMjA1MX0.s8QORUsAKYghqP4UsvGEjIgnkoBSiOKZK4tr9UDDZrE';

const supabase = createClient(supabaseUrl, supabaseKey);

function slugify(text) {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w-]+/g, '')     // Remove all non-word chars
    .replace(/--+/g, '-')       // Replace multiple - with single -
    .replace(/^-+/, '')         // Trim - from start of text
    .replace(/-+$/, '');        // Trim - from end of text
}

async function migrate() {
  console.log('Fetching all profiles...');
  const { data: profiles, error } = await supabase.from('profiles').select('id, c_username');
  
  if (error) {
    console.error('Fetch error:', error);
    return;
  }

  console.log(`Found ${profiles.length} profiles. Normalizing...`);

  for (const profile of profiles) {
    const original = profile.c_username;
    const normalized = slugify(original);
    
    if (original !== normalized) {
      console.log(`Updating "${original}" -> "${normalized}"`);
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ c_username: normalized })
        .eq('id', profile.id);
      
      if (updateError) {
        console.error(`Error updating profile ${profile.id}:`, updateError.message);
      }
    } else {
        console.log(`Skipping "${original}" (already normalized)`);
    }
  }

  console.log('Migration complete.');
}

migrate();
