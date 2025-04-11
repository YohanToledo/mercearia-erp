import { Outlet } from 'react-router-dom'
import { Layout, Spin } from 'antd'

import { useAxiosInterceptor } from '@/hooks/useAxiosInterceptor'
import { Header } from '@/components/Header'
import { SideBar } from '@/components/SideBar'
import { useState } from 'react'

export function AppLayout() {
  const loading = useAxiosInterceptor()
  const [collapsed, setCollapsed] = useState(false)

  if (loading) {
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

  return (
    <Layout>
      <SideBar isCollapsable={collapsed} />
      <Layout>
        <Layout.Header style={{ padding: 0 }}>
          <Header
            onClickCollapse={() => setCollapsed(!collapsed)}
            isCollapsable={collapsed}
          />
        </Layout.Header>
        <Outlet />
      </Layout>
    </Layout>
  )
}
