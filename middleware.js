import { NextResponse } from 'next/server';

/**
 * Middleware to protect /trading routes with password authentication.
 * Uses a cookie-based session after successful login.
 */
export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Only protect /trading routes (but not the login API)
  if (pathname.startsWith('/trading') && !pathname.startsWith('/api/trading')) {
    const authCookie = request.cookies.get('trading_auth');
    
    // Check if user has valid auth cookie
    if (!authCookie || authCookie.value !== 'authenticated') {
      // Redirect to trading page with login prompt
      // The page itself will show login form if not authenticated
      // We set a header to indicate auth is required
      const response = NextResponse.next();
      response.headers.set('x-trading-auth', 'required');
      return response;
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/trading/:path*'],
};
