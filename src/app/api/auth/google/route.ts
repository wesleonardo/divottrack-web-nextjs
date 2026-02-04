import { NextResponse } from 'next/server'

// Redirects user to Google's OAuth 2.0 consent screen
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams
  const redirectUri = process.env.GOOGLE_OAUTH_REDIRECT_URI || `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/auth/callback`
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID

  if (!clientId) {
    return NextResponse.json({ error: 'Missing GOOGLE_OAUTH_CLIENT_ID env var' }, { status: 500 })
  }

  // generate a simple state value and store it in a cookie for CSRF protection
  const state = Math.random().toString(36).slice(2)

  const scope = encodeURIComponent('openid email profile')
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(
    clientId
  )}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${scope}&state=${encodeURIComponent(
    state
  )}&access_type=offline&prompt=consent`

  const res = NextResponse.redirect(authUrl)
  // set state cookie (short lived)
  res.headers.set('Set-Cookie', `oauth_state=${state}; Path=/; HttpOnly; Max-Age=600`)
  return res
}
