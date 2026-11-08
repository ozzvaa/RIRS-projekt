import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Avtorji.module.css'

type Author = { id: number; ime: string | null; priimek: string | null }

function Avtorji() {
  const [authors, setAuthors] = useState<Author[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    fetch('/api/avtorji', { credentials: 'include' })
      .then(async (response) => {
        if (!response.ok) throw new Error('Seznama avtorjev ni bilo mogoče naložiti.')
        return response.json() as Promise<Author[]>
      })
      .then((data) => { if (active) setAuthors(data) })
      .catch((cause: unknown) => {
        if (active) setError(cause instanceof Error ? cause.message : 'Prišlo je do napake.')
      })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [])

  return (
    <section className={styles.page}>
      <div className={styles.heading}>
        <h2>Avtorji</h2>
        <Link className={styles.addButton} to="/avtorji/nov">Dodaj avtorja</Link>
      </div>

      {loading && <p className={styles.message}>Nalaganje avtorjev …</p>}
      {error && <p className={styles.error} role="alert">{error}</p>}
      {!loading && !error && authors.length === 0 && <p className={styles.message}>Seznam avtorjev je prazen.</p>}

      {!loading && !error && authors.length > 0 && (
        <div className={styles.grid}>
          {authors.map((author) => (
            <Link className={styles.card} key={author.id} to={`/avtorji/${author.id}`}>
              <span>{[author.ime, author.priimek].filter(Boolean).join(' ') || 'Neimenovan avtor'}</span>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}

export default Avtorji
