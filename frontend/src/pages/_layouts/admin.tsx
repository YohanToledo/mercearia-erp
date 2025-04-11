import { Outlet, Navigate } from 'react-router-dom'
import useUserSubPermissions from '@/hooks/useUserSubPermissions'
import { Layout, Spin } from 'antd'

export function AdminLayout() {
  const {isAdmin} = useUserSubPermissions()

  if (isAdmin === null) {
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

  if (!isAdmin) {
    return <Navigate to="/workspace/home" replace />
  }

  return <Outlet />
}
