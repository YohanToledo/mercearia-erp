import { RouteObject } from 'react-router-dom'
import { ExpenseCreatePage } from './create'
import { ExpenseListPage } from './list'

export const ExpenseRoute: RouteObject[] = [
  {
    path: 'expenses/create',
    element: <ExpenseCreatePage />,
  },
  {
    path: 'expenses/list',
    element: <ExpenseListPage />,
  }
]
