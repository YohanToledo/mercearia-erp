import { useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'

import { env } from '@/env'

interface JwtPayload {
  name?: string
  [key: string]: unknown
}

const useUserFromToken = () => {
  const [userName, setUserName] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem(env.VITE_SESSION_KEY)

    if (token) {
      try {
        const decodedToken = jwtDecode<JwtPayload>(token)

        if (decodedToken?.name) {
          setUserName(decodedToken.name)
        }
      } catch (error) {
        localStorage.removeItem(env.VITE_SESSION_KEY)
      }
    }
  }, [])

  return userName
}

export default useUserFromToken
