
import { createBrowserRouter } from "react-router-dom";
import { NavigationManager } from "@/components/NavigationManager";

import { publicRoutes } from "./public-routes";
import { dashboardRoutes } from "./dashboard-routes";
import { onboardingRoutes } from "./onboarding-routes";
import { authRoutes } from "./auth-routes";
import { adminRoutes } from "./admin-routes";
import { marketingRoutes } from "./marketing-routes";
import ZoomCallback from "@/components/integration/ZoomCallback";

// Add NavigationManager to each route
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

// Handle special case for dashboard and admin routes which are objects not arrays
const withNavigationManagerForObject = (routeObj) => ({
  ...routeObj,
  element: (
    <>
      <NavigationManager />
      {routeObj.element}
    </>
  )
});

export const router = createBrowserRouter([
  ...withNavigationManager(publicRoutes),
  withNavigationManagerForObject(dashboardRoutes),
  ...withNavigationManager(onboardingRoutes),
  ...withNavigationManager(authRoutes),
  withNavigationManagerForObject(adminRoutes),
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
]);
