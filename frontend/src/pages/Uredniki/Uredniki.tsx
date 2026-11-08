import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Uredniki.module.css'

type Editor = { id: number; ime: string | null; priimek: string | null }

function Uredniki() {
  const [editors, setEditors] = useState<Editor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    fetch('/api/uredniki', { credentials: 'include' })
      .then(async (response) => {
        if (!response.ok) throw new Error('Seznama urednikov ni bilo mogoče naložiti.')
        return response.json() as Promise<Editor[]>
      })
      .then((data) => { if (active) setEditors(data) })
      .catch((cause: unknown) => {
        if (active) setError(cause instanceof Error ? cause.message : 'Prišlo je do napake.')
      })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [])

  return (
    <section className={styles.page}>
      <div className={styles.heading}>
        <h2>Uredniki</h2>
        <Link className={styles.addButton} to="/uredniki/nov">Dodaj urednika</Link>
      </div>
      {loading && <p className={styles.message}>Nalaganje urednikov …</p>}
      {error && <p className={styles.error} role="alert">{error}</p>}
      {!loading && !error && editors.length === 0 && <p className={styles.message}>Seznam urednikov je prazen.</p>}
      {!loading && !error && editors.length > 0 && (
        <div className={styles.grid}>
          {editors.map((editor) => (
            <Link className={styles.card} key={editor.id} to={`/uredniki/${editor.id}`}>
              <span>{[editor.ime, editor.priimek].filter(Boolean).join(' ') || 'Neimenovan urednik'}</span>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}

export default Uredniki
