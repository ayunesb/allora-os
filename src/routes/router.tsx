
import { createBrowserRouter, RouteObject } from "react-router-dom";
import { publicRoutes } from "./public-routes";
import { dashboardRoutes } from "./dashboard-routes";
import { adminRoutes } from "./admin-routes";
import { authRoutes } from "./auth-routes";
import { devRoutes } from "./dev-routes";
import { onboardingRoutes } from "./onboarding-routes";
import { marketingRoutes } from "./marketing-routes";
import NotFound from "@/pages/NotFound";

// Combine all routes into a flat array
const routes: RouteObject[] = [
  ...publicRoutes,
  dashboardRoutes as RouteObject,
  adminRoutes as RouteObject,
  ...authRoutes,
  ...devRoutes,
  ...onboardingRoutes,
  ...marketingRoutes,
  // Add catch-all route for 404 pages
  {
    path: "*",
    element: <NotFound />
  }
];

export const router = createBrowserRouter(routes);
