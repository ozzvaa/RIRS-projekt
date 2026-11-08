import { prisma } from '../prisma'

export const authorListSelect = {
  id: true,
  ime: true,
  priimek: true,
} as const

export const authorDetailsSelect = {
  id: true,
  ime: true,
  priimek: true,
  spol: true,
  opis: true,
} as const

export type AuthorData = {
  ime?: string | null
  priimek?: string | null
  spol?: 'moski' | 'zenska' | null
  opis?: string | null
}

export function getAuthors() {
  return prisma.avtor.findMany({
    select: authorListSelect,
    orderBy: [{ priimek: 'asc' }, { ime: 'asc' }, { id: 'asc' }],
  })
}

export function getAuthorById(id: number) {
  return prisma.avtor.findUnique({ where: { id }, select: authorDetailsSelect })
}

export function createAuthor(data: AuthorData) {
  return prisma.avtor.create({ data: { ...data, spol: data.spol ?? 'moski' }, select: authorDetailsSelect })
}

export function updateAuthor(id: number, data: AuthorData) {
  return prisma.avtor.update({ where: { id }, data, select: authorDetailsSelect })
}

export function deleteAuthor(id: number) {
  return prisma.avtor.delete({ where: { id } })
}
