import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

/**
 * POST /api/trading/auth
 * Validates password and sets auth cookie
 */
export async function POST(request) {
  try {
    const { password } = await request.json();
    const correctPassword = process.env.TRADING_PASSWORD;
    
    if (!correctPassword) {
      return NextResponse.json(
        { error: 'Trading dashboard not configured' },
        { status: 503 }
      );
    }
    
    if (password === correctPassword) {
      const response = NextResponse.json({ success: true });
      
      // Set auth cookie (httpOnly, secure in production, 7 day expiry)
      response.cookies.set('trading_auth', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });
      
      return response;
    }
    
    return NextResponse.json(
      { error: 'Invalid password' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}

/**
 * GET /api/trading/auth
 * Check if user is authenticated
 */
export async function GET(request) {
  const cookieStore = cookies();
  const authCookie = cookieStore.get('trading_auth');
  
  return NextResponse.json({
    authenticated: authCookie?.value === 'authenticated'
  });
}

/**
 * DELETE /api/trading/auth
 * Logout - clear auth cookie
 */
export async function DELETE(request) {
  const response = NextResponse.json({ success: true });
  response.cookies.delete('trading_auth');
  return response;
}
