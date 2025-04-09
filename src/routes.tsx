
import { createBrowserRouter } from "react-router-dom";
import { publicRoutes } from "./routes/public-routes";
import { onboardingRoutes } from "./routes/onboarding-routes";
import { dashboardRoutes } from "./routes/dashboard-routes";
import { adminRoutes } from "./routes/admin-routes";
import { complianceRoutes } from "./routes/compliance-routes";

export const router = createBrowserRouter([
  ...publicRoutes,
  ...onboardingRoutes,
  dashboardRoutes,
  adminRoutes,
  ...complianceRoutes,
]);
