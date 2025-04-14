
import { lazy } from 'react';

const NotFound = lazy(() => import('@/pages/NotFound'));
const Legal = lazy(() => import('@/pages/Legal'));
const Privacy = lazy(() => import('@/pages/Privacy'));
const GDPRCompliance = lazy(() => import('@/pages/GDPRCompliance'));
const CookieSettings = lazy(() => import('@/pages/CookieSettings'));

export const globalRoutes = [
  {
    path: '/',
    element: <Legal />,
  },
  {
    path: '/legal',
    element: <Legal />,
  },
  {
    path: '/privacy',
    element: <Privacy />,
  },
  {
    path: '/gdpr',
    element: <GDPRCompliance />,
  },
  {
    path: '/cookie-settings',
    element: <CookieSettings />,
  },
  {
    path: '/not-found',
    element: <NotFound />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
