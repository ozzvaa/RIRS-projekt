import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProjectCompletion from '../../components/ProjectCompletion/ProjectCompletion'
import { usePermissions } from '../../hooks/usePermissions'
import styles from './Projekti.module.css'

type Project = { id: number; naslov: string | null; leto_izdaje: number | null; izpolnjenost: number }
type SortBy = 'naslov' | 'leto_izdaje' | 'izpolnjenost'

function Projekti() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [sortBy, setSortBy] = useState<SortBy>('naslov')
  const [ascending, setAscending] = useState(true)
  const { canManage } = usePermissions()

  const sortedProjects = [...projects].sort((first, second) => {
    if (sortBy === 'naslov') {
      const comparison = (first.naslov ?? '').localeCompare(second.naslov ?? '', 'sl', { sensitivity: 'base' })
      return ascending ? comparison : -comparison
    }
    const firstValue = first[sortBy]
    const secondValue = second[sortBy]
    if (firstValue === null || secondValue === null) {
      if (firstValue === null && secondValue === null) return 0
      return firstValue === null ? 1 : -1
    }
    const comparison = firstValue - secondValue
    return ascending ? comparison : -comparison
  })

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
      <div className={styles.sortControls}>
        <label htmlFor="project-sort">Razvrsti po</label>
        <select id="project-sort" value={sortBy} onChange={(event) => setSortBy(event.target.value as SortBy)}>
          <option value="naslov">Naslovu</option>
          <option value="leto_izdaje">Letu izdaje</option>
          <option value="izpolnjenost">Izpolnjenosti</option>
        </select>
        <button className={styles.sortDirection} type="button" onClick={() => setAscending((current) => !current)}>
          {ascending ? 'Naraščajoče ↑' : 'Padajoče ↓'}
        </button>
      </div>
      {loading && <p className={styles.message}>Nalaganje projektov …</p>}
      {error && <p className={styles.error} role="alert">{error}</p>}
      {!loading && !error && projects.length === 0 && <p className={styles.message}>Seznam projektov je prazen.</p>}
      {!loading && !error && projects.length > 0 && (
        <div className={styles.grid}>
          {sortedProjects.map((project) => (
            <Link className={styles.card} key={project.id} to={`/projekti/${project.id}`}>
              <span className={styles.cardTitle}>{project.naslov || 'Brez naslova'}</span>
              {project.leto_izdaje != null && <span className={styles.year}>{project.leto_izdaje}</span>}
              <ProjectCompletion value={project.izpolnjenost} position="card" />
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}

export default Projekti
