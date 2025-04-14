
import { RouteObject } from "react-router-dom";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AuditPage from "@/pages/admin/AuditPage";
import RunAudit from "@/pages/admin/RunAudit";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminOnly from "@/components/AdminOnly";

export const adminRoutes: RouteObject[] = [
  {
    path: "admin",
    element: (
      <ProtectedRoute>
        <AdminOnly>
          <AdminDashboard />
        </AdminOnly>
      </ProtectedRoute>
    ),
  },
  {
    path: "admin/audit",
    element: (
      <ProtectedRoute>
        <AdminOnly>
          <AuditPage />
        </AdminOnly>
      </ProtectedRoute>
    ),
  },
  {
    path: "admin/run-audit",
    element: (
      <ProtectedRoute>
        <AdminOnly>
          <RunAudit />
        </AdminOnly>
      </ProtectedRoute>
    ),
  }
];
