
import { RouteObject } from "react-router-dom";
import AdminRoute from "@/components/AdminRoute";
import AdminLayout from "@/components/AdminLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import UserManagement from "@/pages/admin/UserManagement";
import Companies from "@/pages/admin/Companies";
import WebhookManagement from "@/pages/admin/WebhookManagement";
import ApiKeyManagement from "@/pages/admin/ApiKeyManagement";
import DatabaseVerification from "@/pages/admin/DatabaseVerification";
import LaunchCheck from "@/pages/admin/LaunchCheck";
import LaunchPrep from "@/pages/admin/LaunchPrep";
import TechnicalImprovements from "@/pages/dashboard/TechnicalImprovements";

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
      element: <UserManagement />,
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
    }
  ],
};
