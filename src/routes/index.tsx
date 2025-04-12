
import { createBrowserRouter } from "react-router-dom";
import { NavigationManager } from "@/components/NavigationManager";
import { HelpProvider } from "@/context/HelpContext";
import { HelpModal } from "@/components/help/HelpModal";

import { publicRoutes } from "./public-routes";
import { dashboardRoutes } from "./dashboard-routes";
import { onboardingRoutes } from "./onboarding-routes";
import { authRoutes } from "./auth-routes";
import { adminRoutes } from "./admin-routes";
import { marketingRoutes } from "./marketing-routes";
import ZoomCallback from "@/components/integration/ZoomCallback";
import NotFound from "@/pages/NotFound";

// Add NavigationManager and HelpProvider to each route
const withNavigationAndHelp = (routes) => {
  return routes.map(route => ({
    ...route,
    element: (
      <HelpProvider>
        <NavigationManager />
        {route.element}
        <HelpModal />
      </HelpProvider>
    )
  }));
};

// Special handling for dashboard and admin routes which are objects not arrays
const withNavigationAndHelpForObject = (routeObj, skipNavManager = false) => {
  if (skipNavManager) {
    return {
      ...routeObj,
      element: (
        <HelpProvider>
          {routeObj.element}
          <HelpModal />
        </HelpProvider>
      ),
      children: routeObj.children ? routeObj.children.map(child => ({
        ...child,
        element: (
          <HelpProvider>
            {child.element}
            <HelpModal />
          </HelpProvider>
        )
      })) : routeObj.children
    };
  }
  
  if (routeObj.children) {
    return {
      ...routeObj,
      element: (
        <HelpProvider>
          <NavigationManager />
          {routeObj.element}
          <HelpModal />
        </HelpProvider>
      ),
      children: routeObj.children.map(childRoute => ({
        ...childRoute,
        element: (
          <HelpProvider>
            <NavigationManager />
            {childRoute.element}
            <HelpModal />
          </HelpProvider>
        )
      }))
    };
  }
  
  return {
    ...routeObj,
    element: (
      <HelpProvider>
        <NavigationManager />
        {routeObj.element}
        <HelpModal />
      </HelpProvider>
    )
  };
};

// Collect all routes as a flat array
const routes = [
  ...withNavigationAndHelp(publicRoutes),
  withNavigationAndHelpForObject(dashboardRoutes),
  ...withNavigationAndHelp(onboardingRoutes),
  ...withNavigationAndHelp(authRoutes),
  withNavigationAndHelpForObject(adminRoutes, true), // Skip NavigationManager for admin
  ...withNavigationAndHelp(marketingRoutes),
  {
    path: "/zoom-callback",
    element: (
      <HelpProvider>
        <NavigationManager />
        <ZoomCallback />
        <HelpModal />
      </HelpProvider>
    ),
  },
  // Add a catch-all route for 404 pages
  {
    path: "*",
    element: (
      <HelpProvider>
        <NavigationManager />
        <NotFound />
        <HelpModal />
      </HelpProvider>
    ),
  },
];

export const router = createBrowserRouter(routes);

// Export a component to use in main.tsx
export const AppRoutes = () => {
  return null; // This component doesn't render anything as the router is used externally
};
