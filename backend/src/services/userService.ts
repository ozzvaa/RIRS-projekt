import { prisma } from '../prisma'

export const publicUserSelect = {
  id: true,
  email: true,
  ime: true,
  priimek: true,
  vloge: true,
} as const

export type NewUser = {
  email: string
  ime?: string | null
  priimek?: string | null
  gesloHash: string
}

export function getUsers() {
  return prisma.uporabnik.findMany({ select: publicUserSelect })
}

export function getUserById(id: number) {
  return prisma.uporabnik.findUnique({ where: { id }, select: publicUserSelect })
}

export function getUserByEmail(email: string) {
  return prisma.uporabnik.findUnique({
    where: { email },
    select: { ...publicUserSelect, gesloHash: true },
  })
}

export function postUser(data: NewUser) {
  return prisma.uporabnik.create({ data, select: publicUserSelect })
}

export function updateUser(id: number, data: {
  email?: string
  ime?: string | null
  priimek?: string | null
}) {
  return prisma.uporabnik.update({ where: { id }, data, select: publicUserSelect })
}

export function deleteUser(id: number) {
  return prisma.uporabnik.delete({ where: { id } })
}
