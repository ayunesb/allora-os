
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
import NavigationFixer from "@/components/navigation/NavigationFixer";
import { HelpModal } from "@/components/help/HelpModal";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { logger } from "@/utils/loggingService";
import { AccessibilityProvider } from "@/context/AccessibilityContext";

// Lazy-loaded components
const RootLayout = lazy(() => import("@/components/layouts/RootLayout"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Index = lazy(() => import("@/pages/Index"));
const Home = lazy(() => import("@/pages/Home"));
const Pricing = lazy(() => import("@/pages/Pricing"));
const SystemDiagnostics = lazy(() => import("@/pages/SystemDiagnostics"));
const Compliance = lazy(() => import("@/pages/Compliance"));
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

// Common suspense wrapper
const withSuspense = (Component: React.ComponentType<any>) => (
  <Suspense fallback={<LoadingFallback />}>
    <Component />
  </Suspense>
);

const NavigationLayout = () => {
  logger.info('NavigationLayout rendering');
  
  return (
    <ErrorBoundary>
      <NavigationManager />
      <NavigationTracker />
      <NavigationFixer />
      <HelpModal />
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
  // Public routes
  const publicRoutes: RouteObject[] = [
    {
      path: "/",
      element: withSuspense(Index),
    },
    {
      path: "/home",
      element: withSuspense(Home),
    },
    {
      path: "/diagnostics",
      element: withSuspense(SystemDiagnostics),
    },
    {
      path: "/pricing",
      element: withSuspense(Pricing),
    },
    // Root compliance page that handles setup and redirects to the compliance dashboard
    {
      path: "/compliance",
      element: withSuspense(Compliance),
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
    ...adminRoutes,
    ...dashboardRoutes,
    ...onboardingRoutes,
    ...marketingRoutes, 
    ...devRoutes,
    ...globalRoutes,
    // Add the compliance routes wrapper
    {
      path: "compliance/*",
      element: withSuspense(() => <ComplianceRoutesWrapper />)
    }
  ];

  return routes;
};

// Export the router configuration for use in App.tsx
export const router = createBrowserRouter([
  {
    element: (
      <AccessibleLayout>
        <Suspense fallback={<LoadingFallback />}>
          <RootLayout />
        </Suspense>
      </AccessibleLayout>
    ),
    errorElement: withSuspense(NotFound),
    children: [
      {
        element: <NavigationLayout />,
        children: createLazyRoutes()
      }
    ]
  }
]);
