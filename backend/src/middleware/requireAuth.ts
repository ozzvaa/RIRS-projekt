import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { AUTH_COOKIE, clearAuthCookie, getJwtSecret } from '../auth/jwt'

declare global {
  namespace Express {
    interface Request {
      authUserId?: number
    }
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token: unknown = req.cookies?.[AUTH_COOKIE]
  if (typeof token !== 'string') {
    res.status(401).json({ error: 'Za nadaljevanje se prijavi.' })
    return
  }

  try {
    const payload = jwt.verify(token, getJwtSecret(), {
      algorithms: ['HS256'],
      issuer: 'uredniski-portal',
    })
    if (typeof payload === 'string' || typeof payload.sub !== 'string') {
      clearAuthCookie(res)
      res.status(401).json({ error: 'Prijava ni več veljavna.' })
      return
    }

    const userId = Number(payload.sub)
    if (!Number.isInteger(userId) || userId <= 0) {
      clearAuthCookie(res)
      res.status(401).json({ error: 'Prijava ni več veljavna.' })
      return
    }

    req.authUserId = userId
    next()
  } catch {
    clearAuthCookie(res)
    res.status(401).json({ error: 'Prijava ni več veljavna.' })
  }
}
