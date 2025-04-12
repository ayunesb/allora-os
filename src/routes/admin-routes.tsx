
import { RouteObject } from "react-router-dom";
import AdminRoute from "@/components/AdminRoute";
import AdminLayout from "@/components/AdminLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import UserManagement from "@/pages/admin/UserManagement";
import CompanyManagement from "@/pages/admin/CompanyManagement";
import Webhooks from "@/pages/admin/Webhooks";
import APIConfiguration from "@/pages/admin/APIConfiguration";
import DatabaseVerification from "@/pages/admin/DatabaseVerification";
import LaunchCheck from "@/pages/admin/LaunchCheck";
import LaunchPrep from "@/pages/admin/LaunchPrep";

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
      element: <CompanyManagement />,
    },
    {
      path: "webhooks",
      element: <Webhooks />,
    },
    {
      path: "api-config",
      element: <APIConfiguration />,
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
    }
  ],
};
