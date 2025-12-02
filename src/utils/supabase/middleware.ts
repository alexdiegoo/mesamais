import { createServerClient } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isPublic =
    request.nextUrl.pathname.startsWith('/login') ||
    request.nextUrl.pathname.startsWith('/auth') ||
    request.nextUrl.pathname.startsWith('/error') ||
    request.nextUrl.pathname.startsWith('/signup')

  if (!user && !isPublic) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  if (user) {
    const tipo = user.user_metadata?.tipo

    const currentPath = request.nextUrl.pathname

    const allowed =
      (tipo === 'doador' && currentPath.startsWith('/doador')) ||
      (tipo === 'entidade' && currentPath.startsWith('/entidade'))

    const isDashboard = currentPath === '/' || currentPath === '/login'

    if (!allowed && isDashboard) {
      const url = request.nextUrl.clone()
      url.pathname = tipo === 'doador' ? '/doador' : '/entidade'
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}
