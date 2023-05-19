import { NextRequest, NextResponse } from 'next/server'

import { auth } from '@/config/auth'

export async function GET(request: NextRequest) {
  const redirectURL = new URL('/', request.url)

  return NextResponse.redirect(redirectURL, {
    headers: {
      'Set-Cookie': `${auth.cookie_name}=; Path=/;max-age=0`,
    },
  })
}
