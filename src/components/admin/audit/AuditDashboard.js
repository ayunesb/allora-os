import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import PreLaunchAudit from "./PreLaunchAudit";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, CheckCircle2, Database, Shield, FileText, } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
export default function AuditDashboard() {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const [lastAuditTimestamp, setLastAuditTimestamp] = useState(null);
    const [auditResults, setAuditResults] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        // Try to get the last audit timestamp and results from localStorage
        const lastAuditResultsStr = localStorage.getItem("lastAuditResults");
        if (lastAuditResultsStr) {
            try {
                const parsedResults = JSON.parse(lastAuditResultsStr);
                setLastAuditTimestamp(parsedResults.timestamp);
                setAuditResults(parsedResults.results);
            }
            catch (error) {
                console.error("Error parsing audit results:", error);
            }
        }
    }, []);
    // Get critical issues from the audit results
    const criticalIssues = ((_a = auditResults === null || auditResults === void 0 ? void 0 : auditResults.issues) === null || _a === void 0 ? void 0 : _a.filter((issue) => issue.severity === "critical")) ||
        [];
    const warningIssues = ((_b = auditResults === null || auditResults === void 0 ? void 0 : auditResults.issues) === null || _b === void 0 ? void 0 : _b.filter((issue) => issue.severity === "warning")) || [];
    const runNewAudit = () => {
        navigate("/admin/run-audit");
    };
    return (_jsxs("div", { className: "container py-6 max-w-7xl mx-auto animate-in fade-in duration-500 space-y-6", children: [lastAuditTimestamp && (_jsxs(Alert, { variant: criticalIssues.length > 0 ? "destructive" : "default", className: criticalIssues.length > 0
                    ? "bg-red-50 dark:bg-red-900/20"
                    : "bg-muted/50", children: [_jsxs("div", { className: "flex items-center gap-2", children: [criticalIssues.length > 0 ? (_jsx(AlertTriangle, { className: "h-4 w-4" })) : (_jsx(CheckCircle2, { className: "h-4 w-4 text-green-500" })), _jsx(AlertTitle, { children: criticalIssues.length > 0
                                    ? `${criticalIssues.length} Critical Issues Found`
                                    : "System Status: Ready" })] }), _jsxs(AlertDescription, { className: "mt-2", children: [_jsxs("div", { children: ["Last audit performed:", " ", new Date(lastAuditTimestamp).toLocaleString()] }), criticalIssues.length > 0 && (_jsxs("div", { className: "mt-2 space-y-1", children: [_jsx("div", { className: "font-medium", children: "Critical issues that need attention:" }), _jsx("ul", { className: "list-disc list-inside", children: criticalIssues.map((issue, idx) => (_jsxs("li", { className: "text-sm", children: [issue.name, ": ", issue.message] }, idx))) })] })), _jsx("div", { className: "mt-4", children: _jsx(Button, { onClick: runNewAudit, size: "sm", variant: "outline", children: "Run New Audit" }) })] })] })), _jsx(PreLaunchAudit, {}), auditResults &&
                auditResults.issues &&
                auditResults.issues.length > 0 && (_jsxs(Card, { className: "mt-6", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(AlertTriangle, { className: "h-5 w-5 text-amber-500" }), "Detected Issues"] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-6", children: [criticalIssues.length > 0 && (_jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-lg font-medium text-red-600 dark:text-red-400", children: "Critical Issues" }), criticalIssues.map((issue, idx) => (_jsxs("div", { className: "p-4 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(AlertTriangle, { className: "h-5 w-5 text-red-500" }), _jsx("div", { className: "font-medium", children: issue.name }), _jsx("div", { className: "ml-auto text-xs px-2 py-1 rounded-full uppercase font-bold tracking-wider bg-black/10 dark:bg-white/10", children: issue.severity })] }), _jsx("div", { className: "mt-2 text-sm", children: issue.message }), issue.details && (_jsxs("div", { className: "mt-2 text-xs bg-red-100 dark:bg-red-800/30 p-2 rounded", children: [_jsx("div", { className: "font-medium mb-1", children: "Details:" }), _jsx("div", { className: "whitespace-pre-wrap font-mono", children: typeof issue.details === "object"
                                                                ? JSON.stringify(issue.details, null, 2)
                                                                : issue.details })] }))] }, idx)))] })), warningIssues.length > 0 && (_jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-lg font-medium text-amber-600 dark:text-amber-400", children: "Warnings" }), warningIssues.map((issue, idx) => (_jsxs("div", { className: "p-4 rounded-md bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(AlertTriangle, { className: "h-5 w-5 text-amber-500" }), _jsx("div", { className: "font-medium", children: issue.name }), _jsx("div", { className: "ml-auto text-xs px-2 py-1 rounded-full uppercase font-bold tracking-wider bg-black/10 dark:bg-white/10", children: issue.severity })] }), _jsx("div", { className: "mt-2 text-sm", children: issue.message })] }, idx)))] }))] }) })] })), auditResults && (_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mt-6", children: [_jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs(CardTitle, { className: "flex items-center gap-2 text-base", children: [_jsx(Database, { className: "h-4 w-4 text-primary/80" }), "Database Performance"] }) }), _jsx(CardContent, { children: _jsx("div", { className: "text-sm", children: ((_d = (_c = auditResults.checks) === null || _c === void 0 ? void 0 : _c.performance) === null || _d === void 0 ? void 0 : _d.valid) ? (_jsxs("div", { className: "flex items-center gap-2 text-green-600", children: [_jsx(CheckCircle2, { className: "h-4 w-4" }), "Queries execute within recommended time"] })) : (_jsxs("div", { className: "flex items-center gap-2 text-amber-600", children: [_jsx(AlertTriangle, { className: "h-4 w-4" }), "Some queries exceed recommended execution time"] })) }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs(CardTitle, { className: "flex items-center gap-2 text-base", children: [_jsx(Shield, { className: "h-4 w-4 text-primary/80" }), "Security Status"] }) }), _jsx(CardContent, { children: _jsx("div", { className: "text-sm", children: ((_f = (_e = auditResults.checks) === null || _e === void 0 ? void 0 : _e.security) === null || _f === void 0 ? void 0 : _f.valid) ? (_jsxs("div", { className: "flex items-center gap-2 text-green-600", children: [_jsx(CheckCircle2, { className: "h-4 w-4" }), "Authentication mechanisms are properly secured"] })) : (_jsxs("div", { className: "flex items-center gap-2 text-red-600", children: [_jsx(AlertTriangle, { className: "h-4 w-4" }), "Security vulnerabilities detected"] })) }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs(CardTitle, { className: "flex items-center gap-2 text-base", children: [_jsx(FileText, { className: "h-4 w-4 text-primary/80" }), "GDPR Compliance"] }) }), _jsx(CardContent, { children: _jsx("div", { className: "text-sm", children: ((_h = (_g = auditResults.checks) === null || _g === void 0 ? void 0 : _g.gdpr) === null || _h === void 0 ? void 0 : _h.valid) ? (_jsxs("div", { className: "flex items-center gap-2 text-green-600", children: [_jsx(CheckCircle2, { className: "h-4 w-4" }), "User data handling meets GDPR requirements"] })) : (_jsxs("div", { className: "flex items-center gap-2 text-red-600", children: [_jsx(AlertTriangle, { className: "h-4 w-4" }), "Some user data handling doesn't meet GDPR requirements"] })) }) })] })] }))] }));
}
