import { NextRequest, NextResponse } from 'next/server'

import { api } from '@/services/api'
import { auth } from '@/config/auth'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  const registerResponse = await api.post('/register', {
    code,
  })

  const { token } = registerResponse.data

  const redirectURL = new URL('/', request.url)

  return NextResponse.redirect(redirectURL, {
    headers: {
      'Set-Cookie': `${auth.cookie_name}=${token}; Path=/;max-age=${auth.cookie_expiration_time_in_seconds}`,
    },
  })
}
