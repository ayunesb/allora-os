
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
import Page404 from "@/pages/404";
import Index from "@/pages/Index";
import Home from "@/pages/Home";
import Pricing from "@/pages/Pricing";
import SystemDiagnostics from "@/pages/SystemDiagnostics";
import { logger } from "@/utils/loggingService";

// Create a navigation layout that includes NavigationManager
const NavigationLayout = () => {
  logger.info('NavigationLayout rendering');
  
  return (
    <ErrorBoundary>
      <>
        <NavigationManager />
        <Outlet />
      </>
    </ErrorBoundary>
  );
};

// Export the router to use in main.tsx or App.tsx
export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <Page404 />,
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
          {
            path: "/calendar",
            element: <Navigate to="/dashboard" replace />,
          },
          {
            path: "/shop",
            element: <Navigate to="/dashboard" replace />,
          },
          
          // Properly spreading all route arrays
          ...adminRoutes,
          ...complianceRoutes,
          ...publicRoutes,
          ...authRoutes,
          ...dashboardRoutes,
          ...onboardingRoutes,
          ...marketingRoutes,
          ...devRoutes,
          
          // 404 catch-all route
          {
            path: "*",
            element: <Page404 />,
          },
        ]
      }
    ]
  }
]);
