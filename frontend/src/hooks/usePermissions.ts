import { useEffect, useState } from 'react'

type CurrentUser = { vloge: string[] }

export function usePermissions() {
  const [roles, setRoles] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    fetch('/api/auth/me', { credentials: 'include' })
      .then(async (response) => {
        if (!response.ok) throw new Error('Uporabniških pravic ni bilo mogoče prebrati.')
        return response.json() as Promise<CurrentUser>
      })
      .then((user) => { if (active) setRoles(user.vloge ?? []) })
      .catch(() => { if (active) setRoles([]) })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [])

  return {
    loading,
    canManage: roles.includes('GLAVNI_UREDNIK') || roles.includes('ADMIN'),
  }
}
