import jwt from 'jsonwebtoken'
import type { Response } from 'express'

export const AUTH_COOKIE = 'auth_token'

export function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error('JWT_SECRET ni nastavljen.')
  }
  return secret
}

export function createAuthToken(userId: number): string {
  return jwt.sign({}, getJwtSecret(), {
    algorithm: 'HS256',
    expiresIn: '1d',
    issuer: 'uredniski-portal',
    subject: String(userId),
  })
}

export function setAuthCookie(res: Response, token: string): void {
  res.cookie(AUTH_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000,
    path: '/',
  })
}

export function clearAuthCookie(res: Response): void {
  res.clearCookie(AUTH_COOKIE, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  })
}
