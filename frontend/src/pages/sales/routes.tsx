import { RouteObject } from 'react-router-dom'

import { SalesCreatePage } from './create/index.tsx'
import { SalesReportsPage } from './reports/index.tsx'

export const SalesRoute: RouteObject[] = [
  {
    path: 'sales/create',
    element: <SalesCreatePage />,
  },
  {
    path: 'sales/reports',
    element: <SalesReportsPage />,
  },
]
