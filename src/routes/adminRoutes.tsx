
import { RouteObject } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import Dashboard from "@/pages/admin/AdminDashboard";
import UserManagement from "@/pages/admin/UserManagement";
import CompanySettings from "@/pages/admin/CompanySettings";
import APIKeys from "@/components/admin/APIKeysTab";
import { SecurityTab } from "@/components/admin/security";
import ZapierWebhookSection from "@/components/admin/webhooks/ZapierWebhookSection";
import WebhookManagement from "@/pages/admin/WebhookManagement";
import WebhooksPage from "@/pages/admin/WebhooksPage";
import LaunchPlan from "@/pages/admin/LaunchPlan";
import ZapierReadiness from "@/pages/admin/ZapierReadiness";
import PreLaunchAudit from "@/pages/admin/PreLaunchAudit";
import ApiIntegrations from "@/pages/admin/ApiIntegrations";
import ApiConfig from "@/pages/admin/ApiConfig";
import ApiKeyManagement from "@/pages/admin/ApiKeyManagement";
import CommunicationToolsPage from "@/pages/admin/CommunicationToolsPage";

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
      element: <ApiKeyManagement />,
    },
    {
      path: "api-integrations",
      element: <ApiIntegrations />,
    },
    {
      path: "api-config", 
      element: <ApiConfig />,
    },
    {
      path: "system",
      element: <SecurityTab />,
    },
    {
      path: "integrations",
      element: <ZapierWebhookSection 
        zapierWebhook=""
        onZapierWebhookChange={() => {}}
        onTestWebhook={() => {}}
        isTestLoading={false}
      />,
    },
    {
      path: "communication-tools",
      element: <CommunicationToolsPage />,
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
    },
    {
      path: "pre-launch-audit",
      element: <PreLaunchAudit />,
    }
  ],
};
