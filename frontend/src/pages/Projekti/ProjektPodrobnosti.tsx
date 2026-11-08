import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styles from './ProjektPodrobnosti.module.css'

type Author = { id: number; ime: string | null; priimek: string | null }
type Project = Record<string, unknown> & { id: number }

const textFields = [
  ['naslov', 'Naslov'], ['podnaslov', 'Podnaslov'], ['navedba_izdaje', 'Navedba izdaje'],
  ['prevod_iz', 'Prevod iz'], ['izvirni_naslov', 'Izvirni naslov'],
  ['tisk_notranje_strani', 'Tisk notranjih strani'], ['tisk_ovitek', 'Tisk ovitka'],
  ['tisk_vezani_listi', 'Tisk vezanih listov'], ['kapitalni_trak_tip', 'Vrsta kapitalnega traku'],
  ['oznacevalna_vrvica_tip', 'Vrsta označevalne vrvice'], ['dodelava', 'Dodelava'],
  ['cobiss_Id', 'COBISS ID'], ['subvencije', 'Subvencije'],
  ['vsebina_za_katalog', 'Vsebina za katalog'], ['daljsi_sestavek_o_knjigi', 'Daljši sestavek o knjigi'],
  ['kratek_citat', 'Kratek citat'],
] as const
const integerFields = [
  ['sifra', 'Šifra'], ['leto_izdaje', 'Leto izdaje'], ['stevilo_znakov_s_presledki', 'Število znakov s presledki'],
  ['st_osnovnih_strani', 'Število osnovnih strani'], ['st_dodatnih_strani', 'Število dodatnih strani'],
  ['st_strani_skupaj', 'Skupno število strani'], ['naklada', 'Naklada'],
] as const
const decimalFields = [
  ['avtorske_pole', 'Avtorske pole'], ['nadizvod', 'Nadizvod'],
  ['znesek_subvencije', 'Znesek subvencije'], ['cena_mpc', 'Cena MPC'],
] as const
const booleanFields = [
  ['prva_izdaja', 'Prva izdaja'], ['izvirno', 'Izvirno delo'], ['kapitalni_trak', 'Kapitalni trak'],
  ['oznacevalna_vrvica', 'Označevalna vrvica'], ['jak', 'JAK'],
] as const
const authorFields = [
  ['avtorji', 'Avtorji'], ['prevajalci', 'Prevajalci'], ['lektorji', 'Lektorji'], ['uredniki', 'Uredniki'],
  ['korekturno_branje', 'Korektura'], ['prelom', 'Prelom'], ['oblikovanje', 'Oblikovanje'], ['ilustratorji', 'Ilustracije'],
] as const
const scalarKeys = [...textFields, ...integerFields, ...decimalFields, ...booleanFields].map(([key]) => key)
const emptyScalars = Object.fromEntries(scalarKeys.map((key) => [key, ''])) as Record<string, string>
const emptyAuthors = Object.fromEntries(authorFields.map(([key]) => [key, []])) as Record<string, string[]>

async function responseError(response: Response) {
  const body = await response.json().catch(() => null) as { error?: string } | null
  return body?.error ?? 'Prišlo je do napake. Poskusite znova.'
}

function ProjektPodrobnosti() {
  const { id } = useParams()
  const isNew = id === undefined
  const navigate = useNavigate()
  const [fields, setFields] = useState<Record<string, string>>(emptyScalars)
  const [authorIds, setAuthorIds] = useState<Record<string, string[]>>(emptyAuthors)
  const [authors, setAuthors] = useState<Author[]>([])
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    const loadAuthors = fetch('/api/avtorji', { credentials: 'include' }).then(async (response) => {
      if (!response.ok) throw new Error('Seznama avtorjev ni bilo mogoče naložiti.')
      return response.json() as Promise<Author[]>
    }).then((data) => { if (active) setAuthors(data) })

    if (isNew) {
      setFields({ ...emptyScalars })
      setAuthorIds({ ...emptyAuthors })
      setError('')
      setLoading(false)
      loadAuthors.catch((cause: unknown) => { if (active) setError(cause instanceof Error ? cause.message : 'Prišlo je do napake.') })
      return () => { active = false }
    }

    if (!id) return () => { active = false }
    setLoading(true)
    setError('')
    Promise.all([
      fetch(`/api/projekti/${id}`, { credentials: 'include' }).then(async (response) => {
        if (!response.ok) throw new Error(await responseError(response))
        return response.json() as Promise<Project>
      }),
      loadAuthors.then(() => undefined),
    ]).then(([project]) => {
      if (!active) return
      const nextFields = { ...emptyScalars }
      for (const key of scalarKeys) {
        const value = project[key]
        nextFields[key] = value == null ? '' : typeof value === 'boolean' ? String(value) : String(value)
      }
      setFields(nextFields)
      const nextAuthors = { ...emptyAuthors }
      for (const [key] of authorFields) {
        nextAuthors[key] = (project[key] as Author[] | undefined)?.map((author) => String(author.id)) ?? []
      }
      setAuthorIds(nextAuthors)
    }).catch((cause: unknown) => {
      if (active) setError(cause instanceof Error ? cause.message : 'Prišlo je do napake.')
    }).finally(() => { if (active) setLoading(false) })

    return () => { active = false }
  }, [id, isNew])

  function setField(key: string, value: string) {
    setFields((current) => ({ ...current, [key]: value }))
  }

  function toggleAuthor(field: string, authorId: string) {
    setAuthorIds((current) => {
      const selected = current[field] ?? []
      return { ...current, [field]: selected.includes(authorId) ? selected.filter((idValue) => idValue !== authorId) : [...selected, authorId] }
    })
  }

  function payload() {
    const result: Record<string, unknown> = {}
    for (const [key] of textFields) result[key] = fields[key] || null
    for (const [key] of integerFields) result[key] = fields[key] === '' ? null : Number(fields[key])
    for (const [key] of decimalFields) result[key] = fields[key] === '' ? null : fields[key]
    for (const [key] of booleanFields) result[key] = fields[key] === '' ? null : fields[key] === 'true'
    for (const [key] of authorFields) result[key] = (authorIds[key] ?? []).map(Number)
    return result
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setError('')
    try {
      const response = await fetch(isNew ? '/api/projekti' : `/api/projekti/${id}`, {
        method: isNew ? 'POST' : 'PATCH', credentials: 'include',
        headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload()),
      })
      if (!response.ok) throw new Error(await responseError(response))
      const project = await response.json() as Project
      navigate(`/projekti/${project.id}`, { replace: true })
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Pri shranjevanju je prišlo do napake.')
    } finally { setSaving(false) }
  }

  async function handleDelete() {
    if (!id || !window.confirm('Ali res želite izbrisati ta projekt?')) return
    setSaving(true)
    setError('')
    try {
      const response = await fetch(`/api/projekti/${id}`, { method: 'DELETE', credentials: 'include' })
      if (!response.ok) throw new Error(await responseError(response))
      navigate('/projekti', { replace: true })
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Pri brisanju je prišlo do napake.')
    } finally { setSaving(false) }
  }

  if (loading) return <p className={styles.message}>Nalaganje podatkov …</p>

  return (
    <section className={styles.page}>
      <Link className={styles.backLink} to="/projekti">← Nazaj na projekte</Link>
      <div className={styles.panel}>
        <h2>{isNew ? 'Nov projekt' : 'Podatki o projektu'}</h2>
        {error && <p className={styles.error} role="alert">{error}</p>}
        <form onSubmit={handleSubmit}>
          <h3>Osnovni podatki</h3>
          <div className={styles.fieldGrid}>
            {textFields.slice(0, 5).map(([key, label]) => <TextField key={key} fieldKey={key} label={label} value={fields[key] ?? ''} onChange={setField} />)}
            {integerFields.slice(0, 2).map(([key, label]) => <TextField key={key} fieldKey={key} label={label} type="number" value={fields[key] ?? ''} onChange={setField} />)}
            {booleanFields.slice(0, 2).map(([key, label]) => <BooleanField key={key} fieldKey={key} label={label} value={fields[key] ?? ''} onChange={setField} />)}
          </div>

          <h3>Avtorji in sodelavci</h3>
          <div className={styles.authorGrid}>
            {authorFields.map(([key, label]) => (
              <details className={styles.authorDropdown} key={key}>
                <summary>{label} <span>{authorIds[key]?.length ? `(${authorIds[key].length})` : ''}</span></summary>
                <div className={styles.authorOptions}>
                  {authors.length === 0 && <span>Ni dodanih avtorjev.</span>}
                  {authors.map((author) => {
                    const name = [author.ime, author.priimek].filter(Boolean).join(' ') || 'Neimenovan avtor'
                    return <label key={author.id}><input checked={authorIds[key]?.includes(String(author.id)) ?? false} onChange={() => toggleAuthor(key, String(author.id))} type="checkbox" />{name}</label>
                  })}
                </div>
              </details>
            ))}
          </div>

          <h3>Ostali podatki</h3>
          <div className={styles.fieldGrid}>
            {integerFields.slice(2).map(([key, label]) => <TextField key={key} fieldKey={key} label={label} type="number" value={fields[key] ?? ''} onChange={setField} />)}
            {decimalFields.map(([key, label]) => <TextField key={key} fieldKey={key} label={label} type="number" step="any" value={fields[key] ?? ''} onChange={setField} />)}
            {booleanFields.slice(2).map(([key, label]) => <BooleanField key={key} fieldKey={key} label={label} value={fields[key] ?? ''} onChange={setField} />)}
            {textFields.slice(5).map(([key, label]) => <TextField key={key} fieldKey={key} label={label} value={fields[key] ?? ''} onChange={setField} multiline={['vsebina_za_katalog', 'daljsi_sestavek_o_knjigi', 'kratek_citat'].includes(key)} />)}
          </div>

          <div className={styles.actions}>
            <button className={styles.saveButton} disabled={saving} type="submit">{saving ? 'Shranjevanje …' : isNew ? 'Dodaj projekt' : 'Shrani spremembe'}</button>
            {!isNew && <button className={styles.deleteButton} disabled={saving} onClick={handleDelete} type="button">Izbriši projekt</button>}
          </div>
        </form>
      </div>
    </section>
  )
}

function TextField({ fieldKey, label, value, onChange, type = 'text', step, multiline = false }: {
  fieldKey: string; label: string; value: string; onChange: (key: string, value: string) => void
  type?: string; step?: string; multiline?: boolean
}) {
  return <label className={styles.field}><span>{label}</span>{multiline
    ? <textarea rows={4} value={value ?? ''} onChange={(event) => onChange(fieldKey, event.target.value)} />
    : <input type={type} step={step} value={value ?? ''} onChange={(event) => onChange(fieldKey, event.target.value)} />}</label>
}

function BooleanField({ fieldKey, label, value, onChange }: { fieldKey: string; label: string; value: string; onChange: (key: string, value: string) => void }) {
  return <label className={styles.field}><span>{label}</span><select value={value ?? ''} onChange={(event) => onChange(fieldKey, event.target.value)}><option value="">Ni navedeno</option><option value="true">Da</option><option value="false">Ne</option></select></label>
}

export default ProjektPodrobnosti
