
import { RouteObject } from "react-router-dom";
import AdminRoute from "@/components/AdminRoute";
import AdminLayout from "@/components/AdminLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import UserManagementPage from "@/pages/admin/UserManagementPage";
import Companies from "@/pages/admin/Companies";
import WebhookManagement from "@/pages/admin/WebhookManagement";
import ApiKeyManagement from "@/pages/admin/ApiKeyManagement";
import DatabaseVerification from "@/pages/admin/DatabaseVerification";
import LaunchCheck from "@/pages/admin/LaunchCheck";
import LaunchPrep from "@/pages/admin/LaunchPrep";
import TechnicalImprovements from "@/pages/dashboard/TechnicalImprovements";
import AdminSettings from "@/pages/admin/AdminSettings";
import AdminAnalytics from "@/pages/admin/AdminAnalytics";
import AdminCampaigns from "@/pages/admin/AdminCampaigns";
import AdminLeads from "@/pages/admin/AdminLeads";
import CommunicationTools from "@/pages/admin/CommunicationTools";
import PlatformStability from "@/pages/admin/PlatformStability";
import UserOnboarding from "@/pages/admin/UserOnboarding";
import AiBotLogic from "@/pages/admin/AiBotLogic";
import DashboardModules from "@/pages/admin/DashboardModules";
import ApiKeysPage from "@/pages/admin/ApiKeysPage";

export const adminRoutes: RouteObject = {
  path: "/admin",
  element: (
    <AdminRoute>
      <AdminLayout />
    </AdminRoute>
  ),
  children: [
    {
      path: "",
      element: <AdminDashboard />,
    },
    {
      path: "users",
      element: <UserManagementPage />,
    },
    {
      path: "companies",
      element: <Companies />,
    },
    {
      path: "webhooks",
      element: <WebhookManagement />,
    },
    {
      path: "api-config",
      element: <ApiKeyManagement />,
    },
    {
      path: "database",
      element: <DatabaseVerification />,
    },
    {
      path: "launch-check",
      element: <LaunchCheck />,
    },
    {
      path: "launch-prep",
      element: <LaunchPrep />,
    },
    {
      path: "technical-improvements",
      element: <TechnicalImprovements />,
    },
    {
      path: "settings",
      element: <AdminSettings />,
    },
    {
      path: "analytics",
      element: <AdminAnalytics />,
    },
    {
      path: "campaigns",
      element: <AdminCampaigns />,
    },
    {
      path: "leads",
      element: <AdminLeads />,
    },
    {
      path: "communication-tools",
      element: <CommunicationTools />,
    },
    {
      path: "platform-stability",
      element: <PlatformStability />,
    },
    {
      path: "user-onboarding",
      element: <UserOnboarding />,
    },
    {
      path: "ai-bot-logic",
      element: <AiBotLogic />,
    },
    {
      path: "dashboard-modules",
      element: <DashboardModules />,
    }
  ],
};
