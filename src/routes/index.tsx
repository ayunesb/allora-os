
import { createBrowserRouter } from "react-router-dom";
import { NavigationManager } from "@/components/NavigationManager";

import { publicRoutes } from "./public-routes";
import { dashboardRoutes } from "./dashboard-routes";
import { onboardingRoutes } from "./onboarding-routes";
import { authRoutes } from "./auth-routes";
import { adminRoutes } from "./admin-routes";
import { marketingRoutes } from "./marketing-routes";
import ZoomCallback from "@/components/integration/ZoomCallback";

// Wrap layout components with NavigationManager
const wrapWithNavManager = (element: React.ReactNode) => (
  <>
    <NavigationManager />
    {element}
  </>
);

// Modified routes with NavigationManager
const enhancedPublicRoutes = publicRoutes.map(route => ({
  ...route,
  element: wrapWithNavManager(route.element)
}));

const enhancedOnboardingRoutes = onboardingRoutes.map(route => ({
  ...route,
  element: wrapWithNavManager(route.element)
}));

const enhancedAuthRoutes = authRoutes.map(route => ({
  ...route,
  element: wrapWithNavManager(route.element)
}));

const enhancedMarketingRoutes = marketingRoutes.map(route => ({
  ...route,
  element: wrapWithNavManager(route.element)
}));

// Special handling for dashboard and admin routes which are already objects
const enhancedDashboardRoutes = {
  ...dashboardRoutes,
  element: wrapWithNavManager(dashboardRoutes.element)
};

const enhancedAdminRoutes = {
  ...adminRoutes,
  element: wrapWithNavManager(adminRoutes.element)
};

export const router = createBrowserRouter([
  ...enhancedPublicRoutes,
  enhancedDashboardRoutes,
  ...enhancedOnboardingRoutes,
  ...enhancedAuthRoutes,
  enhancedAdminRoutes,
  ...enhancedMarketingRoutes,
  {
    path: "/zoom-callback",
    element: wrapWithNavManager(<ZoomCallback />),
  },
]);
