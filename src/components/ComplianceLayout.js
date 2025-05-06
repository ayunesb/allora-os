import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Navbar from "@/components/Navbar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useLocation } from "react-router-dom";
import { Shield, AlertCircle } from "lucide-react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
// Import a properly defined DashboardBreadcrumb
import { DashboardBreadcrumb } from "@/components/ui/dashboard-breadcrumb";
export default function ComplianceLayout({ children }) {
    const location = useLocation();
    const currentPath = location.pathname;
    return (_jsxs("div", { className: "min-h-screen flex flex-col", children: [_jsx(Navbar, {}), _jsx("div", { className: "flex-1 container mx-auto px-4 py-16", children: _jsxs(ErrorBoundary, { fallback: _jsxs("div", { className: "text-center py-8", children: [_jsx(AlertCircle, { className: "h-12 w-12 text-destructive mx-auto mb-4" }), _jsx("h2", { className: "text-2xl font-bold mb-2", children: "Something went wrong" }), _jsx("p", { className: "text-muted-foreground mb-4", children: "There was an error loading this compliance section" }), _jsx(Link, { to: "/dashboard", className: "text-primary hover:underline", children: "Return to Dashboard" })] }), children: [_jsx(DashboardBreadcrumb, { rootPath: "/compliance", rootLabel: "Compliance", rootIcon: _jsx(Shield, { className: "h-3.5 w-3.5" }) }), _jsxs("div", { className: "mb-8", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx(Shield, { className: "h-6 w-6 text-primary" }), _jsx("h1", { className: "text-3xl font-bold", children: "Compliance Center" })] }), _jsx("p", { className: "text-muted-foreground", children: "Manage regulatory compliance, data handling, and audit records" })] }), _jsx(Tabs, { value: currentPath, className: "mb-8", children: _jsxs(TabsList, { children: [_jsx(TabsTrigger, { value: "/compliance/overview", asChild: true, children: _jsx(Link, { to: "/compliance/overview", children: "Overview" }) }), _jsx(TabsTrigger, { value: "/compliance/data-policies", asChild: true, children: _jsx(Link, { to: "/compliance/data-policies", children: "Data Policies" }) }), _jsx(TabsTrigger, { value: "/compliance/audit-logs", asChild: true, children: _jsx(Link, { to: "/compliance/audit-logs", children: "Audit Logs" }) }), _jsx(TabsTrigger, { value: "/compliance/reports", asChild: true, children: _jsx(Link, { to: "/compliance/reports", children: "Compliance Reports" }) })] }) }), _jsx("div", { children: children })] }) })] }));
}
