import { RouteObject } from 'react-router-dom'

import { SubscriberListPage } from './subscribers/list/index.tsx'
import { AdminLayout } from '../_layouts/admin.tsx'
import { SubscriberUpdatePage } from './subscribers/update/index.tsx'
import { SubscriberCreatePage } from './subscribers/create/index.tsx'

export const adminRoute: RouteObject[] = [
  {
    path: 'admin',
    element: <AdminLayout />,
    children: [
      {
        path: 'subscribers',
        element: <SubscriberListPage />,
      },
    ],
  },
  {
    path: 'admin',
    element: <AdminLayout />,
    children: [
      {
        path: 'subscribers/create',
        element: <SubscriberCreatePage />,
      },
    ],
  },
  {
    path: 'admin',
    element: <AdminLayout />,
    children: [
      {
        path: 'subscribers/update/:id',
        element: <SubscriberUpdatePage />,
      },
    ],
  },
]
