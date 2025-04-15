
import { RouteObject } from "react-router-dom";
import { lazy } from "react";

const AdminLayout = lazy(() => import("@/components/layouts/AdminLayout"));
const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"));
const AdminEntities = lazy(() => import("@/pages/admin/AdminEntities"));
const AdminSettings = lazy(() => import("@/pages/admin/AdminSettings"));
const AdminWebhooks = lazy(() => import("@/pages/admin/AdminWebhooks"));
const AdminSystemHealth = lazy(() => import("@/pages/admin/SystemHealth"));
const AdminLaunchPrep = lazy(() => import("@/pages/admin/AdminLaunchPrep"));
const AdminCampaigns = lazy(() => import("@/pages/admin/AdminCampaigns"));
const AdminAnalytics = lazy(() => import("@/pages/admin/AdminAnalytics"));
const AdminLeads = lazy(() => import("@/pages/admin/AdminLeads"));
const AdminUsers = lazy(() => import("@/pages/admin/AdminUsers"));
const AdminCompanies = lazy(() => import("@/pages/admin/AdminCompanies"));
const SystemPage = lazy(() => import("@/pages/admin/system"));

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
        path: "users",
        element: <AdminUsers />
      },
      {
        path: "companies",
        element: <AdminCompanies />
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
      }
    ]
  }
];

export default adminRoutes;
