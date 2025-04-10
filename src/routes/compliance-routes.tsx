
import { RouteObject } from "react-router-dom";
import ComplianceOverview from "@/pages/compliance/Index";
import ComplianceAuditLogs from "@/pages/compliance/AuditLogs";
import ComplianceDataPolicies from "@/pages/compliance/DataPolicies";
import ComplianceReports from "@/pages/compliance/Reports";
import ProtectedRoute from "@/components/ProtectedRoute";
import { ComplianceProvider } from "@/context/ComplianceContext";

// Wrap all compliance routes with the ComplianceProvider
const ComplianceWrapper = ({ children }: { children: React.ReactNode }) => (
  <ComplianceProvider>
    {children}
  </ComplianceProvider>
);

export const complianceRoutes: RouteObject[] = [
  {
    path: "/compliance",
    element: (
      <ProtectedRoute>
        <ComplianceWrapper>
          <ComplianceOverview />
        </ComplianceWrapper>
      </ProtectedRoute>
    ),
  },
  {
    path: "/compliance/audit-logs",
    element: (
      <ProtectedRoute>
        <ComplianceWrapper>
          <ComplianceAuditLogs />
        </ComplianceWrapper>
      </ProtectedRoute>
    ),
  },
  {
    path: "/compliance/data-policies",
    element: (
      <ProtectedRoute>
        <ComplianceWrapper>
          <ComplianceDataPolicies />
        </ComplianceWrapper>
      </ProtectedRoute>
    ),
  },
  {
    path: "/compliance/reports",
    element: (
      <ProtectedRoute>
        <ComplianceWrapper>
          <ComplianceReports />
        </ComplianceWrapper>
      </ProtectedRoute>
    ),
  },
];
