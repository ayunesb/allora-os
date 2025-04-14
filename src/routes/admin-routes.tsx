
import { RouteObject } from "react-router-dom";
import { Outlet, Navigate } from "react-router-dom";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import EntitiesPage from "@/pages/admin/EntitiesPage";
import AuditPage from "@/pages/admin/AuditPage";
import RunAudit from "@/pages/admin/RunAudit";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminOnly from "@/components/AdminOnly";
import AdminLayout from "@/components/AdminLayout";
import AdminIndex from "@/pages/admin/Index";
import DevHelperRedirect from "@/pages/admin/DevHelperRedirect";
import SystemHealth from "@/pages/admin/SystemHealth";
import TechnicalImprovementsPage from "@/pages/admin/TechnicalImprovementsPage";

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
        element: <Navigate to="/admin" replace />,
      },
      {
        path: "entities",
        element: <EntitiesPage />,
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
        path: "technical-improvements",
        element: <TechnicalImprovementsPage />,
      },
      {
        path: "system-health",
        element: <SystemHealth />,
      },
      {
        path: "users",
        element: <Navigate to="/admin/entities?tab=users" replace />,
      },
      {
        path: "companies",
        element: <Navigate to="/admin/entities?tab=companies" replace />,
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
