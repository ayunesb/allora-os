
import { RouteObject } from "react-router-dom";
import ComplianceOverview from "@/pages/compliance/Index";
import ComplianceAuditLogs from "@/pages/compliance/AuditLogs";
import ComplianceDataPolicies from "@/pages/compliance/DataPolicies";
import ComplianceReports from "@/pages/compliance/Reports";
import ProtectedRoute from "@/components/ProtectedRoute";

export const complianceRoutes: RouteObject[] = [
  {
    path: "/compliance",
    element: (
      <ProtectedRoute>
        <ComplianceOverview />
      </ProtectedRoute>
    ),
  },
  {
    path: "/compliance/audit-logs",
    element: (
      <ProtectedRoute>
        <ComplianceAuditLogs />
      </ProtectedRoute>
    ),
  },
  {
    path: "/compliance/data-policies",
    element: (
      <ProtectedRoute>
        <ComplianceDataPolicies />
      </ProtectedRoute>
    ),
  },
  {
    path: "/compliance/reports",
    element: (
      <ProtectedRoute>
        <ComplianceReports />
      </ProtectedRoute>
    ),
  },
];
