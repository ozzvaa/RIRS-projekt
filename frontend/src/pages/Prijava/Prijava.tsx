import { useState, type SubmitEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './Prijava.module.css'

function Prijava() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, geslo: password }),
      })

      if (!response.ok) {
        const result = await response.json().catch(() => null) as { error?: string } | null
        setError(result?.error ?? 'Prijava ni uspela.')
        return
      }

      const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname
      navigate(from ?? '/projekti', { replace: true })
    } catch {
      setError('Povezava s strežnikom ni uspela.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Prijava</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label} htmlFor="email">Email</label>
          <input
            className={styles.input}
            id="email"
            name="email"
            type="email"
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

          {error && <p className={styles.error} role="alert">{error}</p>}
          <button className={styles.submitButton} type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Prijavljam …' : 'Prijava'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default Prijava
