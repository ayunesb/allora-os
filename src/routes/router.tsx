import { createBrowserRouter, Outlet, Navigate } from "react-router-dom";
import { adminRoutes } from "./adminRoutes";
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
import DashboardLayout from "@/components/DashboardLayout";

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
          
          // Admin routes
          adminRoutes,
          
          // Dashboard routes with layout wrapper
          {
            path: "dashboard",
            element: <DashboardLayout />,
            children: dashboardRoutes[0].children
          },
          
          // Other routes
          ...complianceRoutes,
          ...publicRoutes,
          ...authRoutes,
          ...onboardingRoutes,
          ...marketingRoutes,
          ...devRoutes,
          
          {
            path: "*",
            element: <Page404 />,
          },
        ]
      }
    ]
  }
]);
