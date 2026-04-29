import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

const envStr = fs.readFileSync(path.join(process.cwd(), ".env.local"), "utf8");
const NEXT_PUBLIC_SUPABASE_URL = envStr.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)?.[1]?.trim();
const NEXT_PUBLIC_SUPABASE_ANON_KEY = envStr.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.*)/)?.[1]?.trim();

const supabase = createClient(NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function check() {
    const handleToTest = "boda pratham";
    const handleWithDash = "boda-pratham";
    const noSpaceCaps = "BodaPratham";
    const spaceCaps = "Boda Pratham";
    
    for (const h of [handleToTest, handleWithDash, noSpaceCaps, spaceCaps]) {
      const { data } = await supabase.from('profiles').select('*').ilike('c_username', h);
      console.log(`Searching strictly for '${h}':`, data?.map(p => p.c_username));
    }

    // all profiles
    const { data: all } = await supabase.from('profiles').select('*');
    console.log(`All profiles:`, all?.map(p => p.c_username));
}

check();
