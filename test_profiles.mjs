import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkProfiles() {
    const { data, error } = await supabase
        .from('profiles')
        .select('id, c_username')
        .order('created_at', { ascending: false })
        .limit(10)

    if (error) {
        console.error('Error fetching profiles:', error)
        return
    }

    console.log('Recent profiles:')
    data.forEach(p => {
        console.log(`- ID: ${p.id}, Handle: "${p.c_username}"`)
    })
}

checkProfiles()
