import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styles from './UrednikPodrobnosti.module.css'

type Editor = { id: number; ime: string | null; priimek: string | null; email: string }
type EditorForm = { ime: string; priimek: string; email: string; geslo: string }
const emptyForm: EditorForm = { ime: '', priimek: '', email: '', geslo: '' }

async function responseError(response: Response) {
  const body = await response.json().catch(() => null) as { error?: string } | null
  return body?.error ?? 'Prišlo je do napake. Poskusite znova.'
}

function UrednikPodrobnosti() {
  const { id } = useParams()
  const isNew = id === undefined
  const navigate = useNavigate()
  const [form, setForm] = useState<EditorForm>(emptyForm)
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isNew) {
      setForm(emptyForm)
      setError('')
      setLoading(false)
      return
    }
    if (!id) return
    setLoading(true)
    setError('')
    let active = true
    fetch(`/api/uredniki/${id}`, { credentials: 'include' })
      .then(async (response) => {
        if (!response.ok) throw new Error(await responseError(response))
        return response.json() as Promise<Editor>
      })
      .then((editor) => {
        if (active) setForm({ ime: editor.ime ?? '', priimek: editor.priimek ?? '', email: editor.email, geslo: '' })
      })
      .catch((cause: unknown) => { if (active) setError(cause instanceof Error ? cause.message : 'Prišlo je do napake.') })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [id, isNew])

  function setField(field: keyof EditorForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setError('')
    const { geslo, ...data } = form
    const payload = isNew ? { ...data, geslo } : data
    try {
      const response = await fetch(isNew ? '/api/uredniki' : `/api/uredniki/${id}`, {
        method: isNew ? 'POST' : 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!response.ok) throw new Error(await responseError(response))
      const editor = await response.json() as Editor
      navigate(`/uredniki/${editor.id}`, { replace: true })
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Pri shranjevanju je prišlo do napake.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className={styles.message}>Nalaganje podatkov …</p>

  return (
    <section className={styles.page}>
      <Link className={styles.backLink} to="/uredniki">← Nazaj na urednike</Link>
      <div className={styles.panel}>
        <h2>{isNew ? 'Nov urednik' : 'Podatki urednika'}</h2>
        {error && <p className={styles.error} role="alert">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span>Priimek</span>
            <input autoComplete="family-name" value={form.priimek} onChange={(event) => setField('priimek', event.target.value)} />
          </label>
          <label className={styles.field}>
            <span>Ime</span>
            <input autoComplete="given-name" value={form.ime} onChange={(event) => setField('ime', event.target.value)} />
          </label>
          <label className={styles.field}>
            <span>E-poštni naslov</span>
            <input autoComplete="email" required type="email" value={form.email} onChange={(event) => setField('email', event.target.value)} />
          </label>
          {isNew && (
            <label className={styles.field}>
              <span>Začetno geslo</span>
              <input autoComplete="new-password" minLength={8} required type="password" value={form.geslo} onChange={(event) => setField('geslo', event.target.value)} />
              <small>Geslo mora vsebovati vsaj 8 znakov.</small>
            </label>
          )}
          <div className={styles.actions}>
            <button className={styles.saveButton} disabled={saving} type="submit">{saving ? 'Shranjevanje …' : isNew ? 'Dodaj urednika' : 'Shrani spremembe'}</button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default UrednikPodrobnosti
