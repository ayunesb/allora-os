
import { RouteObject } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import AdminIndex from "@/pages/admin/Index";
import AdminUsers from "@/pages/admin/Users";
import AdminCompanies from "@/pages/admin/Companies";
import AdminCampaigns from "@/pages/admin/Campaigns";
import AdminLeads from "@/pages/admin/Leads";
import AdminAnalytics from "@/pages/admin/Analytics";
import AdminSettings from "@/pages/admin/Settings";
import LaunchPrep from "@/pages/admin/LaunchPrep";
import ProtectedRoute from "@/components/ProtectedRoute";

export const adminRoutes: RouteObject = {
  path: "/admin",
  element: (
    <ProtectedRoute roleRequired="admin">
      <AdminLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      index: true,
      element: <AdminIndex />,
    },
    {
      path: "users",
      element: <AdminUsers />,
    },
    {
      path: "companies",
      element: <AdminCompanies />,
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
      path: "analytics",
      element: <AdminAnalytics />,
    },
    {
      path: "settings",
      element: <AdminSettings />,
    },
    {
      path: "launch-prep",
      element: <LaunchPrep />,
    },
  ],
};
