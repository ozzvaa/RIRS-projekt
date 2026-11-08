import { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

function RequireAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const location = useLocation()

  useEffect(() => {
    let active = true

    fetch('/api/auth/me', { credentials: 'include' })
      .then((response) => {
        if (active) setIsAuthenticated(response.ok)
      })
      .catch(() => {
        if (active) setIsAuthenticated(false)
      })

    return () => {
      active = false
    }
  }, [])

  if (isAuthenticated === null) {
    return <p role="status">Preverjam prijavo …</p>
  }

  if (!isAuthenticated) {
    return <Navigate to="/prijava" replace state={{ from: location }} />
  }

  return <Outlet />
}

export default RequireAuth
