import { RouteObject } from 'react-router-dom'

import { SignInPage } from './sign-in'
import { ConnectPage } from './connect'

export const authRoute: RouteObject[] = [
  {
    path: '/',
    element: <SignInPage />,
  },
  {
    path: '/connect',
    element: <ConnectPage />,
  },
]
