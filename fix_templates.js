const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const envPath = 'd:/WHITE DIGITALS/Pratham/Socials/socials/.env.local';
const envContent = fs.readFileSync(envPath, 'utf8');
const urlMatch = envContent.match(/NEXT_PUBLIC_SUPABASE_URL=(.+)/);
const keyMatch = envContent.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.+)/);

if (!urlMatch || !keyMatch) {
  console.error('Could not find Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(urlMatch[1].trim(), keyMatch[1].trim());

async function fixTemplates() {
  const { data: templates, error: fetchErr } = await supabase.from('templates').select('*');
  
  if (fetchErr) {
    console.error('Fetch error:', fetchErr);
    return;
  }
  
  console.log(`Found ${templates.length} templates.`);
  
  for (const tpl of templates) {
    let price = 0;
    let config = { ...tpl.config };
    let changed = false;
    
    // Check price
    if (tpl.price !== 0) {
      changed = true;
    }
    
    // Check contrast (very simplified: if exact same or close)
    if (config.bgColor && config.pageTextColor) {
      const bg = config.bgColor.toLowerCase();
      const text = config.pageTextColor.toLowerCase();
      if (bg === text) {
        // If dark bg, use white text, else black
        // Just arbitrarily assigning white to #000000 and black to #FFFFFF
        config.pageTextColor = bg === '#ffffff' || bg === '#fff' ? '#000000' : '#ffffff';
        changed = true;
      }
    }
    
    if (changed) {
      console.log(`Updating ${tpl.name}...`);
      await supabase.from('templates').update({ price: 0, config }).eq('id', tpl.id);
    }
  }
  
  console.log('Done fixing templates.');
}

fixTemplates();
