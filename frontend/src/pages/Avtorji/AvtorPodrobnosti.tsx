import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styles from './AvtorPodrobnosti.module.css'

type Author = {
  id: number
  ime: string | null
  priimek: string | null
  spol: 'moski' | 'zenska' | null
  opis: string | null
}

type AuthorForm = Omit<Author, 'id'>
const emptyForm: AuthorForm = { ime: '', priimek: '', spol: 'moski', opis: '' }

async function responseError(response: Response) {
  const body = await response.json().catch(() => null) as { error?: string } | null
  return body?.error ?? 'Prišlo je do napake. Poskusite znova.'
}

function AvtorPodrobnosti() {
  const { id } = useParams()
  console.log(id)
  const isNew = id === undefined
  const navigate = useNavigate()
  const [form, setForm] = useState<AuthorForm>(emptyForm)
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
    fetch(`/api/avtorji/${id}`, { credentials: 'include' })
      .then(async (response) => {
        if (!response.ok) throw new Error(await responseError(response))
        return response.json() as Promise<Author>
      })
      .then((author) => {
        if (active) setForm({ ime: author.ime ?? '', priimek: author.priimek ?? '', spol: author.spol, opis: author.opis ?? '' })
      })
      .catch((cause: unknown) => { if (active) setError(cause instanceof Error ? cause.message : 'Prišlo je do napake.') })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [id, isNew])

  function setField<K extends keyof AuthorForm>(field: K, value: AuthorForm[K]) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setError('')
    const payload = Object.fromEntries(Object.entries(form).map(([key, value]) => [key, value === '' ? null : value]))
    try {
      const response = await fetch(isNew ? '/api/avtorji' : `/api/avtorji/${id}`, {
        method: isNew ? 'POST' : 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!response.ok) throw new Error(await responseError(response))
      const author = await response.json() as Author
      navigate(`/avtorji/${author.id}`, { replace: true })
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Pri shranjevanju je prišlo do napake.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!id || !window.confirm('Ali res želite izbrisati tega avtorja?')) return
    setSaving(true)
    setError('')
    try {
      const response = await fetch(`/api/avtorji/${id}`, { method: 'DELETE', credentials: 'include' })
      if (!response.ok) throw new Error(await responseError(response))
      navigate('/avtorji', { replace: true })
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Pri brisanju je prišlo do napake.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className={styles.message}>Nalaganje podatkov …</p>

  return (
    <section className={styles.page}>
      <Link className={styles.backLink} to="/avtorji">← Nazaj na avtorje</Link>
      <div className={styles.panel}>
        <h2>{isNew ? 'Nov avtor' : 'Podatki avtorja'}</h2>
        {error && <p className={styles.error} role="alert">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span>Priimek</span>
            <input autoComplete="family-name" value={form.priimek ?? ''} onChange={(event) => setField('priimek', event.target.value)} />
          </label>
          <label className={styles.field}>
            <span>Ime</span>
            <input autoComplete="given-name" value={form.ime ?? ''} onChange={(event) => setField('ime', event.target.value)} />
          </label>
          <label className={styles.field}>
            <span>Spol</span>
            <select value={form.spol ?? ''} onChange={(event) => setField('spol', (event.target.value || null) as AuthorForm['spol'])}>
              <option value="">Ni navedeno</option>
              <option value="moski">Moški</option>
              <option value="zenska">Ženska</option>
            </select>
          </label>
          <label className={styles.field}>
            <span>Opis</span>
            <textarea rows={6} value={form.opis ?? ''} onChange={(event) => setField('opis', event.target.value)} />
          </label>
          <div className={styles.actions}>
            <button className={styles.saveButton} disabled={saving} type="submit">{saving ? 'Shranjevanje …' : isNew ? 'Dodaj avtorja' : 'Shrani spremembe'}</button>
            {!isNew && <button className={styles.deleteButton} disabled={saving} onClick={handleDelete} type="button">Izbriši avtorja</button>}
          </div>
        </form>
      </div>
    </section>
  )
}

export default AvtorPodrobnosti
