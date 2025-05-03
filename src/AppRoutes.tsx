import { exploreRoutes } from './routes/explore-routes';
import { RouteObject } from 'react-router-dom';
import { otherRoutes } from './routes/other-routes';

export const allRoutes: RouteObject[] = [
  ...exploreRoutes,
  ...otherRoutes,
];