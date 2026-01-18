import { NextResponse } from 'next/server';

/**
 * Proxy to the local advisor API
 * This simply forwards requests to the advisor server running locally
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol') || 'BTC';
  const profile = searchParams.get('profile') || 'swing';
  const radar = searchParams.get('radar');
  
  // The advisor server URL - Railway deployment
  const advisorUrl = process.env.ADVISOR_API_URL || 'https://web-production-588f2.up.railway.app';
  const accessToken = process.env.ADVISOR_ACCESS_TOKEN;
  
  if (!accessToken) {
    return NextResponse.json(
      { error: 'ADVISOR_ACCESS_TOKEN environment variable is not configured' },
      { status: 500 }
    );
  }
  
  try {
    // If radar=true, fetch the radar endpoint
    const endpoint = radar === 'true' 
      ? `${advisorUrl}/api/radar?profile=${profile}`
      : `${advisorUrl}/api/advisor?symbol=${symbol}&profile=${profile}`;
    
    const res = await fetch(endpoint, {
      headers: {
        'Accept': 'application/json',
        'x-access-token': accessToken,
      },
    });
    
    if (!res.ok) {
      throw new Error(`Advisor API error: ${res.status}`);
    }
    
    const data = await res.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Advisor proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to connect to advisor service. Make sure the advisor server is running.' },
      { status: 502 }
    );
  }
}
