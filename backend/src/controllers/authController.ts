import bcrypt from 'bcrypt'
import type { Request, Response } from 'express'
import { createAuthToken, clearAuthCookie, setAuthCookie } from '../auth/jwt'
import {
  getUserByEmail,
  getUserById,
  postUser,
  type NewUser,
} from '../services/userService'

type AuthBody = {
  email?: unknown
  geslo?: unknown
  ime?: unknown
  priimek?: unknown
}

function isRecord(value: unknown): value is AuthBody {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isOptionalText(value: unknown): value is string | null | undefined {
  return value === undefined || value === null || typeof value === 'string'
}

function isPrismaErrorCode(error: unknown, code: string): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    error.code === code
  )
}

function validPassword(password: unknown): password is string {
  return (
    typeof password === 'string' &&
    password.length >= 8 &&
    Buffer.byteLength(password, 'utf8') <= 72
  )
}

export async function registerUser(req: Request, res: Response) {
  const body: unknown = req.body
  if (
    !isRecord(body) ||
    typeof body.email !== 'string' ||
    body.email.trim() === '' ||
    !validPassword(body.geslo) ||
    !isOptionalText(body.ime) ||
    !isOptionalText(body.priimek)
  ) {
    res.status(400).json({ error: 'Vnesi veljaven email, geslo (najmanj 8 znakov), ime in priimek.' })
    return
  }

  try {
    const data: NewUser = {
      email: body.email.trim().toLowerCase(),
      gesloHash: await bcrypt.hash(body.geslo, 12),
    }
    if (body.ime !== undefined) data.ime = body.ime
    if (body.priimek !== undefined) data.priimek = body.priimek

    const user = await postUser(data)
    setAuthCookie(res, createAuthToken(user.id))
    res.status(201).json(user)
  } catch (error) {
    if (isPrismaErrorCode(error, 'P2002')) {
      res.status(409).json({ error: 'Uporabnik s tem emailom že obstaja.' })
      return
    }
    console.error('Napaka pri registraciji uporabnika:', error)
    res.status(500).json({ error: 'Napaka pri registraciji uporabnika.' })
  }
}

export async function loginUser(req: Request, res: Response) {
  const body: unknown = req.body
  if (
    !isRecord(body) ||
    typeof body.email !== 'string' ||
    body.email.trim() === '' ||
    typeof body.geslo !== 'string' ||
    body.geslo.length === 0 ||
    Buffer.byteLength(body.geslo, 'utf8') > 72
  ) {
    res.status(400).json({ error: 'Vnesi email in geslo.' })
    return
  }

  try {
    const user = await getUserByEmail(body.email.trim().toLowerCase())
    if (!user?.gesloHash || !(await bcrypt.compare(body.geslo, user.gesloHash))) {
      res.status(401).json({ error: 'Napačen email ali geslo.' })
      return
    }

    const publicUser = {
      id: user.id,
      email: user.email,
      ime: user.ime,
      priimek: user.priimek,
    }
    setAuthCookie(res, createAuthToken(user.id))
    res.json(publicUser)
  } catch (error) {
    console.error('Napaka pri prijavi uporabnika:', error)
    res.status(500).json({ error: 'Napaka pri prijavi uporabnika.' })
  }
}

export async function currentUser(req: Request, res: Response) {
  const userId = req.authUserId
  if (!userId) {
    res.status(401).json({ error: 'Za nadaljevanje se prijavi.' })
    return
  }

  try {
    const user = await getUserById(userId)
    if (!user) {
      clearAuthCookie(res)
      res.status(401).json({ error: 'Prijava ni več veljavna.' })
      return
    }
    res.json(user)
  } catch (error) {
    console.error('Napaka pri preverjanju prijave:', error)
    res.status(500).json({ error: 'Napaka pri preverjanju prijave.' })
  }
}

export function logoutUser(_req: Request, res: Response) {
  clearAuthCookie(res)
  res.status(204).send()
}
