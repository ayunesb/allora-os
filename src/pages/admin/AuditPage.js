import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, } from "@/components/ui/card";
import { TypographyH1 } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, XCircle, AlertTriangle, Clock, PlayCircle, RefreshCw, } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
export default function AuditPage() {
    const navigate = useNavigate();
    const [lastAuditDate, setLastAuditDate] = useState("April 12, 2025 at 14:23");
    const [auditStats, setAuditStats] = useState({
        passed: 24,
        warnings: 8,
        failed: 3,
        duration: "2:18",
    });
    const [isLoading, setIsLoading] = useState(false);
    // Load last audit results from localStorage
    useEffect(() => {
        var _a, _b, _c;
        const lastAudit = localStorage.getItem("lastAuditResults");
        if (lastAudit) {
            try {
                const auditData = JSON.parse(lastAudit);
                // Update the last audit date
                if (auditData.timestamp) {
                    const date = new Date(auditData.timestamp);
                    setLastAuditDate(date.toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                    }));
                }
                // Update audit stats if results are available
                if (auditData.results) {
                    const results = auditData.results;
                    setAuditStats({
                        passed: ((_a = results.passedChecks) === null || _a === void 0 ? void 0 : _a.length) || 0,
                        warnings: ((_b = results.issues) === null || _b === void 0 ? void 0 : _b.filter((i) => i.severity === "warning").length) ||
                            0,
                        failed: ((_c = results.issues) === null || _c === void 0 ? void 0 : _c.filter((i) => i.severity === "critical").length) ||
                            0,
                        duration: "2:18", // This would be dynamic in a real implementation
                    });
                }
            }
            catch (error) {
                console.error("Error parsing last audit data:", error);
            }
        }
    }, []);
    const handleRunNewAudit = () => {
        setIsLoading(true);
        toast.info("Starting new system audit...");
        navigate("/admin/run-audit");
    };
    return (_jsxs("div", { className: "container mx-auto px-4 py-6 space-y-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4", children: [_jsx(TypographyH1, { children: "System Audit" }), _jsx(Button, { className: "w-full sm:w-auto", onClick: handleRunNewAudit, disabled: isLoading, children: isLoading ? (_jsxs(_Fragment, { children: [_jsx(RefreshCw, { className: "mr-2 h-4 w-4 animate-spin" }), "Running Audit..."] })) : (_jsxs(_Fragment, { children: [_jsx(PlayCircle, { className: "mr-2 h-4 w-4" }), "Run New Audit"] })) })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Audit Overview" }), _jsxs(CardDescription, { children: ["Last audit run: ", lastAuditDate] })] }), _jsxs(CardContent, { children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4 mb-6", children: [_jsx(Card, { className: "bg-muted/20", children: _jsxs(CardContent, { className: "p-4 flex items-center gap-4", children: [_jsx("div", { className: "bg-green-100 dark:bg-green-900/30 p-3 rounded-full", children: _jsx(CheckCircle2, { className: "h-6 w-6 text-green-600 dark:text-green-400" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium", children: "Passed" }), _jsx("p", { className: "text-2xl font-bold", children: auditStats.passed })] })] }) }), _jsx(Card, { className: "bg-muted/20", children: _jsxs(CardContent, { className: "p-4 flex items-center gap-4", children: [_jsx("div", { className: "bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-full", children: _jsx(AlertTriangle, { className: "h-6 w-6 text-yellow-600 dark:text-yellow-400" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium", children: "Warnings" }), _jsx("p", { className: "text-2xl font-bold", children: auditStats.warnings })] })] }) }), _jsx(Card, { className: "bg-muted/20", children: _jsxs(CardContent, { className: "p-4 flex items-center gap-4", children: [_jsx("div", { className: "bg-red-100 dark:bg-red-900/30 p-3 rounded-full", children: _jsx(XCircle, { className: "h-6 w-6 text-red-600 dark:text-red-400" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium", children: "Failed" }), _jsx("p", { className: "text-2xl font-bold", children: auditStats.failed })] })] }) }), _jsx(Card, { className: "bg-muted/20", children: _jsxs(CardContent, { className: "p-4 flex items-center gap-4", children: [_jsx("div", { className: "bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full", children: _jsx(Clock, { className: "h-6 w-6 text-blue-600 dark:text-blue-400" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium", children: "Duration" }), _jsx("p", { className: "text-2xl font-bold", children: auditStats.duration })] })] }) })] }), _jsxs(Tabs, { defaultValue: "all", className: "w-full", children: [_jsxs(TabsList, { className: "w-full max-w-md mb-4", children: [_jsx(TabsTrigger, { value: "all", children: "All" }), _jsx(TabsTrigger, { value: "security", children: "Security" }), _jsx(TabsTrigger, { value: "performance", children: "Performance" }), _jsx(TabsTrigger, { value: "compliance", children: "Compliance" })] }), _jsx(TabsContent, { value: "all", children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-start gap-3 p-3 border rounded-lg", children: [_jsx(CheckCircle2, { className: "h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium", children: "Authentication Security" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Authentication mechanisms are properly secured" })] })] }), _jsxs("div", { className: "flex items-start gap-3 p-3 border rounded-lg", children: [_jsx(AlertTriangle, { className: "h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium", children: "Database Query Performance" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Some queries exceed recommended execution time" })] })] }), _jsxs("div", { className: "flex items-start gap-3 p-3 border rounded-lg", children: [_jsx(XCircle, { className: "h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium", children: "GDPR Compliance" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Some user data handling doesn't meet GDPR requirements" })] })] }), _jsxs("div", { className: "flex items-start gap-3 p-3 border rounded-lg", children: [_jsx(CheckCircle2, { className: "h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium", children: "API Rate Limiting" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "API rate limiting is properly implemented" })] })] })] }) }), _jsx(TabsContent, { value: "security", children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-start gap-3 p-3 border rounded-lg", children: [_jsx(CheckCircle2, { className: "h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium", children: "Authentication Security" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Authentication mechanisms are properly secured" })] })] }), _jsxs("div", { className: "flex items-start gap-3 p-3 border rounded-lg", children: [_jsx(CheckCircle2, { className: "h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium", children: "XSS Protection" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Cross-site scripting protections are in place" })] })] })] }) }), _jsx(TabsContent, { value: "performance", children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-start gap-3 p-3 border rounded-lg", children: [_jsx(AlertTriangle, { className: "h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium", children: "Database Query Performance" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Some queries exceed recommended execution time" })] })] }), _jsxs("div", { className: "flex items-start gap-3 p-3 border rounded-lg", children: [_jsx(CheckCircle2, { className: "h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium", children: "Frontend Performance" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Frontend performance metrics are within acceptable ranges" })] })] })] }) }), _jsx(TabsContent, { value: "compliance", children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-start gap-3 p-3 border rounded-lg", children: [_jsx(XCircle, { className: "h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium", children: "GDPR Compliance" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Some user data handling doesn't meet GDPR requirements" })] })] }), _jsxs("div", { className: "flex items-start gap-3 p-3 border rounded-lg", children: [_jsx(CheckCircle2, { className: "h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium", children: "Data Encryption" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Data encryption standards are properly implemented" })] })] })] }) })] })] })] })] }));
}
