
import { createBrowserRouter, Outlet } from "react-router-dom";
import { adminRoutes } from "./admin-routes";
import { complianceRoutes } from "./compliance-routes";
import SystemDiagnostics from "@/pages/SystemDiagnostics";
import { publicRoutes } from "./public-routes";
import { authRoutes } from "./auth-routes";
import { dashboardRoutes } from "./dashboard-routes"; 
import { onboardingRoutes } from "./onboarding-routes";
import NotFound from "@/pages/NotFound";
import Pricing from "@/pages/Pricing";
import { Navigate } from "react-router-dom";
import Index from "@/pages/Index";
import Home from "@/pages/Home";
import { NavigationManager } from "@/components/NavigationManager";

// Create a root layout that includes NavigationManager
const RootLayout = () => {
  return (
    <>
      <Outlet />
      <NavigationManager />
    </>
  );
};

// Export the router to use in main.tsx or App.tsx
export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Index />,
      },
      {
        path: "/home",
        element: <Home />,
      },
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
      ...dashboardRoutes,
      ...onboardingRoutes
    ]
  }
]);
