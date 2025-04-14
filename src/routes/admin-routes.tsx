
import { RouteObject } from "react-router-dom";
import { Outlet } from "react-router-dom";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AuditPage from "@/pages/admin/AuditPage";
import RunAudit from "@/pages/admin/RunAudit";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminOnly from "@/components/AdminOnly";
import AdminLayout from "@/components/AdminLayout";
import AdminIndex from "@/pages/admin/Index";
import DevHelperRedirect from "@/pages/admin/DevHelperRedirect";

export const adminRoutes: RouteObject[] = [
  // Main admin layout with children routes
  {
    path: "admin/*",
    element: (
      <ProtectedRoute>
        <AdminOnly>
          <AdminLayout>
            <Outlet />
          </AdminLayout>
        </AdminOnly>
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <AdminIndex />,
      },
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "audit",
        element: <AuditPage />,
      },
      {
        path: "run-audit",
        element: <RunAudit />,
      },
      {
        path: "dev-helper",
        element: <DevHelperRedirect />,
      },
      {
        path: "users",
        element: <AdminDashboard />,  // Temporarily using AdminDashboard as placeholder
      },
      {
        path: "companies",
        element: <AdminDashboard />,  // Temporarily using AdminDashboard as placeholder
      },
      {
        path: "campaigns",
        element: <AdminDashboard />,  // Temporarily using AdminDashboard as placeholder
      },
      {
        path: "leads",
        element: <AdminDashboard />,  // Temporarily using AdminDashboard as placeholder
      },
      {
        path: "analytics",
        element: <AdminDashboard />,  // Temporarily using AdminDashboard as placeholder
      },
      {
        path: "settings",
        element: <AdminDashboard />,  // Temporarily using AdminDashboard as placeholder
      },
      {
        path: "launch-prep",
        element: <AdminDashboard />,  // Temporarily using AdminDashboard as placeholder
      },
    ],
  }
];
