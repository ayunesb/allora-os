
import { RouteObject } from "react-router-dom";
import { lazy } from "react";

// Lazy load admin layout and all page components
const AdminLayout = lazy(() => import("@/components/layouts/AdminLayout"));
const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"));
const AdminEntities = lazy(() => import("@/pages/admin/AdminEntities"));
const AdminSettings = lazy(() => import("@/pages/admin/AdminSettings"));
const AdminWebhooks = lazy(() => import("@/pages/admin/AdminWebhooks"));
const AdminSystemHealth = lazy(() => import("@/pages/admin/AdminSystemHealth"));
const AdminLaunchPrep = lazy(() => import("@/pages/admin/AdminLaunchPrep"));
const AdminCampaigns = lazy(() => import("@/pages/admin/AdminCampaigns"));
const AdminAnalytics = lazy(() => import("@/pages/admin/AdminAnalytics"));
const AdminLeads = lazy(() => import("@/pages/admin/AdminLeads"));
const SystemPage = lazy(() => import("@/pages/admin/system"));

// Lazy load audit-related pages for better performance
const AuditPage = lazy(() => import("@/pages/admin/AuditPage"));
const RunAudit = lazy(() => import("@/pages/admin/RunAudit"));
const TechnicalImprovementsPage = lazy(() => import("@/pages/admin/TechnicalImprovementsPage"));
const StrategyImplementationPage = lazy(() => import("@/pages/admin/StrategyImplementationPage"));

export const adminRoutes: RouteObject[] = [
  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminDashboard />
      },
      {
        path: "entities",
        element: <AdminEntities />
      },
      {
        path: "settings",
        element: <AdminSettings />
      },
      {
        path: "webhooks",
        element: <AdminWebhooks />
      },
      {
        path: "system-health",
        element: <AdminSystemHealth />
      },
      {
        path: "diagnostics",
        element: <SystemPage />
      },
      {
        path: "launch-prep",
        element: <AdminLaunchPrep />
      },
      {
        path: "campaigns",
        element: <AdminCampaigns />
      },
      {
        path: "analytics",
        element: <AdminAnalytics />
      },
      {
        path: "leads",
        element: <AdminLeads />
      },
      {
        path: "audit",
        element: <AuditPage />
      },
      {
        path: "run-audit",
        element: <RunAudit />
      },
      {
        path: "technical-improvements",
        element: <TechnicalImprovementsPage />
      },
      {
        path: "strategy-implementation/:id",
        element: <StrategyImplementationPage />
      }
    ]
  }
];

export default adminRoutes;
