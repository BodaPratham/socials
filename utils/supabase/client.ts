// This file is used to create a Supabase client that can be used throughout the app
// It uses environment variables to connect to the correct Supabase project
// Make sure to set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file

// 💡 Production Lesson: Why this structure?
// As a beginner, you might wonder why we don't just put everything in one file.

// Scalability: In a "Production" app, you want one single place (client.ts) that manages the connection. If you ever change database providers, you only have to change this one file, not 50 pages of code.

// Security: Using .env.local ensures that when you eventually upload your code to GitHub, your private database keys are not public.


import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // This function looks at your .env.local file and connects to your specific DB
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}