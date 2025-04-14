
import { RouteObject } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout"; // Updated path
import Dashboard from "@/pages/admin/AdminDashboard"; // Updated import
import UserManagement from "@/pages/admin/UserManagement";
import CompanySettings from "@/pages/admin/CompanySettings";
import APIKeys from "@/components/admin/APIKeysTab"; // Updated path
import SystemSettings from "@/components/admin/settings/SecurityTab"; // Updated path
import IntegrationsPage from "@/components/admin/webhooks/ZapierWebhookSection"; // Updated path
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
