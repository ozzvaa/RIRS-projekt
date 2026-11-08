import { Router } from 'express'
import { Prisma } from '../generated/prisma/client'
import { requireAuth } from '../middleware/requireAuth'
import { requireRoles } from '../middleware/requireRoles'
import {
  areEditorIdsValid,
  canManageProjectAssignments,
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  type ProjectData,
  updateProject,
} from '../services/projectService'

const projectRouter = Router()

const textFields = [
  'naslov', 'podnaslov', 'navedba_izdaje', 'prevod_iz', 'izvirni_naslov',
  'tisk_notranje_strani', 'tisk_ovitek', 'tisk_vezani_listi', 'kapitalni_trak_tip',
  'oznacevalna_vrvica_tip', 'dodelava', 'cobiss_Id', 'subvencije',
  'vsebina_za_katalog', 'daljsi_sestavek_o_knjigi', 'kratek_citat',
] as const
const integerFields = [
  'sifra', 'leto_izdaje', 'stevilo_znakov_s_presledki', 'st_osnovnih_strani',
  'st_dodatnih_strani', 'st_strani_skupaj', 'naklada',
] as const
const booleanFields = ['prva_izdaja', 'izvirno', 'kapitalni_trak', 'oznacevalna_vrvica', 'jak'] as const
const decimalFields = ['avtorske_pole', 'nadizvod', 'znesek_subvencije', 'cena_mpc'] as const
const authorFields = [
  'avtorji', 'prevajalci', 'lektorji', 'uredniki', 'korekturno_branje', 'prelom', 'oblikovanje', 'ilustratorji',
] as const

function parseId(value: string | string[] | undefined): number | null {
  if (typeof value !== 'string') return null
  const id = Number(value)
  return Number.isInteger(id) && id > 0 ? id : null
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function parseProjectData(body: unknown): ProjectData | null {
  if (!isRecord(body)) return null
  const fields: ProjectData['fields'] = {}
  const authors: ProjectData['authors'] = {}

  for (const field of textFields) {
    if (body[field] === undefined) continue
    if (body[field] !== null && typeof body[field] !== 'string') return null
    fields[field] = body[field] as string | null
  }
  for (const field of integerFields) {
    if (body[field] === undefined) continue
    if (body[field] !== null && (typeof body[field] !== 'number' || !Number.isInteger(body[field]))) return null
    fields[field] = body[field] as number | null
  }
  for (const field of booleanFields) {
    if (body[field] === undefined) continue
    if (body[field] !== null && typeof body[field] !== 'boolean') return null
    fields[field] = body[field] as boolean | null
  }
  for (const field of decimalFields) {
    if (body[field] === undefined) continue
    if (body[field] !== null && !(typeof body[field] === 'string' && body[field].trim() !== '' && Number.isFinite(Number(body[field])))) return null
    fields[field] = body[field] === null ? null : Number(body[field])
  }
  for (const field of authorFields) {
    if (body[field] === undefined) {
      authors[field] = []
      continue
    }
    const ids = body[field]
    if (!Array.isArray(ids) || ids.some((id) => !Number.isInteger(id) || typeof id !== 'number' || id <= 0)) return null
    authors[field] = ids as number[]
  }
  let editorIds: number[] | undefined
  if (body.uredniki_na_projektu !== undefined) {
    const ids = body.uredniki_na_projektu
    if (!Array.isArray(ids) || ids.some((id) => !Number.isInteger(id) || typeof id !== 'number' || id <= 0)) return null
    editorIds = ids as number[]
  }
  return { fields, authors, ...(editorIds === undefined ? {} : { editorIds }) }
}

function handleError(error: unknown, res: Parameters<Parameters<typeof projectRouter.get>[1]>[1], action: string) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Projekt ni bil najden.' })
      return
    }
    if (error.code === 'P2002') {
      res.status(409).json({ error: 'Šifra projekta že obstaja.' })
      return
    }
    if (error.code === 'P2003') {
      const deleting = action === 'brisanju'
      res.status(deleting ? 409 : 400).json({
        error: deleting
          ? 'Projekt je povezan z drugimi zapisi in ga ni mogoče izbrisati.'
          : 'Izbor avtorjev vsebuje neveljaven ID.',
      })
      return
    }
  }
  console.error(`Napaka pri ${action} projekta:`, error)
  res.status(500).json({ error: `Napaka pri ${action} projekta.` })
}

projectRouter.get('/', requireAuth, async (req, res) => {
  try { res.json(await getProjects(req.authUserId!)) }
  catch (error) { handleError(error, res, 'pridobivanju') }
})

projectRouter.post('/', requireAuth, requireRoles('GLAVNI_UREDNIK', 'ADMIN'), async (req, res) => {
  const data = parseProjectData(req.body)
  if (!data) {
    res.status(400).json({ error: 'Podatki projekta niso veljavni.' })
    return
  }
  if (data.editorIds && !(await areEditorIdsValid(data.editorIds))) {
    res.status(400).json({ error: 'Izbrani uporabniki morajo imeti vlogo UREDNIK.' })
    return
  }
  try { res.status(201).json(await createProject(data)) }
  catch (error) { handleError(error, res, 'dodajanju') }
})

projectRouter.get('/:id', requireAuth, async (req, res) => {
  const id = parseId(req.params.id)
  if (id === null) {
    res.status(400).json({ error: 'ID mora biti pozitivno celo število.' })
    return
  }
  try {
    const project = await getProjectById(req.authUserId!, id)
    if (!project) {
      res.status(404).json({ error: 'Projekt ni bil najden.' })
      return
    }
    res.json(project)
  } catch (error) { handleError(error, res, 'pridobivanju') }
})

projectRouter.patch('/:id', requireAuth, async (req, res) => {
  const id = parseId(req.params.id)
  if (id === null) {
    res.status(400).json({ error: 'ID mora biti pozitivno celo število.' })
    return
  }
  const data = parseProjectData(req.body)
  if (!data) {
    res.status(400).json({ error: 'Podatki projekta niso veljavni.' })
    return
  }
  if (data.editorIds !== undefined) {
    if (!(await canManageProjectAssignments(req.authUserId!))) {
      res.status(403).json({ error: 'Samo glavni urednik ali administrator lahko dodeli urednike projektu.' })
      return
    }
    if (!(await areEditorIdsValid(data.editorIds))) {
      res.status(400).json({ error: 'Izbrani uporabniki morajo imeti vlogo UREDNIK.' })
      return
    }
  }
  try {
    const project = await updateProject(id, req.authUserId!, data)
    if (!project) {
      res.status(404).json({ error: 'Projekt ni bil najden.' })
      return
    }
    res.json(project)
  }
  catch (error) { handleError(error, res, 'posodabljanju') }
})

projectRouter.delete('/:id', requireAuth, async (req, res) => {
  const id = parseId(req.params.id)
  if (id === null) {
    res.status(400).json({ error: 'ID mora biti pozitivno celo število.' })
    return
  }
  try {
    const project = await deleteProject(id, req.authUserId!)
    if (!project) {
      res.status(404).json({ error: 'Projekt ni bil najden.' })
      return
    }
    res.status(204).send()
  } catch (error) { handleError(error, res, 'brisanju') }
})

export default projectRouter
