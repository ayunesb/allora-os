
import { createBrowserRouter, RouteObject } from "react-router-dom";
import { publicRoutes } from "./public-routes";
import { dashboardRoutes } from "./dashboard-routes";
import { adminRoutes } from "./admin-routes";
import { authRoutes } from "./auth-routes";
import { devRoutes } from "./dev-routes";
import { onboardingRoutes } from "./onboarding-routes";
import { marketingRoutes } from "./marketing-routes";
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
  if (route.children) {
    return {
      ...route,
      element: withHelpProvider(route.element),
      children: route.children.map(child => ({
        ...child,
        element: child.element
      }))
    };
  }
  return {
    ...route,
    element: withHelpProvider(route.element)
  };
};

// Combine all routes into a flat array and wrap with HelpProvider
const routes: RouteObject[] = [
  ...publicRoutes.map(route => wrapChildrenWithHelpProvider(route)),
  wrapChildrenWithHelpProvider(dashboardRoutes as RouteObject),
  wrapChildrenWithHelpProvider(adminRoutes as RouteObject),
  ...authRoutes.map(route => wrapChildrenWithHelpProvider(route)),
  ...devRoutes.map(route => wrapChildrenWithHelpProvider(route)),
  ...onboardingRoutes.map(route => wrapChildrenWithHelpProvider(route)),
  ...marketingRoutes.map(route => wrapChildrenWithHelpProvider(route)),
  // Add catch-all route for 404 pages
  {
    path: "*",
    element: withHelpProvider(<NotFound />)
  }
];

export const router = createBrowserRouter(routes);
