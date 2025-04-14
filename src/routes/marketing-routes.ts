
import { lazy } from 'react';

const Home = lazy(() => import('@/pages/Home'));
const Pricing = lazy(() => import('@/pages/Pricing'));
const FeatureOverview = lazy(() => import('@/pages/FeatureOverview'));

export const marketingRoutes = [
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/pricing',
    element: <Pricing />,
  },
  {
    path: '/features',
    element: <FeatureOverview />,
  },
];
