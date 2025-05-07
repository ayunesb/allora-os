import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Activity, Shield, Cpu, Globe, CheckCircle2, XCircle, BarChart3, RefreshCw, } from "lucide-react";
import PerformanceMetrics from "@/components/monitoring/PerformanceMetrics";
import AlertsPanel from "@/components/monitoring/AlertsPanel";
import { monitoring } from "@/utils/monitoring";
import { useToast } from "@/components/ui/use-toast";
export default function SystemHealth() {
    const [activeTab, setActiveTab] = useState("overview");
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    // Simulate fetching service health on load
    useEffect(() => {
        checkServiceHealth();
        // Set up periodic health checks
        const interval = setInterval(checkServiceHealth, 60000);
        return () => clearInterval(interval);
    }, []);
    // Simulate service health check
    const checkServiceHealth = () => {
        setLoading(true);
        // Simulate API call delay
        setTimeout(() => {
            const mockServices = [
                {
                    name: "Authentication Service",
                    status: Math.random() > 0.9 ? "degraded" : "healthy",
                    latency: Math.floor(Math.random() * 100) + 50,
                    lastChecked: new Date(),
                },
                {
                    name: "Database",
                    status: Math.random() > 0.95 ? "down" : "healthy",
                    latency: Math.floor(Math.random() * 50) + 20,
                    lastChecked: new Date(),
                },
                {
                    name: "API Gateway",
                    status: "healthy",
                    latency: Math.floor(Math.random() * 80) + 40,
                    lastChecked: new Date(),
                },
                {
                    name: "Storage Service",
                    status: Math.random() > 0.92 ? "degraded" : "healthy",
                    latency: Math.floor(Math.random() * 120) + 30,
                    lastChecked: new Date(),
                },
                {
                    name: "AI Processing",
                    status: "healthy",
                    latency: Math.floor(Math.random() * 150) + 70,
                    lastChecked: new Date(),
                },
                {
                    name: "Notification Service",
                    status: Math.random() > 0.97 ? "down" : "healthy",
                    latency: Math.floor(Math.random() * 60) + 30,
                    lastChecked: new Date(),
                },
            ];
            // Add messages for non-healthy services
            mockServices.forEach((service) => {
                if (service.status === "degraded") {
                    service.message = "High latency detected";
                    // Log warning for degraded services
                    monitoring.triggerAlert(`${service.name} Degraded`, `${service.name} is experiencing high latency (${service.latency}ms)`, "warning", { service: service.name, latency: service.latency });
                }
                else if (service.status === "down") {
                    service.message = "Service is unavailable";
                    // Log error for down services
                    monitoring.triggerAlert(`${service.name} Unavailable`, `${service.name} is currently down`, "critical", { service: service.name, time: new Date().toISOString() });
                    // Show toast for down services
                    toast({
                        title: `${service.name} Down`,
                        description: `${service.name} is currently unavailable`,
                        variant: "destructive",
                    });
                }
            });
            setServices(mockServices);
            setLoading(false);
            // Log success
            monitoring.triggerAlert("Health Check Completed", `Checked ${mockServices.length} services`, "info", {
                healthy: mockServices.filter((s) => s.status === "healthy").length,
                degraded: mockServices.filter((s) => s.status === "degraded").length,
                down: mockServices.filter((s) => s.status === "down").length,
            });
        }, 1000);
    };
    // Calculate overall system health
    const calculateSystemHealth = () => {
        if (!services.length)
            return { status: "healthy", percentage: 100 };
        const downServices = services.filter((s) => s.status === "down").length;
        const degradedServices = services.filter((s) => s.status === "degraded").length;
        if (downServices > 0) {
            // If any service is down, system is down
            const percentage = 100 - (downServices / services.length) * 100;
            return { status: "down", percentage };
        }
        else if (degradedServices > 0) {
            // If any service is degraded, system is degraded
            const percentage = 100 - (degradedServices / services.length) * 50;
            return { status: "degraded", percentage };
        }
        else {
            return { status: "healthy", percentage: 100 };
        }
    };
    const systemHealth = calculateSystemHealth();
    // Get health status icon
    const getStatusIcon = (status) => {
        switch (status) {
            case "healthy":
                return _jsx(CheckCircle2, { className: "h-5 w-5 text-green-500" });
            case "degraded":
                return _jsx(Activity, { className: "h-5 w-5 text-amber-500" });
            case "down":
                return _jsx(XCircle, { className: "h-5 w-5 text-red-500" });
            default:
                return null;
        }
    };
    // Get status color class
    const getStatusColorClass = (status) => {
        switch (status) {
            case "healthy":
                return "bg-green-50 text-green-700 border-green-200";
            case "degraded":
                return "bg-amber-50 text-amber-700 border-amber-200";
            case "down":
                return "bg-red-50 text-red-700 border-red-200";
            default:
                return "";
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(Helmet, { children: _jsx("title", { children: "System Health Dashboard | Allora AI" }) }), _jsxs("div", { className: "container mx-auto px-4 py-8", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "System Health" }), _jsx("p", { className: "text-muted-foreground", children: "Monitor system performance and service status" })] }), _jsxs(Button, { onClick: checkServiceHealth, disabled: loading, className: "flex items-center", children: [_jsx(RefreshCw, { className: `mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}` }), "Refresh"] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-6", children: [_jsxs(Card, { className: `border-l-4 ${systemHealth.status === "healthy"
                                    ? "border-l-green-500"
                                    : systemHealth.status === "degraded"
                                        ? "border-l-amber-500"
                                        : "border-l-red-500"}`, children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs(CardTitle, { className: "text-lg flex items-center", children: [_jsx(Shield, { className: "h-5 w-5 mr-2" }), "System Status"] }) }), _jsxs(CardContent, { children: [_jsxs("div", { className: "flex items-center", children: [getStatusIcon(systemHealth.status), _jsx("span", { className: "ml-2 font-medium capitalize", children: systemHealth.status })] }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: systemHealth.status === "healthy"
                                                    ? "All systems operational"
                                                    : systemHealth.status === "degraded"
                                                        ? "Some services degraded"
                                                        : "Critical services down" })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs(CardTitle, { className: "text-lg flex items-center", children: [_jsx(Cpu, { className: "h-5 w-5 mr-2" }), "Service Health"] }) }), _jsxs(CardContent, { children: [_jsxs("div", { className: "flex items-center justify-between text-sm mb-1", children: [_jsxs("span", { children: [services.filter((s) => s.status === "healthy").length, " ", "Healthy"] }), _jsxs("span", { children: [services.filter((s) => s.status !== "healthy").length, " Issues"] })] }), _jsx("div", { className: "w-full h-2 bg-gray-100 rounded-full overflow-hidden", children: _jsx("div", { className: "h-full bg-green-500", style: { width: `${systemHealth.percentage}%` } }) })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs(CardTitle, { className: "text-lg flex items-center", children: [_jsx(Globe, { className: "h-5 w-5 mr-2" }), "API Status"] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "w-3 h-3 rounded-full bg-green-500 mr-2" }), _jsx("span", { children: "Operational" })] }), _jsx("span", { className: "text-sm text-muted-foreground", children: "Avg: 87ms" })] }) })] })] }), _jsxs(Tabs, { defaultValue: "overview", value: activeTab, onValueChange: (value) => setActiveTab(value), children: [_jsxs(TabsList, { className: "grid w-full grid-cols-3 mb-6", children: [_jsx(TabsTrigger, { value: "overview", children: "Overview" }), _jsx(TabsTrigger, { value: "services", children: "Services" }), _jsx(TabsTrigger, { value: "alerts", children: "Alerts" })] }), _jsx(TabsContent, { value: "overview", className: "space-y-6", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs(Card, { className: "md:col-span-2", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center", children: [_jsx(BarChart3, { className: "h-5 w-5 mr-2" }), "Real-time Metrics"] }), _jsx(CardDescription, { children: "System performance and resource utilization" })] }), _jsx(CardContent, { children: _jsx(PerformanceMetrics, {}) })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Recent Alerts" }), _jsx(CardDescription, { children: "Latest system alerts and notifications" })] }), _jsx(CardContent, { children: _jsx(AlertsPanel, { maxAlerts: 3 }) })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Service Status" }), _jsx(CardDescription, { children: "Current status of critical services" })] }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4", children: [services.slice(0, 4).map((service) => (_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center", children: [getStatusIcon(service.status), _jsx("span", { className: "ml-2", children: service.name })] }), _jsx("span", { className: `text-sm px-2 py-1 rounded-full ${getStatusColorClass(service.status)}`, children: service.status })] }, service.name))), services.length > 4 && (_jsx(Button, { variant: "outline", size: "sm", className: "w-full mt-2", onClick: () => setActiveTab("services"), children: "View All Services" }))] }) })] })] }) }), _jsx(TabsContent, { value: "services", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Service Health" }), _jsx(CardDescription, { children: "Detailed status of all system services" })] }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: services.map((service) => (_jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsxs("div", { className: "flex items-center", children: [getStatusIcon(service.status), _jsx("span", { className: "ml-2 font-medium", children: service.name })] }), _jsx("span", { className: `text-sm px-2 py-1 rounded-full ${getStatusColorClass(service.status)}`, children: service.status })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4 bg-slate-50 p-3 rounded-md text-sm", children: [_jsxs("div", { children: [_jsx("span", { className: "text-muted-foreground", children: "Latency:" }), _jsxs("span", { className: "ml-2 font-medium", children: [service.latency, "ms"] })] }), _jsxs("div", { children: [_jsx("span", { className: "text-muted-foreground", children: "Last Checked:" }), _jsxs("span", { className: "ml-2 font-medium", children: [service.lastChecked
                                                                                    ? service.lastChecked.toLocaleTimeString()
                                                                                    : "N/A", " "] })] }), service.message && (_jsxs("div", { className: "col-span-2", children: [_jsx("span", { className: "text-muted-foreground", children: "Message:" }), _jsx("span", { className: "ml-2 font-medium", children: service.message })] }))] }), _jsx(Separator, { className: "my-4" })] }, service.name))) }) })] }) }), _jsx(TabsContent, { value: "alerts", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "System Alerts" }), _jsx(CardDescription, { children: "Real-time alerts and notifications" })] }), _jsxs(CardContent, { children: [_jsx(AlertsPanel, { maxAlerts: 10 }), _jsx("div", { className: "mt-6", children: _jsx(Button, { variant: "outline", onClick: () => {
                                                            // Generate test alerts
                                                            monitoring.triggerAlert("Test Warning Alert", "This is a test warning alert", "warning", { source: "SystemHealth", test: true });
                                                            monitoring.triggerAlert("Test Error Alert", "This is a test error alert", "error", { source: "SystemHealth", test: true });
                                                            toast({
                                                                title: "Test Alerts Generated",
                                                                description: "Created test warning and error alerts",
                                                            });
                                                        }, children: "Generate Test Alert" }) })] })] }) })] })] })] }));
}
