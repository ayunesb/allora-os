
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { ComplianceProvider } from "@/context/ComplianceContext";

// Lazy load all compliance pages
const ComplianceOverview = lazy(() => import("@/pages/compliance/Index"));
const ComplianceAuditLogs = lazy(() => import("@/pages/compliance/AuditLogs"));
const ComplianceDataPolicies = lazy(() => import("@/pages/compliance/DataPolicies"));
const ComplianceReports = lazy(() => import("@/pages/compliance/Reports"));
const ComplianceLayout = lazy(() => import("@/components/ComplianceLayout"));

// Loading spinner for lazy-loaded components
const ComplianceLoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[80vh]">
    <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    <span className="sr-only">Loading compliance section...</span>
  </div>
);

// Wrap all compliance routes with the ComplianceProvider
const ComplianceWrapper = ({ children }: { children: React.ReactNode }) => (
  <ComplianceProvider>
    <Suspense fallback={<ComplianceLoadingSpinner />}>
      <ComplianceLayout>
        {children}
      </ComplianceLayout>
    </Suspense>
  </ComplianceProvider>
);

// This component serves as a wrapper for all compliance routes
const ComplianceRoutesWrapper = () => {
  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <ComplianceWrapper>
              <ComplianceOverview />
            </ComplianceWrapper>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/audit-logs" 
        element={
          <ProtectedRoute>
            <ComplianceWrapper>
              <ComplianceAuditLogs />
            </ComplianceWrapper>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/data-policies" 
        element={
          <ProtectedRoute>
            <ComplianceWrapper>
              <ComplianceDataPolicies />
            </ComplianceWrapper>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/reports" 
        element={
          <ProtectedRoute>
            <ComplianceWrapper>
              <ComplianceReports />
            </ComplianceWrapper>
          </ProtectedRoute>
        } 
      />
      {/* Catch-all redirect to compliance root */}
      <Route path="*" element={<Navigate to="/compliance" replace />} />
    </Routes>
  );
};

export default ComplianceRoutesWrapper;
