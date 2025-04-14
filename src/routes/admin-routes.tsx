
import { RouteObject } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import AdminRoute from "@/components/AdminRoute";
import LaunchPlan from "@/pages/admin/LaunchPlan";
import LaunchCheck from "@/pages/admin/LaunchCheck";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import UserManagement from "@/pages/admin/UserManagement";
import Companies from "@/pages/admin/Companies";
import Campaigns from "@/pages/admin/Campaigns";
import Leads from "@/pages/admin/Leads";
import Analytics from "@/pages/admin/Analytics";
import Webhooks from "@/pages/admin/Webhooks";
import ApiConfig from "@/pages/admin/ApiConfig";
import DatabaseVerification from "@/pages/admin/DatabaseVerification";
import AiBotLogic from "@/pages/admin/AiBotLogic";
import UserOnboarding from "@/pages/admin/UserOnboarding";
import DashboardModules from "@/pages/admin/DashboardModules";
import CommunicationTools from "@/pages/admin/CommunicationTools";
import NotFound from "@/pages/NotFound";
import SystemPage from "@/pages/admin/system";

export const adminRoutes: RouteObject[] = [
  {
    path: "admin",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "users",
        element: <UserManagement />,
      },
      {
        path: "users/:userId",
        element: <UserManagement />,
      },
      {
        path: "users/new",
        element: <UserManagement />,
      },
      {
        path: "companies",
        element: <Companies />,
      },
      {
        path: "companies/:companyId",
        element: <Companies />,
      },
      {
        path: "companies/new",
        element: <Companies />,
      },
      {
        path: "campaigns",
        element: <Campaigns />,
      },
      {
        path: "campaigns/:campaignId",
        element: <Campaigns />,
      },
      {
        path: "leads",
        element: <Leads />,
      },
      {
        path: "leads/:leadId",
        element: <Leads />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
      {
        path: "webhooks",
        element: <Webhooks />,
      },
      {
        path: "api-config",
        element: <ApiConfig />,
      },
      {
        path: "database",
        element: <DatabaseVerification />,
      },
      {
        path: "ai-bot-logic",
        element: <AiBotLogic />,
      },
      {
        path: "user-onboarding",
        element: <UserOnboarding />,
      },
      {
        path: "dashboard-modules",
        element: <DashboardModules />,
      },
      {
        path: "communication-tools",
        element: <CommunicationTools />,
      },
      {
        path: "launch-plan",
        element: <LaunchPlan />,
      },
      {
        path: "launch-check",
        element: <LaunchCheck />,
      },
      {
        path: "system",
        element: <SystemPage />,
      },
      {
        path: "*",
        element: <NotFound />,
      }
    ],
  },
];
