import { useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'

import { env } from '@/env'

export interface JwtAdminPayload {
  subscriberType?: string
  [key: string]: unknown
}

const useUserSubPermissions = () => {
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)

  useEffect(() => {
    const token = localStorage.getItem(env.VITE_SESSION_KEY)

    if (token) {
      try {
        setLoading(true)

        const decodedToken = jwtDecode<JwtAdminPayload>(token)

        if (decodedToken?.subscriberType === 'ADMIN') {
          setIsAdmin(true)
        } else {
          setIsAdmin(false)
        }
      } catch (error) {
        localStorage.removeItem(env.VITE_SESSION_KEY)
      } finally {
        setLoading(false)
      }
    }
  }, [])

  return { isAdmin, loading }
}

export default useUserSubPermissions
