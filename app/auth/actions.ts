'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

// 1. SIGNUP ACTION
export async function signup(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signUp({ email, password })

  if (error) {
    return redirect('/login?message=' + error.message)
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

// 2. LOGIN ACTION
export async function login(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    console.log("DEBUG LOGIN ERROR:", error.message) // <--- THIS WILL SHOW IN TERMINAL
    return redirect('/login?message=' + encodeURIComponent(error.message))
  }

  revalidatePath('/', 'layout') 
  redirect('/dashboard')
}

// 3. PROFILE UPDATE ACTION
export async function updateUpi(formData: FormData) {
  const supabase = await createClient()
  const upi = formData.get('upi') as string
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (user) {
    const { error } = await supabase
      .from('profiles')
      .update({ upi_id: upi })
      .eq('id', user.id)
      
    if (error) {
      console.error("Update Error:", error.message)
    }
      
    revalidatePath('/dashboard')
  }
} 

export async function addLink(formData: FormData) {
  const supabase = await createClient()
  
  const title = formData.get('title') as string
  const url = formData.get('url') as string
  
  // Use getUser() for security - it re-verifies the session with Supabase
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  if (authError || !user) {
    console.error("Auth Error:", authError?.message)
    return redirect('/login')
  }

  const { error: dbError } = await supabase
    .from('links')
    .insert([
      { 
        title, 
        url, 
        user_id: user.id, // This MUST match the ID in the auth.users table
        icon_type: 'link' 
      }
    ])

  if (dbError) {
    console.error("Database Insert Error:", dbError.message)
  }

  revalidatePath('/dashboard')
}

export async function deleteLink(linkId: string) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('links')
    .delete()
    .eq('id', linkId)

  if (error) console.error(error)
  revalidatePath('/dashboard')
}