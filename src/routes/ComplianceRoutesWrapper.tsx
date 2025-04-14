
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

// Lazy load compliance components
const ComplianceLayout = lazy(() => import('@/components/ComplianceLayout'));
const ComplianceOverview = lazy(() => import('@/pages/compliance/Overview'));
const AuditLogs = lazy(() => import('@/pages/compliance/AuditLogs'));
const ComplianceDataPolicies = lazy(() => import('@/pages/compliance/DataPolicies'));
const ComplianceReports = lazy(() => import('@/pages/compliance/Reports'));
const NotFound = lazy(() => import('@/pages/NotFound'));

// Loading fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="flex flex-col items-center space-y-4">
      <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="text-muted-foreground">Loading compliance section...</p>
    </div>
  </div>
);

const ComplianceRoutesWrapper = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<ComplianceLayout><Outlet /></ComplianceLayout>}>
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<ComplianceOverview />} />
          <Route path="audit-logs" element={<AuditLogs />} />
          <Route path="data-policies" element={<ComplianceDataPolicies />} />
          <Route path="reports" element={<ComplianceReports />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default ComplianceRoutesWrapper;
