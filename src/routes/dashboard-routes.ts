
import { lazy } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';

const DashboardIndex = lazy(() => import('@/pages/dashboard/Index'));
const DashboardProfile = lazy(() => import('@/pages/dashboard/Profile'));
const DashboardSettings = lazy(() => import('@/pages/dashboard/Settings'));

export const dashboardRoutes = [
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardIndex />
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard/profile',
    element: (
      <ProtectedRoute>
        <DashboardProfile />
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard/settings',
    element: (
      <ProtectedRoute>
        <DashboardSettings />
      </ProtectedRoute>
    ),
  },
];
