import { auth } from '@/config/auth'
import jwtDecode from 'jwt-decode'
import { cookies } from 'next/headers'

interface User {
  sub: string
  name: string
  avatarUrl: string
}

export function isUserAuthenticated() {
  return cookies().has(auth.cookie_name)
}

export function getUser(): User {
  const token = cookies().get(auth.cookie_name)?.value

  if (!token) {
    throw new Error('Unauthenticated.')
  }

  const user: User = jwtDecode(token)

  return user
}
