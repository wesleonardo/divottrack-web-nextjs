import { NextResponse } from 'next/server'

// OAuth2 callback: exchange code for tokens and set a session cookie
export async function GET(request: Request) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')

  // read state from cookie
  const cookieHeader = request.headers.get('cookie') || ''
  const cookies = Object.fromEntries(cookieHeader.split(';').map(s => {
    const [k, v] = s.split('=')
    return [k?.trim(), v?.trim()]
  }))

  if (!code || !state || cookies['oauth_state'] !== state) {
    return NextResponse.json({ error: 'Invalid OAuth callback' }, { status: 400 })
  }

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_OAUTH_CLIENT_ID || '',
      client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || '',
      redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URI || `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/auth/callback`,
      grant_type: 'authorization_code',
    }),
  })

  if (!tokenRes.ok) {
    const body = await tokenRes.text()
    console.error('Token exchange failed:', body)
    return NextResponse.json({ error: 'Token exchange failed' }, { status: 500 })
  }

  const tokenData = await tokenRes.json()

  // In production you should validate ID token, create a session record, and issue a secure cookie.
  // Here we store a simple base64-encoded session cookie (dev only).
  const session = Buffer.from(JSON.stringify({ tokenData })).toString('base64')

  const res = NextResponse.redirect('/member')
  res.headers.set('Set-Cookie', `session=${session}; Path=/; HttpOnly; Max-Age=${60 * 60 * 24 * 7}`)
  // clear oauth_state
  res.headers.append('Set-Cookie', 'oauth_state=; Path=/; HttpOnly; Max-Age=0')

  return res
}
