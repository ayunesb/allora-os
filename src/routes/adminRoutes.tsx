
import { RouteObject } from "react-router-dom";
import AdminLayout from "@/layouts/AdminLayout";
import Dashboard from "@/pages/admin/Dashboard";
import UserManagement from "@/pages/admin/UserManagement";
import CompanySettings from "@/pages/admin/CompanySettings";
import APIKeys from "@/pages/admin/APIKeys";
import SystemSettings from "@/pages/admin/SystemSettings";
import IntegrationsPage from "@/pages/admin/IntegrationsPage";
import WebhookManagement from "@/pages/admin/WebhookManagement";
import WebhooksPage from "@/pages/admin/WebhooksPage";
import LaunchPlan from "@/pages/admin/LaunchPlan";
import ZapierReadiness from "@/pages/admin/ZapierReadiness";

export const adminRoutes: RouteObject = {
  path: "admin",
  element: <AdminLayout />,
  children: [
    {
      index: true,
      element: <Dashboard />,
    },
    {
      path: "users",
      element: <UserManagement />,
    },
    {
      path: "company",
      element: <CompanySettings />,
    },
    {
      path: "api-keys",
      element: <APIKeys />,
    },
    {
      path: "system",
      element: <SystemSettings />,
    },
    {
      path: "integrations",
      element: <IntegrationsPage />,
    },
    {
      path: "webhooks",
      element: <WebhookManagement />,
    },
    {
      path: "webhooks/management",
      element: <WebhooksPage />,
    },
    {
      path: "launch-plan",
      element: <LaunchPlan />,
    },
    {
      path: "zapier-readiness",
      element: <ZapierReadiness />,
    }
  ],
};
