
import { createBrowserRouter, Outlet, Navigate } from "react-router-dom";
import { adminRoutes } from "./admin-routes";
import { complianceRoutes } from "./compliance-routes";
import { publicRoutes } from "./public-routes";
import { authRoutes } from "./auth-routes";
import { dashboardRoutes } from "./dashboard-routes"; 
import { onboardingRoutes } from "./onboarding-routes";
import { marketingRoutes } from "./marketing-routes";
import { devRoutes } from "./dev-routes";
import { NavigationManager } from "@/components/NavigationManager";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import RootLayout from "@/components/layouts/RootLayout";
import NotFound from "@/pages/NotFound";
import Index from "@/pages/Index";
import Home from "@/pages/Home";
import Pricing from "@/pages/Pricing";
import SystemDiagnostics from "@/pages/SystemDiagnostics";
import { logger } from "@/utils/loggingService";
import AdminLayout from "@/components/AdminLayout";
import AdminIndex from "@/pages/admin/Index";

const NavigationLayout = () => {
  logger.info('NavigationLayout rendering');
  
  return (
    <ErrorBoundary>
      <NavigationManager />
      <Outlet />
    </ErrorBoundary>
  );
};

// Comment out the router definition as we're now using BrowserRouter in App.tsx
/*
export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        element: <NavigationLayout />,
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
          // Common redirects for legacy/mistyped URLs
          {
            path: "/calendar",
            element: <Navigate to="/dashboard" replace />,
          },
          {
            path: "/shop",
            element: <Navigate to="/dashboard" replace />,
          },
          {
            path: "/dashboard/account",
            element: <Navigate to="/dashboard/profile" replace />,
          },
          {
            path: "/dashboard/dashboard-settings",
            element: <Navigate to="/dashboard/settings" replace />,
          },
          {
            path: "/my-leads",
            element: <Navigate to="/dashboard/leads" replace />,
          },
          
          // Include all routes
          ...publicRoutes,
          ...authRoutes,
          ...adminRoutes,
          ...dashboardRoutes,
          ...complianceRoutes,
          ...onboardingRoutes,
          ...marketingRoutes, 
          ...devRoutes,
          
          // Remove redundant admin route that conflicts with the proper admin routes
          // {
          //   path: "/admin",
          //   element: <AdminLayout><AdminIndex /></AdminLayout>,
          // },
          // {
          //   path: "/admin/dashboard",
          //   element: <Navigate to="/admin" replace />,
          // },
          
          // Wildcard route - must be at the very end
          {
            path: "*",
            element: <NotFound />,
          },
        ]
      }
    ]
  }
]);
*/

// Export an empty object to avoid import errors
export const router = {};
