import styles from './Header.module.css'
import { NavLink, useNavigate } from 'react-router-dom'

const sections = [
  { label: 'Projekti', to: '/projekti' },
  { label: 'Uredniki', to: '/uredniki' },
  { label: 'Avtorji', to: '/avtorji' },
]

function Header() {
  const navigate = useNavigate()

  async function handleLogout() {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })
    } catch {
      // Continue to the login page even if the API is temporarily unavailable.
    }
    navigate('/prijava', { replace: true })
  }

  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        {sections.map(({ label, to }) => (
          <NavLink
            className={({ isActive }) =>
              `${styles.navButton}${isActive ? ` ${styles.active}` : ''}`
            }
            key={to}
            to={to}
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <h1 className={styles.title}>Uredniški portal</h1>

      <button className={styles.userButton!} onClick={handleLogout} type="button">
        Odjava
      </button>
    </header>
  )
}

export default Header
