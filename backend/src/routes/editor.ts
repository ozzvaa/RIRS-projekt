import bcrypt from 'bcrypt'
import { Router } from 'express'
import { Prisma } from '../generated/prisma/client'
import { createEditor, getEditorById, getEditors, updateEditor, type EditorData } from '../services/editorService'

const editorRouter = Router()

function parseId(value: string): number | null {
  const id = Number(value)
  return Number.isInteger(id) && id > 0 ? id : null
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function parseEditorData(body: unknown): EditorData | null {
  if (!isRecord(body)) return null
  const data: EditorData = {}
  if (body.email !== undefined) {
    if (typeof body.email !== 'string' || !body.email.trim()) return null
    data.email = body.email.trim().toLowerCase()
  }
  for (const key of ['ime', 'priimek'] as const) {
    if (body[key] === undefined) continue
    if (body[key] !== null && typeof body[key] !== 'string') return null
    data[key] = body[key] as string | null
  }
  return data
}

function reportError(error: unknown, res: Parameters<Parameters<typeof editorRouter.get>[1]>[1], action: string) {
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
    res.status(409).json({ error: 'Uporabnik s tem e-poštnim naslovom že obstaja.' })
    return
  }
  console.error(`Napaka pri ${action} urednika:`, error)
  res.status(500).json({ error: `Napaka pri ${action} urednika.` })
}

editorRouter.get('/', async (_req, res) => {
  try {
    res.json(await getEditors())
  } catch (error) {
    reportError(error, res, 'pridobivanju')
  }
})

editorRouter.post('/', async (req, res) => {
  const data = parseEditorData(req.body)
  const geslo = isRecord(req.body) ? req.body.geslo : undefined
  if (!data?.email || typeof geslo !== 'string' || geslo.length < 8 || Buffer.byteLength(geslo, 'utf8') > 72) {
    res.status(400).json({ error: 'Vnesi veljaven e-poštni naslov in geslo z najmanj 8 znaki.' })
    return
  }
  try {
    const user = await createEditor({ ...data, email: data.email as string, gesloHash: await bcrypt.hash(geslo, 12) })
    res.status(201).json(user)
  } catch (error) {
    reportError(error, res, 'dodajanju')
  }
})

editorRouter.get('/:id', async (req, res) => {
  const id = parseId(req.params.id)
  if (id === null) {
    res.status(400).json({ error: 'ID mora biti pozitivno celo število.' })
    return
  }
  try {
    const editor = await getEditorById(id)
    if (!editor) {
      res.status(404).json({ error: 'Urednik ni bil najden.' })
      return
    }
    res.json(editor)
  } catch (error) {
    reportError(error, res, 'pridobivanju')
  }
})

editorRouter.patch('/:id', async (req, res) => {
  const id = parseId(req.params.id)
  if (id === null) {
    res.status(400).json({ error: 'ID mora biti pozitivno celo število.' })
    return
  }
  const data = parseEditorData(req.body)
  if (!data || Object.keys(data).length === 0) {
    res.status(400).json({ error: 'Podatki urednika niso veljavni.' })
    return
  }
  try {
    const editor = await updateEditor(id, data)
    if (!editor) {
      res.status(404).json({ error: 'Urednik ni bil najden.' })
      return
    }
    res.json(editor)
  } catch (error) {
    reportError(error, res, 'posodabljanju')
  }
})

export default editorRouter
