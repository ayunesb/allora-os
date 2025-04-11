
import { createBrowserRouter } from "react-router-dom";
import { publicRoutes } from "./public-routes";
import { dashboardRoutes } from "./dashboard-routes";
import { adminRoutes } from "./admin-routes";
import { authRoutes } from "./auth-routes";
import { devRoutes } from "./dev-routes";
import { onboardingRoutes } from "./onboarding-routes";
import { marketingRoutes } from "./marketing-routes";
import NotFound from "@/pages/NotFound";

export const router = createBrowserRouter([
  ...publicRoutes,
  dashboardRoutes,
  adminRoutes,
  ...authRoutes,
  ...devRoutes,
  ...onboardingRoutes,
  ...marketingRoutes,
  // Add catch-all route for 404 pages
  {
    path: "*",
    element: <NotFound />
  }
]);
