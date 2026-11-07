import styles from './Header.module.css'
import { NavLink } from 'react-router-dom'

const sections = [
  { label: 'Projekti', to: '/projekti' },
  { label: 'Uredniki', to: '/uredniki' },
  { label: 'Avtorji', to: '/avtorji' },
]

function Header() {
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

      <NavLink className={styles.userButton!} to="/prijava">
        Uporabnik
      </NavLink>
    </header>
  )
}

export default Header
