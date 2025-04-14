
import { lazy } from 'react';

const DevAdminHelper = lazy(() => import('@/pages/dev/DevAdminHelper'));
const DevDebugPage = lazy(() => import('@/pages/dev/DevDebugPage'));

export const devRoutes = [
  {
    path: '/dev-admin-helper',
    element: <DevAdminHelper />,
  },
  {
    path: '/dev/debug',
    element: <DevDebugPage />,
  },
];
