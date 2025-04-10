
import { createBrowserRouter } from "react-router-dom";

import { publicRoutes } from "./public-routes";
import { dashboardRoutes } from "./dashboard-routes";
import { onboardingRoutes } from "./onboarding-routes";
import { authRoutes } from "./auth-routes";
import { adminRoutes } from "./admin-routes";
import { marketingRoutes } from "./marketing-routes";
import ZoomCallback from "@/components/integration/ZoomCallback";

export const router = createBrowserRouter([
  ...publicRoutes,
  dashboardRoutes,
  ...onboardingRoutes,
  ...authRoutes,
  adminRoutes, // This was causing the issue - adminRoutes is already an object, not an array
  ...marketingRoutes,
  {
    path: "/zoom-callback",
    element: <ZoomCallback />,
  },
]);
