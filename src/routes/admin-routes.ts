
import { RouteObject } from "react-router-dom";

export const adminRoutes: RouteObject[] = [
  {
    path: "admin",
    async lazy() {
      const { default: AdminLayout } = await import("@/components/layouts/AdminLayout");
      return { element: <AdminLayout /> };
    },
    children: [
      {
        index: true,
        async lazy() {
          const { default: AdminDashboard } = await import("@/pages/admin/AdminDashboard");
          return { element: <AdminDashboard /> };
        },
      },
      {
        path: "entities",
        async lazy() {
          const { default: AdminEntities } = await import("@/pages/admin/AdminEntities");
          return { element: <AdminEntities /> };
        },
      },
      {
        path: "users",
        async lazy() {
          const { default: AdminUsers } = await import("@/pages/admin/AdminUsers");
          return { element: <AdminUsers /> };
        },
      },
      {
        path: "companies",
        async lazy() {
          const { default: AdminCompanies } = await import("@/pages/admin/AdminCompanies");
          return { element: <AdminCompanies /> };
        },
      },
      {
        path: "settings",
        async lazy() {
          const { default: AdminSettings } = await import("@/pages/admin/AdminSettings");
          return { element: <AdminSettings /> };
        },
      },
      {
        path: "webhooks",
        async lazy() {
          const { default: AdminWebhooks } = await import("@/pages/admin/AdminWebhooks");
          return { element: <AdminWebhooks /> };
        },
      },
      {
        path: "system-health",
        async lazy() {
          const { default: AdminSystemHealth } = await import("@/pages/admin/SystemHealth");
          return { element: <AdminSystemHealth /> };
        },
      },
      {
        path: "diagnostics",
        async lazy() {
          const { default: SystemPage } = await import("@/pages/admin/system");
          return { element: <SystemPage /> };
        },
      },
      {
        path: "launch-prep",
        async lazy() {
          const { default: AdminLaunchPrep } = await import("@/pages/admin/AdminLaunchPrep");
          return { element: <AdminLaunchPrep /> };
        },
      },
      {
        path: "campaigns",
        async lazy() {
          const { default: AdminCampaigns } = await import("@/pages/admin/AdminCampaigns");
          return { element: <AdminCampaigns /> };
        },
      },
      {
        path: "analytics",
        async lazy() {
          const { default: AdminAnalytics } = await import("@/pages/admin/AdminAnalytics");
          return { element: <AdminAnalytics /> };
        },
      },
      {
        path: "leads",
        async lazy() {
          const { default: AdminLeads } = await import("@/pages/admin/AdminLeads");
          return { element: <AdminLeads /> };
        },
      }
    ]
  }
];

export default adminRoutes;
