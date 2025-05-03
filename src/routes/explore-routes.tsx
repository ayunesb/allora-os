import React, { lazy, Suspense } from 'react';
import { Routes, Route, type RouteObject } from 'react-router-dom';
import { PageLoader } from '@/components/ui/page-loader';

const GalaxyExplorer = lazy(() => import('@/pages/explore/GalaxyExplorer'));

export const exploreRoutes: RouteObject[] = [
  {
    path: 'explore',
    element: <GalaxyExplorer />,
  },
];

const ExploreRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="galaxy" element={<GalaxyExplorer />} />
      </Routes>
    </Suspense>
  );
};

export default ExploreRoutes;
