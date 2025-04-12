
import { createBrowserRouter } from "react-router-dom";
import { adminRoutes } from "./admin-routes";
import { complianceRoutes } from "./compliance-routes";
import SystemDiagnostics from "@/pages/SystemDiagnostics";
import { publicRoutes } from "./public-routes";
import { authRoutes } from "./auth-routes";
import { dashboardRoutes } from "./dashboard-routes"; 
import NotFound from "@/pages/NotFound";
import Pricing from "@/pages/Pricing";
import { Navigate } from "react-router-dom";
import { AppRoutes } from ".";

// Export the router to use in main.tsx or App.tsx
export const router = createBrowserRouter([
  {
    path: "/diagnostics",
    element: <SystemDiagnostics />,
  },
  {
    path: "/pricing",
    element: <Pricing />,
  },
  {
    path: "/calendar",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "/shop",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  adminRoutes,
  ...complianceRoutes,
  ...publicRoutes,
  ...authRoutes,
  ...dashboardRoutes
]);
