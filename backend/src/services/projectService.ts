import { Prisma } from '../generated/prisma/client'
import { prisma } from '../prisma'

export const projectListSelect = {
  id: true,
  naslov: true,
  leto_izdaje: true,
} as const

export const projectDetailsSelect = {
  id: true,
  naslov: true,
  podnaslov: true,
  sifra: true,
  leto_izdaje: true,
  prva_izdaja: true,
  navedba_izdaje: true,
  izvirno: true,
  prevod_iz: true,
  izvirni_naslov: true,
  stevilo_znakov_s_presledki: true,
  avtorske_pole: true,
  st_osnovnih_strani: true,
  st_dodatnih_strani: true,
  st_strani_skupaj: true,
  naklada: true,
  tisk_notranje_strani: true,
  tisk_ovitek: true,
  tisk_vezani_listi: true,
  nadizvod: true,
  kapitalni_trak: true,
  kapitalni_trak_tip: true,
  oznacevalna_vrvica: true,
  oznacevalna_vrvica_tip: true,
  dodelava: true,
  cobiss_Id: true,
  jak: true,
  subvencije: true,
  znesek_subvencije: true,
  cena_mpc: true,
  vsebina_za_katalog: true,
  daljsi_sestavek_o_knjigi: true,
  kratek_citat: true,
  avtorji: { select: { id: true, ime: true, priimek: true } },
  prevajalci: { select: { id: true, ime: true, priimek: true } },
  lektorji: { select: { id: true, ime: true, priimek: true } },
  uredniki: { select: { id: true, ime: true, priimek: true } },
  korekturno_branje: { select: { id: true, ime: true, priimek: true } },
  prelom: { select: { id: true, ime: true, priimek: true } },
  oblikovanje: { select: { id: true, ime: true, priimek: true } },
  ilustratorji: { select: { id: true, ime: true, priimek: true } },
} as const

export type ProjectData = {
  fields: Record<string, string | number | boolean | null>
  authors: Record<string, number[]>
}

function projectCreateData(data: ProjectData): Prisma.KnjigaCreateInput {
  return {
    ...data.fields,
    avtorji: { connect: (data.authors.avtorji ?? []).map((id) => ({ id })) },
    prevajalci: { connect: (data.authors.prevajalci ?? []).map((id) => ({ id })) },
    lektorji: { connect: (data.authors.lektorji ?? []).map((id) => ({ id })) },
    uredniki: { connect: (data.authors.uredniki ?? []).map((id) => ({ id })) },
    korekturno_branje: { connect: (data.authors.korekturno_branje ?? []).map((id) => ({ id })) },
    prelom: { connect: (data.authors.prelom ?? []).map((id) => ({ id })) },
    oblikovanje: { connect: (data.authors.oblikovanje ?? []).map((id) => ({ id })) },
    ilustratorji: { connect: (data.authors.ilustratorji ?? []).map((id) => ({ id })) },
  } as Prisma.KnjigaCreateInput
}

export function getProjects() {
  return prisma.knjiga.findMany({
    select: projectListSelect,
    orderBy: [{ naslov: 'asc' }, { id: 'asc' }],
  })
}

export function getProjectById(id: number) {
  return prisma.knjiga.findUnique({ where: { id }, select: projectDetailsSelect })
}

export function createProject(data: ProjectData) {
  return prisma.knjiga.create({ data: projectCreateData(data), select: projectDetailsSelect })
}

export function updateProject(id: number, data: ProjectData) {
  return prisma.knjiga.update({
    where: { id },
    data: {
      ...data.fields,
      avtorji: { set: (data.authors.avtorji ?? []).map((id) => ({ id })) },
      prevajalci: { set: (data.authors.prevajalci ?? []).map((id) => ({ id })) },
      lektorji: { set: (data.authors.lektorji ?? []).map((id) => ({ id })) },
      uredniki: { set: (data.authors.uredniki ?? []).map((id) => ({ id })) },
      korekturno_branje: { set: (data.authors.korekturno_branje ?? []).map((id) => ({ id })) },
      prelom: { set: (data.authors.prelom ?? []).map((id) => ({ id })) },
      oblikovanje: { set: (data.authors.oblikovanje ?? []).map((id) => ({ id })) },
      ilustratorji: { set: (data.authors.ilustratorji ?? []).map((id) => ({ id })) },
    },
    select: projectDetailsSelect,
  })
}

export function deleteProject(id: number) {
  return prisma.knjiga.delete({ where: { id } })
}
