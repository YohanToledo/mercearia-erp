import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
// import { env } from '@/env'

export function useAxiosInterceptor() {
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  useEffect(() => {
    // const token = localStorage.getItem(env.VITE_SESSION_KEY)

    // const checkTokenValidity = async () => {
    //   if (!token) {
    //     navigate('/')
    //     setLoading(false)
    //     return
    //   }

    //   try {
    //     await validateToken({ token })
    //   } catch (error) {
    //     localStorage.removeItem(env.VITE_SESSION_KEY)

    //     queryClient.clear()

    //     navigate('/', { replace: true })

    //     setLoading(false)
    //     return
    //   }

    //   const currentPath = window.location.pathname
    //   if (currentPath === '/') {
    //     navigate('/workspace/connectors', { replace: true })
    //   } else {
    //     navigate(currentPath, { replace: true })
    //   }

    //   const interceptorId = api.interceptors.response.use(
    //     response => response,
    //     error => {
    //       if (isAxiosError(error)) {
    //         const status = error.response?.status
    //         const code = error.response?.data?.code

    //         if (status === 401 && code === 'UNAUTHORIZED') {
    //           localStorage.removeItem(env.VITE_SESSION_KEY)

    //           queryClient.clear()

    //           navigate('/', { replace: true })
    //         }
    //       }

    //       return Promise.reject(error)
    //     },
    //   )

    //   setLoading(false)

    //   return () => {
    //     api.interceptors.response.eject(interceptorId)
    //   }
    // }

    setLoading(false)
    // checkTokenValidity()
  }, [navigate, queryClient])

  return loading
}
