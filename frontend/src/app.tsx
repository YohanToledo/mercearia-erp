import { QueryClientProvider } from '@tanstack/react-query'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { ConfigProvider } from 'antd'

import { queryClient } from '@/lib/react-query'
import { router } from '@/routes'

import { GlobalStyles } from '@/styles/global'
import { themeAntd } from '@/styles/themeAntd'

function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | erp">
        <link rel="icon" href="favicon.ico" />
      </Helmet>
      <ConfigProvider theme={themeAntd}>
        <GlobalStyles />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ConfigProvider>
    </HelmetProvider>
  )
}

export default App
