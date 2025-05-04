import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import { adminRoutes } from "./admin-routes";
import { authRoutes } from "./auth-routes";
import { dashboardRoutes } from "./dashboard-routes";
import { onboardingRoutes } from "./onboarding-routes";
import { marketingRoutes } from "./marketing-routes";
import { devRoutes } from "./dev-routes";
import { globalRoutes } from "./global-routes";
import { galaxyRoutes } from "./galaxy-routes";
import { academyRoutes } from "./academy-routes";
import { vaultRoutes } from "./vault-routes";
import { NavigationManager } from "@/components/NavigationManager";
import { NavigationTracker } from "@/components/NavigationTracker";
import NavigationFixer from "@/components/navigation/NavigationFixer";
import { HelpModal } from "@/components/help/HelpModal";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { logger } from "@/utils/loggingService";
import { ComplianceProvider } from "@/context/ComplianceContext";
import { Outlet, Navigate } from 'react-router-dom';
// Lazy-loaded components
const RootLayout = lazy(() => import("@/components/layouts/RootLayout"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Index = lazy(() => import("@/pages/Index"));
const Home = lazy(() => import("@/pages/Home"));
const Pricing = lazy(() => import("@/pages/Pricing"));
const SystemDiagnostics = lazy(() => import("@/pages/SystemDiagnostics"));
const Compliance = lazy(() => import("@/pages/Compliance"));
const ComplianceRoutesWrapper = lazy(() => import('./ComplianceRoutesWrapper'));
const ShopAssistant = lazy(() => import("@/pages/shop/index"));
const CampaignBuilder = lazy(() => import("@/pages/campaigns/create"));
const PluginImpact = lazy(() => import("@/pages/plugins/impact"));
// Loading fallback component
const LoadingFallback = () => (<div className="flex items-center justify-center min-h-screen">
    <div className="flex flex-col items-center space-y-4">
      <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="text-muted-foreground">Loading...</p>
    </div>
  </div>);
// Common suspense wrapper
const withSuspense = (Component) => (<Suspense fallback={<LoadingFallback />}>
    <Component />
  </Suspense>);
// Navigation layout with error boundary
const NavigationLayout = () => {
    logger.info('NavigationLayout rendering');
    return (<ErrorBoundary>
      <NavigationManager />
      <NavigationTracker />
      <NavigationFixer />
      <HelpModal />
      <Outlet />
    </ErrorBoundary>);
};
// Wrap compliance routes with the ComplianceProvider
const ComplianceRoutes = () => {
    return (<ComplianceProvider>
      <Outlet />
    </ComplianceProvider>);
};
// Create dynamic routes with lazy loading
const createLazyRoutes = () => {
    // Root route must be added first
    const rootRoutes = [
        {
            path: "/",
            element: withSuspense(Index),
        },
    ];
    // Public routes
    const publicRoutes = [
        {
            path: "/home",
            element: withSuspense(Home),
        },
        {
            path: "/launch",
            element: withSuspense(() => import("@/pages/launch").then(m => m.default)),
        },
        {
            path: "/diagnostics",
            element: withSuspense(SystemDiagnostics),
        },
        {
            path: "/pricing",
            element: withSuspense(Pricing),
        },
        {
            path: "/shop",
            element: withSuspense(ShopAssistant),
        },
        {
            path: "/campaigns/create",
            element: withSuspense(CampaignBuilder),
        },
        {
            path: "/plugins/impact",
            element: withSuspense(PluginImpact),
        },
        // Compliance routes inside a provider
        {
            path: "/compliance",
            element: <ComplianceRoutes />,
            children: [
                {
                    index: true,
                    element: withSuspense(Compliance),
                },
                {
                    path: "*",
                    element: withSuspense(() => <ComplianceRoutesWrapper />)
                }
            ]
        },
        // Common redirects for legacy/mistyped URLs
        {
            path: "/calendar",
            element: <Navigate to="/dashboard" replace/>,
        },
        {
            path: "/shop",
            element: <Navigate to="/dashboard" replace/>,
        },
        {
            path: "/dashboard/account",
            element: <Navigate to="/dashboard/profile" replace/>,
        },
        {
            path: "/dashboard/dashboard-settings",
            element: <Navigate to="/dashboard/settings" replace/>,
        },
        {
            path: "/my-leads",
            element: <Navigate to="/dashboard/leads" replace/>,
        },
    ];
    // Combine all routes - ensure rootRoutes are first
    const routes = [
        ...rootRoutes,
        ...publicRoutes,
        ...authRoutes,
        ...adminRoutes,
        ...dashboardRoutes,
        ...onboardingRoutes,
        ...marketingRoutes,
        ...devRoutes,
        ...galaxyRoutes,
        ...academyRoutes,
        ...vaultRoutes,
        // Global routes should be last (except for the catch-all 404)
        ...globalRoutes.filter(route => route.path !== "*"),
        // The 404 catch-all route must be the very last one
        {
            path: "*",
            element: withSuspense(NotFound),
        }
    ];
    return routes;
};
// Export the router configuration for use in App.tsx
export const router = createBrowserRouter([
    {
        element: (<Suspense fallback={<LoadingFallback />}>
        <RootLayout />
      </Suspense>),
        errorElement: withSuspense(NotFound),
        children: [
            {
                element: <NavigationLayout />,
                children: createLazyRoutes()
            }
        ]
    }
]);
