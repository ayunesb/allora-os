
import { RouteObject } from "react-router-dom";
import { lazy, Suspense } from "react";
import { logger } from "@/utils/loggingService";

// Import components directly to avoid module resolution issues
import Index from "@/pages/admin/Index";
import AdminCampaigns from "@/pages/admin/AdminCampaigns";
import PageNotFound from "@/pages/PageNotFound";

// Create loading fallback for lazy-loaded components
const LazyLoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

// Lazy load admin pages to improve initial load performance
const LazyAdminSettings = lazy(() => import("@/pages/admin/AdminSettings"));
const LazyAdminUsers = lazy(() => import("@/pages/admin/AdminUsers"));
const LazyAdminAnalytics = lazy(() => import("@/pages/admin/AdminAnalytics"));
const LazyAdminLeads = lazy(() => import("@/pages/admin/AdminLeads"));
const LazyAdminCompanies = lazy(() => import("@/pages/admin/AdminCompanies"));

// Define the routes
const adminRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: <Index />,
  },
  {
    path: "/admin/campaigns",
    element: <AdminCampaigns />
  },
  {
    path: "/admin/settings",
    element: (
      <Suspense fallback={<LazyLoadingFallback />}>
        <LazyAdminSettings />
      </Suspense>
    )
  },
  {
    path: "/admin/users",
    element: (
      <Suspense fallback={<LazyLoadingFallback />}>
        <LazyAdminUsers />
      </Suspense>
    )
  },
  {
    path: "/admin/analytics",
    element: (
      <Suspense fallback={<LazyLoadingFallback />}>
        <LazyAdminAnalytics />
      </Suspense>
    )
  },
  {
    path: "/admin/leads",
    element: (
      <Suspense fallback={<LazyLoadingFallback />}>
        <LazyAdminLeads />
      </Suspense>
    )
  },
  {
    path: "/admin/companies",
    element: (
      <Suspense fallback={<LazyLoadingFallback />}>
        <LazyAdminCompanies />
      </Suspense>
    )
  },
  // Catch-all route for any other admin paths
  {
    path: "/admin/*",
    element: <PageNotFound />
  }
];

// Export the routes array directly
export { adminRoutes };
export default adminRoutes;
