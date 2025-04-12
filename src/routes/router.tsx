
import { createBrowserRouter, RouteObject } from "react-router-dom";
import { publicRoutes } from "./public-routes";
import { dashboardRoutes } from "./dashboard-routes";
import { adminRoutes } from "./admin-routes";
import { authRoutes } from "./auth-routes";
import { devRoutes } from "./dev-routes";
import { onboardingRoutes } from "./onboarding-routes";
import { marketingRoutes } from "./marketing-routes";
import { complianceRoutes } from "./compliance-routes";
import NotFound from "@/pages/NotFound";
import { HelpProvider } from "@/context/HelpContext";
import { HelpModal } from "@/components/help/HelpModal";
import React from "react";

// Create a wrapper component to add HelpProvider
const withHelpProvider = (element: React.ReactNode) => (
  <HelpProvider>
    {element}
    <HelpModal />
  </HelpProvider>
);

// Helper to wrap child routes with HelpProvider
const wrapChildrenWithHelpProvider = (route: RouteObject): RouteObject => {
  // Check for index routes to properly handle their types
  if ('index' in route && route.index === true) {
    return {
      ...route,
      element: withHelpProvider(route.element)
    };
  }
  
  if (route.children) {
    return {
      ...route,
      element: withHelpProvider(route.element),
      children: route.children.map(child => {
        // Preserve the 'index' property if it exists
        if ('index' in child && child.index === true) {
          return {
            ...child,
            element: withHelpProvider(child.element)
          };
        }
        return {
          ...child,
          element: withHelpProvider(child.element)
        };
      })
    };
  }
  
  return {
    ...route,
    element: withHelpProvider(route.element)
  };
};

// Flatten array routes like publicRoutes
const wrapArrayRoutes = (routes: RouteObject[]): RouteObject[] => {
  return routes.map(route => wrapChildrenWithHelpProvider(route));
};

// Handle special case for object-based routes like dashboardRoutes
const wrapObjectRoute = (route: RouteObject): RouteObject => {
  return wrapChildrenWithHelpProvider(route);
};

// Combine all routes
const routes: RouteObject[] = [
  ...wrapArrayRoutes(publicRoutes),
  wrapObjectRoute(dashboardRoutes),
  wrapObjectRoute(adminRoutes as RouteObject),
  ...wrapArrayRoutes(authRoutes),
  ...wrapArrayRoutes(devRoutes),
  ...wrapArrayRoutes(onboardingRoutes),
  ...wrapArrayRoutes(marketingRoutes),
  ...wrapArrayRoutes(complianceRoutes),
  // Add catch-all route for 404 pages
  {
    path: "*",
    element: withHelpProvider(<NotFound />)
  }
];

export const router = createBrowserRouter(routes);
