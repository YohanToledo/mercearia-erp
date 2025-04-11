import { RouteObject } from 'react-router-dom'
import { HomePage } from './home'
import { DashboardAnalysisPage } from './analysis'
import { DashboardAnalysisPage2 } from './analysis2'

export const HomeRoute: RouteObject[] = [
  {
    path: 'home',
    element: <HomePage />,
  },
  {
    path: 'analysis',
    element: <DashboardAnalysisPage />,
  },
  {
    path: 'analysis2',
    element: <DashboardAnalysisPage2 />,
  },
]
