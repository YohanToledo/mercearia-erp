import { RouteObject } from 'react-router-dom'

import { SupplierListPage } from './list/index.tsx'
import { SupplierCreatePage } from './create/index.tsx'
import { SupplierUpdatePage } from './update/index.tsx'

export const SupplierRoute: RouteObject[] = [
  {
    path: 'suppliers/list',
    element: <SupplierListPage />,
  },
  {
    path: 'suppliers/create',
    element: <SupplierCreatePage />,
  },
  {
    path: 'suppliers/update/:id',
    element: <SupplierUpdatePage />,
  },
]
