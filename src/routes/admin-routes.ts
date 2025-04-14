
import { lazy } from 'react';
import AdminRoute from '@/components/AdminRoute';
import ProtectedRoute from '@/components/ProtectedRoute';

const AdminDashboard = lazy(() => import('@/pages/admin/Dashboard'));
const ApiDocumentation = lazy(() => import('@/pages/admin/ApiDocumentation'));
const PreLaunchAudit = lazy(() => import('@/pages/admin/PreLaunchAudit'));
const DevHelperRedirect = lazy(() => import('@/pages/admin/DevHelperRedirect'));

export const adminRoutes = [
  {
    path: '/admin',
    element: (
      <ProtectedRoute adminOnly>
        <AdminRoute>
          <AdminDashboard />
        </AdminRoute>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/api-docs',
    element: (
      <ProtectedRoute adminOnly>
        <AdminRoute>
          <ApiDocumentation />
        </AdminRoute>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/audit',
    element: (
      <ProtectedRoute adminOnly>
        <AdminRoute>
          <PreLaunchAudit />
        </AdminRoute>
      </ProtectedRoute>
    ),
  },
  {
    path: '/dev-admin-helper',
    element: <DevHelperRedirect />,
  },
];
