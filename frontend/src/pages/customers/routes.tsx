import { RouteObject } from 'react-router-dom'

import { CustomerListPage } from './list/index.tsx'
import { CustomerCreatePage } from './create/index.tsx'
import { CustomerUpdatePage } from './update/index.tsx'

export const CustomerRoute: RouteObject[] = [
  {
    path: 'customers/list',
    element: <CustomerListPage />,
  },
  {
    path: 'customers/create',
    element: <CustomerCreatePage />,
  },
  {
    path: 'customers/update/:id',
    element: <CustomerUpdatePage />,
  },
]
