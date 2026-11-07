import { useState, type SubmitEvent } from 'react'
import styles from './Prijava.module.css'

function Prijava() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <section className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Prijava</h1>
        <br></br>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label} htmlFor="email">Email</label>
          <input
            className={styles.input}
            id="email"
            name="email"
            placeholder="ime.priimek@urednik.si"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label className={styles.label} htmlFor="password">Geslo</label>
          <input
            className={styles.input}
            id="password"
            name="password"
            type="password"
            placeholder="Vnesite geslo"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          <button className={styles.submitButton} type="submit">Prijava</button>
        </form>
      </div>
    </section>
  )
}

export default Prijava
