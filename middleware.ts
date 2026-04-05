import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Routes that require auth processing (dashboard, settings, etc.)
const PROTECTED_ROUTES = ['/dashboard', '/settings', '/api/']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip auth entirely for public routes (profile pages, landing, checkout, login, etc.)
  const isProtected = PROTECTED_ROUTES.some(route => pathname.startsWith(route))
  if (!isProtected) {
    return NextResponse.next()
  }

  // Only run Supabase auth session refresh for protected routes
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  await supabase.auth.getUser()
  return supabaseResponse
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}