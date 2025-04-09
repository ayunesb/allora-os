
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";

import { publicRoutes } from "./routes/public-routes";
import { dashboardRoutes } from "./routes/dashboard-routes";
import { onboardingRoutes } from "./routes/onboarding-routes";
import { adminRoutes } from "./routes/admin-routes";
import { complianceRoutes } from "./routes/compliance-routes";
import App from "./App";

// Combine all route configurations
const router = createBrowserRouter([
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
]);

export function AppRoutes() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </>
  );
}
