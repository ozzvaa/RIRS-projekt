import type { NextFunction, Request, Response } from 'express'
import { prisma } from '../prisma'

export function requireRoles(...allowedRoles: ('GLAVNI_UREDNIK' | 'ADMIN')[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.authUserId) {
      res.status(401).json({ error: 'Za nadaljevanje se prijavi.' })
      return
    }

    try {
      const user = await prisma.uporabnik.findUnique({
        where: { id: req.authUserId },
        select: { vloge: true },
      })
      if (!user) {
        res.status(401).json({ error: 'Prijava ni več veljavna.' })
        return
      }
      if (!user.vloge.some((role) => allowedRoles.includes(role as (typeof allowedRoles)[number]))) {
        res.status(403).json({ error: 'Za to dejanje nimaš ustreznih pravic.' })
        return
      }
      next()
    } catch (error) {
      console.error('Napaka pri preverjanju uporabniških pravic:', error)
      res.status(500).json({ error: 'Pravic uporabnika ni bilo mogoče preveriti.' })
    }
  }
}
