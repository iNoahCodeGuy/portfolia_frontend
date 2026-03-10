import { NextRequest, NextResponse } from 'next/server'

/**
 * Protects /dashboard routes with a simple password cookie.
 * Set DASHBOARD_PASSWORD in your environment variables.
 */
export function middleware(request: NextRequest) {
  const password = process.env.DASHBOARD_PASSWORD
  if (!password) return NextResponse.next()

  // Skip the login page itself
  if (request.nextUrl.pathname === '/dashboard/login') {
    return NextResponse.next()
  }

  // Skip the login API route
  if (request.nextUrl.pathname === '/api/dashboard-auth') {
    return NextResponse.next()
  }

  // Check auth cookie
  const authCookie = request.cookies.get('dashboard_auth')?.value
  if (authCookie === password) {
    return NextResponse.next()
  }

  // Redirect to login
  const loginUrl = new URL('/dashboard/login', request.url)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/analytics/:path*'],
}
