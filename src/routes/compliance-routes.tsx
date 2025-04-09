
import { RouteObject } from "react-router-dom";
import ComplianceLayout from "@/components/ComplianceLayout";
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
        <ComplianceLayout>
          <ComplianceOverview />
        </ComplianceLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/compliance/audit-logs",
    element: (
      <ProtectedRoute>
        <ComplianceLayout>
          <ComplianceAuditLogs />
        </ComplianceLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/compliance/data-policies",
    element: (
      <ProtectedRoute>
        <ComplianceLayout>
          <ComplianceDataPolicies />
        </ComplianceLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/compliance/reports",
    element: (
      <ProtectedRoute>
        <ComplianceLayout>
          <ComplianceReports />
        </ComplianceLayout>
      </ProtectedRoute>
    ),
  },
];
