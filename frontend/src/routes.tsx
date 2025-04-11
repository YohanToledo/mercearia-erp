import { createBrowserRouter } from 'react-router-dom'

import { NotFound } from '@/pages/404'
import { Error } from '@/pages/error'
import { AppLayout } from '@/pages/_layouts/app'
import { AuthLayout } from '@/pages/_layouts/auth'
import { authRoute } from '@/pages/auth/routes'
import { adminRoute } from './pages/admin/routes'
import { ProductRoute } from './pages/products/routes'
import { SalesRoute } from './pages/sales/routes'
import { HomeRoute } from './pages/dashboard/routes'
import { ExpenseRoute } from './pages/expenses/routes'

export const router = createBrowserRouter([
  {
    path: '/workspace',
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      ...adminRoute,
      ...ProductRoute,
      ...SalesRoute,
      ...HomeRoute,
      ...ExpenseRoute,
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [...authRoute],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
