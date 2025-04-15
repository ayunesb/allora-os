
import { lazy } from 'react';

const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'));
const AdminWebhooks = lazy(() => import('@/pages/admin/AdminWebhooks'));
const AdminSystemHealth = lazy(() => import('@/pages/admin/SystemHealth'));

export const adminRoutes = [
  {
    path: '/admin',
    element: <AdminDashboard />,
  },
  {
    path: '/admin/webhooks',
    element: <AdminWebhooks />,
  },
  {
    path: '/admin/system-health',
    element: <AdminSystemHealth />,
  },
];
