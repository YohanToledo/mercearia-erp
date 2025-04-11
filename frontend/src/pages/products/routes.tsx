import { RouteObject } from 'react-router-dom'

import { ProductListPage } from './list/index.tsx'
import { ProductCreatePage } from './create/index.tsx'
import { ProductUpdatePage } from './update/index.tsx'
import { ProductReportsPage } from './reports/index.tsx'

export const ProductRoute: RouteObject[] = [
  {
    path: 'products',
    element: <ProductListPage />,
  },
  {
    path: 'products/create',
    element: <ProductCreatePage />,
  },
  {
    path: 'products/update/:id',
    element: <ProductUpdatePage />,
  },
  {
    path: 'products/reports',
    element: <ProductReportsPage />,
  },
]
