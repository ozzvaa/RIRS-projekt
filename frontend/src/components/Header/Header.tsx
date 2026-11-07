import styles from './Header.module.css'

const sections = ['Projekti', 'Uredniki', 'Avtorji']

function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.navigation} aria-label="Glavna navigacija">
        {sections.map((section) => (
          <button className={styles.navButton} key={section} type="button">
            {section}
          </button>
        ))}
      </nav>

      <h1 className={styles.title}>Uredniški portal</h1>

      <button className={styles.userButton} type="button">
        Uporabnik
      </button>
    </header>
  )
}

export default Header
