import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Suspense, lazy } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
// Lazy load compliance components
const ComplianceLayout = lazy(() => import("@/components/ComplianceLayout"));
const ComplianceOverview = lazy(() => import("@/pages/compliance/Overview"));
const AuditLogs = lazy(() => import("@/pages/compliance/AuditLogs"));
const ComplianceDataPolicies = lazy(() => import("@/pages/compliance/DataPolicies"));
const ComplianceReports = lazy(() => import("@/pages/compliance/Reports"));
const NotFound = lazy(() => import("@/pages/NotFound"));
// Loading fallback
const LoadingFallback = () => (_jsx("div", { className: "flex items-center justify-center min-h-screen", children: _jsxs("div", { className: "flex flex-col items-center space-y-4", children: [_jsx("div", { className: "h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" }), _jsx("p", { className: "text-muted-foreground", children: "Loading compliance section..." })] }) }));
const ComplianceRoutesWrapper = () => {
    return (_jsx(Suspense, { fallback: _jsx(LoadingFallback, {}), children: _jsx(Routes, { children: _jsxs(Route, { path: "/", element: _jsx(ComplianceLayout, { children: _jsx(Outlet, {}) }), children: [_jsx(Route, { index: true, element: _jsx(Navigate, { to: "overview", replace: true }) }), _jsx(Route, { path: "overview", element: _jsx(ComplianceOverview, {}) }), _jsx(Route, { path: "audit-logs", element: _jsx(AuditLogs, {}) }), _jsx(Route, { path: "data-policies", element: _jsx(ComplianceDataPolicies, {}) }), _jsx(Route, { path: "reports", element: _jsx(ComplianceReports, {}) }), _jsx(Route, { path: "*", element: _jsx(NotFound, {}) })] }) }) }));
};
export default ComplianceRoutesWrapper;
