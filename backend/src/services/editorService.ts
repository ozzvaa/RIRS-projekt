import { prisma } from '../prisma'

export const editorSelect = {
  id: true,
  ime: true,
  priimek: true,
  email: true,
  vloge: true,
} as const

export type EditorData = {
  email?: string
  ime?: string | null
  priimek?: string | null
}

export function getEditors() {
  return prisma.uporabnik.findMany({
    where: { vloge: { has: 'UREDNIK' } },
    select: editorSelect,
    orderBy: [{ priimek: 'asc' }, { ime: 'asc' }, { id: 'asc' }],
  })
}

export function getEditorById(id: number) {
  return prisma.uporabnik.findFirst({
    where: { id, vloge: { has: 'UREDNIK' } },
    select: editorSelect,
  })
}

export function createEditor(data: EditorData & { email: string; gesloHash: string }) {
  return prisma.uporabnik.create({
    data: { ...data, vloge: ['UREDNIK'] },
    select: editorSelect,
  })
}

export function updateEditor(id: number, data: EditorData) {
  return prisma.uporabnik.updateMany({
    where: { id, vloge: { has: 'UREDNIK' } },
    data,
  }).then(async (result) => result.count === 0 ? null : getEditorById(id))
}
