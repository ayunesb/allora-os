import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wrench, Activity, Server, Database, Download, RefreshCw, } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function SystemHealthTabs({ activeTab, onTabChange, services, systemHealth, }) {
    const navigate = useNavigate();
    const handleFix = (serviceId) => {
        // In a real implementation, this would call an API to attempt to fix the service
        console.log(`Attempting to fix service: ${serviceId}`);
        // For demo purposes, let's navigate to the diagnostics page
        navigate("/admin/diagnostics", {
            state: { serviceToFix: serviceId },
        });
    };
    return (_jsxs(Tabs, { value: activeTab, onValueChange: onTabChange, className: "w-full", children: [_jsxs(TabsList, { className: "mb-4", children: [_jsx(TabsTrigger, { value: "overview", children: "Overview" }), _jsx(TabsTrigger, { value: "services", children: "Services" }), _jsx(TabsTrigger, { value: "logs", children: "System Logs" }), _jsx(TabsTrigger, { value: "performance", children: "Performance" })] }), _jsx(TabsContent, { value: "overview", className: "space-y-4", children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "System Overview" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "flex flex-col gap-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("div", { className: "text-lg", children: "Overall Health" }), _jsxs("div", { className: "text-lg font-semibold", children: [systemHealth.percentage, "%"] })] }), _jsx("div", { className: "w-full bg-muted rounded-full h-4", children: _jsx("div", { className: `h-4 rounded-full ${systemHealth.status === "healthy"
                                                ? "bg-green-500"
                                                : systemHealth.status === "degraded"
                                                    ? "bg-amber-500"
                                                    : "bg-destructive"}`, style: { width: `${systemHealth.percentage}%` } }) }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 mt-4", children: [_jsx(Card, { className: "bg-muted/40", children: _jsxs(CardContent, { className: "p-4 flex flex-col items-center gap-2", children: [_jsx(Server, { className: "h-8 w-8 text-primary" }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "font-semibold", children: "API Services" }), _jsx("div", { className: "text-sm text-muted-foreground", children: "Operational" })] })] }) }), _jsx(Card, { className: "bg-muted/40", children: _jsxs(CardContent, { className: "p-4 flex flex-col items-center gap-2", children: [_jsx(Database, { className: "h-8 w-8 text-primary" }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "font-semibold", children: "Database" }), _jsx("div", { className: "text-sm text-muted-foreground", children: "Operational" })] })] }) }), _jsx(Card, { className: "bg-muted/40", children: _jsxs(CardContent, { className: "p-4 flex flex-col items-center gap-2", children: [_jsx(Activity, { className: "h-8 w-8 text-primary" }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "font-semibold", children: "Storage" }), _jsx("div", { className: "text-sm text-muted-foreground", children: "Operational" })] })] }) })] }), _jsxs("div", { className: "flex justify-end gap-2 mt-4", children: [_jsxs(Button, { variant: "outline", size: "sm", className: "gap-2", onClick: () => window.location.reload(), children: [_jsx(RefreshCw, { className: "h-4 w-4" }), "Refresh"] }), _jsxs(Button, { variant: "outline", size: "sm", className: "gap-2", onClick: () => {
                                                    const reportData = {
                                                        timestamp: new Date().toISOString(),
                                                        health: systemHealth,
                                                        services: services,
                                                    };
                                                    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: "application/json" });
                                                    const url = URL.createObjectURL(blob);
                                                    const a = document.createElement("a");
                                                    a.href = url;
                                                    a.download = `health-report-${new Date().toISOString().split("T")[0]}.json`;
                                                    document.body.appendChild(a);
                                                    a.click();
                                                    document.body.removeChild(a);
                                                    URL.revokeObjectURL(url);
                                                }, children: [_jsx(Download, { className: "h-4 w-4" }), "Export Report"] })] })] }) })] }) }), _jsx(TabsContent, { value: "services", className: "space-y-4", children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Service Status" }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: services.map((service) => (_jsxs("div", { className: "border rounded-lg p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Server, { className: "h-5 w-5 text-primary" }), _jsx("div", { className: "font-semibold", children: service.name })] }), _jsx("div", { className: `px-2 py-1 rounded-full text-xs ${service.status === "healthy"
                                                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                                        : service.status === "degraded"
                                                            ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                                                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"}`, children: service.status })] }), _jsx("p", { className: "text-sm text-muted-foreground mb-3", children: service.description }), _jsxs("div", { className: "flex justify-between items-center text-xs text-muted-foreground", children: [_jsxs("div", { children: ["Last checked:", " ", new Date(service.lastChecked).toLocaleTimeString()] }), _jsxs("div", { children: ["Response time: ", service.responseTime || "N/A", " ms"] })] }), service.status !== "healthy" && (_jsx("div", { className: "mt-3 flex gap-2 justify-end", children: _jsxs(Button, { variant: "outline", size: "sm", className: "gap-1", onClick: () => handleFix(service.id), children: [_jsx(Wrench, { className: "h-3 w-3" }), "Fix Issue"] }) }))] }, service.id))) }) })] }) }), _jsx(TabsContent, { value: "logs", className: "space-y-4", children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "System Logs" }) }), _jsx(CardContent, { children: _jsx("p", { className: "text-muted-foreground", children: "System logs will be displayed here." }) })] }) }), _jsx(TabsContent, { value: "performance", className: "space-y-4", children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Performance Metrics" }) }), _jsx(CardContent, { children: _jsx("p", { className: "text-muted-foreground", children: "Performance metrics will be displayed here." }) })] }) })] }));
}
