import { Router } from 'express'
import { Prisma } from '../generated/prisma/client'
import {
  createAuthor,
  deleteAuthor,
  getAuthorById,
  getAuthors,
  type AuthorData,
  updateAuthor,
} from '../services/authorService'

const authorRouter = Router()

function parseId(value: string): number | null {
  const id = Number(value)
  return Number.isInteger(id) && id > 0 ? id : null
}

function parseAuthorData(body: unknown): AuthorData | null {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return null
  const value = body as Record<string, unknown>
  const data: AuthorData = {}

  for (const key of ['ime', 'priimek', 'opis'] as const) {
    if (value[key] === undefined) continue
    if (value[key] !== null && typeof value[key] !== 'string') return null
    data[key] = value[key] as string | null
  }

  if (value.spol !== undefined) {
    if (value.spol !== null && value.spol !== 'moski' && value.spol !== 'zenska') return null
    data.spol = value.spol as 'moski' | 'zenska' | null
  }

  return data
}

function handleDatabaseError(error: unknown, res: Parameters<Parameters<typeof authorRouter.get>[1]>[1], action: string) {
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
    res.status(404).json({ error: 'Avtor ni bil najden.' })
    return
  }
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003') {
    res.status(409).json({ error: 'Avtor je povezan z drugimi zapisi in ga ni mogoče izbrisati.' })
    return
  }
  console.error(`Napaka pri ${action} avtorja:`, error)
  res.status(500).json({ error: `Napaka pri ${action} avtorja.` })
}

authorRouter.get('/', async (_req, res) => {
  try {
    res.json(await getAuthors())
  } catch (error) {
    console.error('Napaka pri pridobivanju avtorjev:', error)
    res.status(500).json({ error: 'Napaka pri pridobivanju avtorjev.' })
  }
})

authorRouter.post('/', async (req, res) => {
  const data = parseAuthorData(req.body)
  if (!data) {
    res.status(400).json({ error: 'Podatki avtorja niso veljavni.' })
    return
  }
  try {
    res.status(201).json(await createAuthor(data))
  } catch (error) {
    handleDatabaseError(error, res, 'dodajanje')
  }
})

authorRouter.get('/:id', async (req, res) => {
  const id = parseId(req.params.id)
  if (id === null) {
    res.status(400).json({ error: 'ID mora biti pozitivno celo število.' })
    return
  }
  try {
    const author = await getAuthorById(id)
    if (!author) {
      res.status(404).json({ error: 'Avtor ni bil najden.' })
      return
    }
    res.json(author)
  } catch (error) {
    console.error('Napaka pri pridobivanju avtorja:', error)
    res.status(500).json({ error: 'Napaka pri pridobivanju avtorja.' })
  }
})

authorRouter.patch('/:id', async (req, res) => {
  const id = parseId(req.params.id)
  if (id === null) {
    res.status(400).json({ error: 'ID mora biti pozitivno celo število.' })
    return
  }
  const data = parseAuthorData(req.body)
  if (!data) {
    res.status(400).json({ error: 'Podatki avtorja niso veljavni.' })
    return
  }
  try {
    res.json(await updateAuthor(id, data))
  } catch (error) {
    handleDatabaseError(error, res, 'posodabljanje')
  }
})

authorRouter.delete('/:id', async (req, res) => {
  const id = parseId(req.params.id)
  if (id === null) {
    res.status(400).json({ error: 'ID mora biti pozitivno celo število.' })
    return
  }
  try {
    await deleteAuthor(id)
    res.status(204).send()
  } catch (error) {
    handleDatabaseError(error, res, 'brisanje')
  }
})

export default authorRouter
