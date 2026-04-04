import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// Using anon key or service role key. Anon might work if RLS allows upsert, but usually RLS blocks it.
// If RLS blocks, we might need to bypass it or run it directly. Let's try with anon key first.
const supabase = createClient(supabaseUrl, supabaseKey);

const templates = [
  {
    id: 'univ-cyber-neon', name: 'Neon Apex', creator_id: null, price: 9, is_approved: true, category: 'Pro', description: 'Deep obsidian canvas with striking hyper-neon accents.', 
    config: {"theme": "Cyber", "bgColor": "#0A0A0A", "btnColor": "#CCFF00", "btnTextColor": "#0A0A0A", "buttonStyle": "Solid", "buttonRoundness": "Square", "buttonShadow": "Hard", "buttonBorder": "None", "pageFont": "Space Grotesk", "pageTextColor": "#F5F5F5"}
  },
  {
    id: 'univ-quantus', name: 'Royal Quantus', creator_id: null, price: 9, is_approved: true, category: 'Pro', description: 'Majestic dark haiti purple with electric violet interactables.', 
    config: {"theme": "Quantus", "bgColor": "#0B0716", "btnColor": "#7D53FF", "btnTextColor": "#FFFFFF", "buttonStyle": "Solid", "buttonRoundness": "Round", "buttonShadow": "Glow", "buttonBorder": "None", "pageFont": "Syne", "pageTextColor": "#F4F4F5"}
  },
  {
    id: 'univ-space', name: 'Obsidian Grotesk', creator_id: null, price: 0, is_approved: true, category: 'Classic', description: 'High-contrast industrial minimalism for the modern creator.', 
    config: {"theme": "Space", "bgColor": "#050505", "btnColor": "#E5A900", "btnTextColor": "#050505", "buttonStyle": "Solid", "buttonRoundness": "Square", "buttonShadow": "None", "buttonBorder": "Thin", "pageFont": "Space Grotesk", "pageTextColor": "#EFEFEF"}
  },
  {
    id: 'univ-agrypto', name: 'Executive Cobalt', creator_id: null, price: 9, is_approved: true, category: 'Pro', description: 'Sophisticated midnight blue with vibrant violet-blue highlights.', 
    config: {"theme": "Agrypto", "bgColor": "#080B1A", "btnColor": "#5A32FA", "btnTextColor": "#FFFFFF", "buttonStyle": "Solid", "buttonRoundness": "Rounder", "buttonShadow": "Soft", "buttonBorder": "None", "pageFont": "Inter", "pageTextColor": "#F8F9FA"}
  },
  {
    id: 'univ-ecorix', name: 'Aura Olive', creator_id: null, price: 0, is_approved: true, category: 'Classic', description: 'Understated luxury. Earthy dark tones with pure yellow highlights.', 
    config: {"theme": "Ecorix", "bgColor": "#1A1C14", "btnColor": "#D4F000", "btnTextColor": "#1A1C14", "buttonStyle": "Outline", "buttonRoundness": "Full", "buttonShadow": "None", "buttonBorder": "Thick", "pageFont": "Outfit", "pageTextColor": "#FAFAFA"}
  },
  {
    id: 'univ-soundix-ocean', name: 'Abyssal Pulse', creator_id: null, price: 0, is_approved: true, category: 'Classic', description: 'Deep oceanic navy with sharp, high-end cyan interactables.', 
    config: {"theme": "Pulse", "bgColor": "#05101E", "btnColor": "#00E5FF", "btnTextColor": "#000000", "buttonStyle": "Glass", "buttonRoundness": "Round", "buttonShadow": "None", "buttonBorder": "Thin", "pageFont": "Montserrat", "pageTextColor": "#E0E6ED"}
  },
  {
    id: 'univ-soundix-berry', name: 'Crimson Velvet', creator_id: null, price: 9, is_approved: true, category: 'Pro', description: 'Pitch black foundation with a bold, luxurious hot pink accent.', 
    config: {"theme": "Berry", "bgColor": "#000000", "btnColor": "#FF0055", "btnTextColor": "#FFFFFF", "buttonStyle": "Solid", "buttonRoundness": "Full", "buttonShadow": "Strong", "buttonBorder": "None", "pageFont": "Poppins", "pageTextColor": "#FDFDFD"}
  },
  {
    id: 'univ-soundix-forest', name: 'Emerald Slate', creator_id: null, price: 0, is_approved: true, category: 'Classic', description: 'Muted charcoal backgrounds paired with deep emerald focus points.', 
    config: {"theme": "Forest", "bgColor": "#111312", "btnColor": "#00C46A", "btnTextColor": "#000000", "buttonStyle": "Solid", "buttonRoundness": "Square", "buttonShadow": "Soft", "buttonBorder": "Thin", "pageFont": "Lora", "pageTextColor": "#E8EBE9"}
  },
  {
    id: 'univ-soundix-sunset', name: 'Amber Roast', creator_id: null, price: 9, is_approved: true, category: 'Pro', description: 'Warm, espresso-dark foundation with vibrant amber glass buttons.', 
    config: {"theme": "Sunset", "bgColor": "#1E140E", "btnColor": "#FF5500", "btnTextColor": "#FFFFFF", "buttonStyle": "Glass", "buttonRoundness": "Rounder", "buttonShadow": "None", "buttonBorder": "None", "pageFont": "Outfit", "pageTextColor": "#FFF3EB"}
  },
  {
    id: 'univ-turbo-chalk', name: 'Alabaster Minimal', creator_id: null, price: 0, is_approved: true, category: 'Classic', description: 'Ultra-clean, airy background with stark, confident dark elements.', 
    config: {"theme": "Chalk", "bgColor": "#FDFDFD", "btnColor": "#0A0A0A", "btnTextColor": "#FFFFFF", "buttonStyle": "Solid", "buttonRoundness": "Round", "buttonShadow": "Soft", "buttonBorder": "None", "pageFont": "DM Sans", "pageTextColor": "#0A0A0A"}
  },
  {
    id: 'univ-iron-suit', name: 'The Stark', creator_id: null, price: 15, is_approved: true, category: 'Pro', description: 'Charismatic master aesthetic. Polished dark titanium with gold elements.', 
    config: {"theme": "Stark", "bgColor": "#1A0505", "btnColor": "#D4AF37", "btnTextColor": "#1A0505", "buttonStyle": "Solid", "buttonRoundness": "Square", "buttonShadow": "Glow", "buttonBorder": "None", "pageFont": "Teko", "pageTextColor": "#F0E6D2"}
  },
  {
    id: 'univ-web-slinger', name: 'Metropolis Crimson', creator_id: null, price: 15, is_approved: true, category: 'Pro', description: 'Sleek midnight blue and crimson. Designed for the modern icon.', 
    config: {"theme": "Metropolis", "bgColor": "#000A1F", "btnColor": "#D90000", "btnTextColor": "#FFFFFF", "buttonStyle": "Solid", "buttonRoundness": "Full", "buttonShadow": "Soft", "buttonBorder": "Thin", "pageFont": "Bangers", "pageTextColor": "#F0F5FF"}
  }
];

async function seed() {
  const { data, error } = await supabase
    .from('templates')
    .upsert(templates, { onConflict: 'id' });

  if (error) {
    console.error('Error seeding templates:', error);
  } else {
    console.log('Successfully seeded templates:', data);
  }
}

seed();
