
import { createBrowserRouter, Outlet, Navigate, RouteObject } from "react-router-dom";
import { lazy, Suspense } from "react";
import { adminRoutes } from "./admin-routes";
import { authRoutes } from "./auth-routes";
import { dashboardRoutes } from "./dashboard-routes"; 
import { onboardingRoutes } from "./onboarding-routes";
import { marketingRoutes } from "./marketing-routes";
import { devRoutes } from "./dev-routes";
import { globalRoutes } from "./global-routes";
import { NavigationManager } from "@/components/NavigationManager";
import { NavigationTracker } from "@/components/NavigationTracker";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import RootLayout from "@/components/layouts/RootLayout";
import NotFound from "@/pages/NotFound";
import Index from "@/pages/Index";
import Home from "@/pages/Home";
import Pricing from "@/pages/Pricing";
import SystemDiagnostics from "@/pages/SystemDiagnostics";
import { logger } from "@/utils/loggingService";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
import Compliance from "@/pages/Compliance";

// Lazy-load the compliance routes wrapper component
const ComplianceRoutesWrapper = lazy(() => import('./ComplianceRoutesWrapper'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="flex flex-col items-center space-y-4">
      <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="text-muted-foreground">Loading...</p>
    </div>
  </div>
);

const NavigationLayout = () => {
  logger.info('NavigationLayout rendering');
  
  return (
    <ErrorBoundary>
      <NavigationManager />
      <NavigationTracker />
      <Outlet />
    </ErrorBoundary>
  );
};

// Accessibility wrapper for the entire application
const AccessibleLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AccessibilityProvider>
      {children}
    </AccessibilityProvider>
  );
};

// Create dynamic routes with lazy loading
const createLazyRoutes = () => {
  // Public routes (not lazy-loaded)
  const publicRoutes: RouteObject[] = [
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
    // Root compliance page that handles setup and redirects to the compliance dashboard
    {
      path: "/compliance",
      element: <Compliance />,
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
  ];

  // Combine all routes
  const routes: RouteObject[] = [
    ...publicRoutes,
    ...authRoutes,
    ...dashboardRoutes,
    ...onboardingRoutes,
    ...marketingRoutes, 
    ...devRoutes,
    ...globalRoutes,
    // Add the compliance routes wrapper
    {
      path: "compliance/*",
      element: (
        <Suspense fallback={<LoadingFallback />}>
          <ComplianceRoutesWrapper />
        </Suspense>
      )
    }
  ];

  return routes;
};

// Export the router configuration for use in App.tsx
export const router = createBrowserRouter([
  {
    element: (
      <AccessibleLayout>
        <RootLayout />
      </AccessibleLayout>
    ),
    errorElement: <NotFound />,
    children: [
      {
        element: <NavigationLayout />,
        children: createLazyRoutes()
      }
    ]
  }
]);
