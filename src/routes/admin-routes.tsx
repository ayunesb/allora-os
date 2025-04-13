
import { RouteObject } from "react-router-dom";
import { lazy, Suspense } from "react";
import { logger } from "@/utils/loggingService";
import AdminRoute from "@/components/AdminRoute";

// Import components directly to avoid module resolution issues
import Index from "@/pages/admin/Index";
import AdminCampaigns from "@/pages/admin/AdminCampaigns";
import PageNotFound from "@/pages/PageNotFound";
import SystemHealthPage from "@/pages/admin/system-health/SystemHealthPage";
import LaunchPlan from "@/pages/admin/LaunchPlan";
import LaunchCheck from "@/pages/admin/LaunchCheck";

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
    element: <AdminRoute><Index /></AdminRoute>,
  },
  {
    path: "/admin/campaigns",
    element: <AdminRoute><AdminCampaigns /></AdminRoute>
  },
  {
    path: "/admin/system-health",
    element: <AdminRoute><SystemHealthPage /></AdminRoute>
  },
  {
    path: "/admin/launch-plan",
    element: <AdminRoute><LaunchPlan /></AdminRoute>
  },
  {
    path: "/admin/launch-check",
    element: <AdminRoute><LaunchCheck /></AdminRoute>
  },
  {
    path: "/admin/launch-prep",
    element: <AdminRoute><LaunchPlan /></AdminRoute>
  },
  {
    path: "/admin/settings",
    element: (
      <Suspense fallback={<LazyLoadingFallback />}>
        <AdminRoute><LazyAdminSettings /></AdminRoute>
      </Suspense>
    )
  },
  {
    path: "/admin/users",
    element: (
      <Suspense fallback={<LazyLoadingFallback />}>
        <AdminRoute><LazyAdminUsers /></AdminRoute>
      </Suspense>
    )
  },
  {
    path: "/admin/analytics",
    element: (
      <Suspense fallback={<LazyLoadingFallback />}>
        <AdminRoute><LazyAdminAnalytics /></AdminRoute>
      </Suspense>
    )
  },
  {
    path: "/admin/leads",
    element: (
      <Suspense fallback={<LazyLoadingFallback />}>
        <AdminRoute><LazyAdminLeads /></AdminRoute>
      </Suspense>
    )
  },
  {
    path: "/admin/companies",
    element: (
      <Suspense fallback={<LazyLoadingFallback />}>
        <AdminRoute><LazyAdminCompanies /></AdminRoute>
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
