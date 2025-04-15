
import { RouteObject } from "react-router-dom";

export const adminRoutes: RouteObject[] = [
  {
    path: "admin",
    async lazy() {
      const { default: AdminLayout } = await import("@/components/layouts/AdminLayout");
      return { Component: AdminLayout };
    },
    children: [
      {
        index: true,
        async lazy() {
          const { default: AdminDashboard } = await import("@/pages/admin/AdminDashboard");
          return { Component: AdminDashboard };
        },
      },
      {
        path: "entities",
        async lazy() {
          const { default: AdminEntities } = await import("@/pages/admin/AdminEntities");
          return { Component: AdminEntities };
        },
      },
      {
        path: "users",
        async lazy() {
          const { default: AdminUsers } = await import("@/pages/admin/AdminUsers");
          return { Component: AdminUsers };
        },
      },
      {
        path: "companies",
        async lazy() {
          const { default: AdminCompanies } = await import("@/pages/admin/AdminCompanies");
          return { Component: AdminCompanies };
        },
      },
      {
        path: "settings",
        async lazy() {
          const { default: AdminSettings } = await import("@/pages/admin/AdminSettings");
          return { Component: AdminSettings };
        },
      },
      {
        path: "webhooks",
        async lazy() {
          const { default: AdminWebhooks } = await import("@/pages/admin/AdminWebhooks");
          return { Component: AdminWebhooks };
        },
      },
      {
        path: "system-health",
        async lazy() {
          const { default: AdminSystemHealth } = await import("@/pages/admin/SystemHealth");
          return { Component: AdminSystemHealth };
        },
      },
      {
        path: "diagnostics",
        async lazy() {
          const { default: SystemPage } = await import("@/pages/admin/system");
          return { Component: SystemPage };
        },
      },
      {
        path: "launch-prep",
        async lazy() {
          const { default: AdminLaunchPrep } = await import("@/pages/admin/AdminLaunchPrep");
          return { Component: AdminLaunchPrep };
        },
      },
      {
        path: "campaigns",
        async lazy() {
          const { default: AdminCampaigns } = await import("@/pages/admin/AdminCampaigns");
          return { Component: AdminCampaigns };
        },
      },
      {
        path: "analytics",
        async lazy() {
          const { default: AdminAnalytics } = await import("@/pages/admin/AdminAnalytics");
          return { Component: AdminAnalytics };
        },
      },
      {
        path: "leads",
        async lazy() {
          const { default: AdminLeads } = await import("@/pages/admin/AdminLeads");
          return { Component: AdminLeads };
        },
      },
      {
        path: "notion-integration",
        async lazy() {
          const { default: NotionIntegration } = await import("@/pages/admin/NotionIntegration");
          return { Component: NotionIntegration };
        },
      },
      {
        path: "stripe-integration",
        async lazy() {
          const { default: StripeIntegration } = await import("@/pages/admin/StripeIntegration");
          return { Component: StripeIntegration };
        },
      }
    ]
  }
];

export default adminRoutes;
