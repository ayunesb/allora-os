
import { lazy } from 'react';

const NotFound = lazy(() => import('@/pages/NotFound'));
const Legal = lazy(() => import('@/pages/Legal'));
const FAQ = lazy(() => import('@/pages/FAQ'));
const Privacy = lazy(() => import('@/pages/Privacy'));
const TermsOfService = lazy(() => import('@/pages/TermsOfService'));
const Contact = lazy(() => import('@/pages/Contact'));
const Security = lazy(() => import('@/pages/Security'));

export const globalRoutes = [
  {
    path: '/404',
    element: <NotFound />,
  },
  {
    path: '/legal',
    element: <Legal />,
  },
  {
    path: '/faq',
    element: <FAQ />,
  },
  {
    path: '/privacy',
    element: <Privacy />,
  },
  {
    path: '/terms',
    element: <TermsOfService />,
  },
  {
    path: '/contact',
    element: <Contact />,
  },
  {
    path: '/security',
    element: <Security />,
  },
];
