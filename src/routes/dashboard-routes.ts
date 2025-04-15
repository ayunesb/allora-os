
import { lazy } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';

const Dashboard = lazy(() => import('@/pages/dashboard/Dashboard'));
const Campaigns = lazy(() => import('@/pages/dashboard/Campaigns'));
const Leads = lazy(() => import('@/pages/dashboard/Leads'));
const AIAgent = lazy(() => import('@/pages/dashboard/AIAgent'));

export const dashboardRoutes = [
  {
    path: '/dashboard',
    element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
  },
  {
    path: '/dashboard/campaigns',
    element: <ProtectedRoute><Campaigns /></ProtectedRoute>,
  },
  {
    path: '/dashboard/leads',
    element: <ProtectedRoute><Leads /></ProtectedRoute>,
  },
  {
    path: '/dashboard/ai-agent',
    element: <ProtectedRoute><AIAgent /></ProtectedRoute>,
  },
];
