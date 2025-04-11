
import { RouteObject } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminRoute from "@/components/AdminRoute";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import UserManagement from "@/pages/admin/UserManagement";
import ApiKeyManagement from "@/pages/admin/ApiKeyManagement";
import WebhookManagement from "@/pages/admin/WebhookManagement";
import CompanySettings from "@/pages/admin/CompanySettings";
import LaunchPlan from "@/pages/admin/LaunchPlan";
import DatabaseVerification from "@/pages/admin/DatabaseVerification";

export const adminRoutes: RouteObject = {
  path: "",
  children: [
    {
      path: "/admin",
      element: (
        <ProtectedRoute>
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/users",
      element: (
        <ProtectedRoute>
          <AdminRoute>
            <UserManagement />
          </AdminRoute>
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/api-keys",
      element: (
        <ProtectedRoute>
          <AdminRoute>
            <ApiKeyManagement />
          </AdminRoute>
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/webhooks",
      element: (
        <ProtectedRoute>
          <AdminRoute>
            <WebhookManagement />
          </AdminRoute>
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/company",
      element: (
        <ProtectedRoute>
          <AdminRoute>
            <CompanySettings />
          </AdminRoute>
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/launch-plan",
      element: (
        <ProtectedRoute>
          <AdminRoute>
            <LaunchPlan />
          </AdminRoute>
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/database-verification",
      element: (
        <ProtectedRoute>
          <AdminRoute>
            <DatabaseVerification />
          </AdminRoute>
        </ProtectedRoute>
      ),
    },
  ],
};
