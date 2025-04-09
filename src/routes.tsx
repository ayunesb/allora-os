
import { RouteObject } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

import { publicRoutes } from "./routes/public-routes";
import { dashboardRoutes } from "./routes/dashboard-routes";
import { onboardingRoutes } from "./routes/onboarding-routes";
import { adminRoutes } from "./routes/admin-routes";
import { complianceRoutes } from "./routes/compliance-routes";
import { AuthProvider } from "./context/AuthContext";
import App from "./App";

// Combine all route configurations
const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      ...publicRoutes,
      dashboardRoutes,
      ...onboardingRoutes,
      adminRoutes,
      ...complianceRoutes,
    ],
  },
];

export function AppRoutes() {
  return (
    <>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
      <Toaster position="top-right" />
    </>
  );
}

// Export the routes
export default routes;
