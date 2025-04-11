import { useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Spin, Layout } from 'antd'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { env } from '@/env'
import { validateToken } from '@/features/auth/api/validate-token'

export function ConnectPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: validateToken,
    onSuccess: () => {
      const token = searchParams.get('token')

      if (token) {
        localStorage.setItem(env.VITE_SESSION_KEY, token)
        navigate('/workspace/home')
      } else {
        navigate('/')
      }
    },
    onError: () => {
      navigate('/')
    },
  })

  useEffect(() => {
    const token = searchParams.get('token')

    if (token) {
      authenticate({ token })
    } else {
      navigate('/')
    }
  }, [authenticate, navigate, searchParams])

  return (
    <Layout
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spin size="large" />
    </Layout>
  )
}
