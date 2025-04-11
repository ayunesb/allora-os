
import { createBrowserRouter } from "react-router-dom";
import { NavigationManager } from "@/components/NavigationManager";

import { publicRoutes } from "./public-routes";
import { dashboardRoutes } from "./dashboard-routes";
import { onboardingRoutes } from "./onboarding-routes";
import { authRoutes } from "./auth-routes";
import { adminRoutes } from "./admin-routes";
import { marketingRoutes } from "./marketing-routes";
import ZoomCallback from "@/components/integration/ZoomCallback";
import NotFound from "@/pages/NotFound";

// Add NavigationManager to each route that isn't the admin routes
const withNavigationManager = (routes) => {
  return routes.map(route => ({
    ...route,
    element: (
      <>
        <NavigationManager />
        {route.element}
      </>
    )
  }));
};

// Handle special case for dashboard route and admin routes which are objects not arrays
const withNavigationManagerForObject = (routeObj, skipNavManager = false) => {
  if (skipNavManager) {
    return routeObj; // Return without NavigationManager for admin routes
  }
  
  if (routeObj.children) {
    return {
      ...routeObj,
      children: routeObj.children.map(childRoute => ({
        ...childRoute,
        element: (
          <>
            <NavigationManager />
            {childRoute.element}
          </>
        )
      }))
    };
  }
  
  return {
    ...routeObj,
    element: (
      <>
        <NavigationManager />
        {routeObj.element}
      </>
    )
  };
};

// Collect all routes as a flat array
const routes = [
  ...withNavigationManager(publicRoutes),
  withNavigationManagerForObject(dashboardRoutes),
  ...withNavigationManager(onboardingRoutes),
  ...withNavigationManager(authRoutes),
  withNavigationManagerForObject(adminRoutes, true), // Skip NavigationManager for admin
  ...withNavigationManager(marketingRoutes),
  {
    path: "/zoom-callback",
    element: (
      <>
        <NavigationManager />
        <ZoomCallback />
      </>
    ),
  },
  // Add a catch-all route for 404 pages
  {
    path: "*",
    element: (
      <>
        <NavigationManager />
        <NotFound />
      </>
    ),
  },
];

export const router = createBrowserRouter(routes);

// Export a component to use in main.tsx
export const AppRoutes = () => {
  return null; // This component doesn't render anything as the router is used externally
};
