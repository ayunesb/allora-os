
import { lazy } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';

const Onboarding = lazy(() => import('@/pages/Onboarding'));

export const onboardingRoutes = [
  {
    path: '/onboarding',
    element: (
      <ProtectedRoute>
        <Onboarding />
      </ProtectedRoute>
    ),
  },
];
