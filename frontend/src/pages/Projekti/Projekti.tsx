import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { usePermissions } from '../../hooks/usePermissions'
import styles from './Projekti.module.css'

type Project = { id: number; naslov: string | null; leto_izdaje: number | null }

function Projekti() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { canManage } = usePermissions()

  useEffect(() => {
    let active = true
    fetch('/api/projekti', { credentials: 'include' })
      .then(async (response) => {
        if (!response.ok) throw new Error('Seznama projektov ni bilo mogoče naložiti.')
        return response.json() as Promise<Project[]>
      })
      .then((data) => { if (active) setProjects(data) })
      .catch((cause: unknown) => { if (active) setError(cause instanceof Error ? cause.message : 'Prišlo je do napake.') })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [])

  return (
    <section className={styles.page}>
      <div className={styles.heading}>
        <h2>Projekti</h2>
        {canManage && <Link className={styles.addButton} to="/projekti/nov">Dodaj projekt</Link>}
      </div>
      {loading && <p className={styles.message}>Nalaganje projektov …</p>}
      {error && <p className={styles.error} role="alert">{error}</p>}
      {!loading && !error && projects.length === 0 && <p className={styles.message}>Seznam projektov je prazen.</p>}
      {!loading && !error && projects.length > 0 && (
        <div className={styles.grid}>
          {projects.map((project) => (
            <Link className={styles.card} key={project.id} to={`/projekti/${project.id}`}>
              <span className={styles.cardTitle}>{project.naslov || 'Brez naslova'}</span>
              {project.leto_izdaje != null && <span className={styles.year}>{project.leto_izdaje}</span>}
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}

export default Projekti
