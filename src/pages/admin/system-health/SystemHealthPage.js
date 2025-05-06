var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { AlertCircle, CheckCircle, Server, Database, Network, } from "lucide-react";
import SystemHealthHeader from "./SystemHealthHeader";
import SystemHealthTabs from "./SystemHealthTabs";
export default function SystemHealthPage() {
    const [activeTab, setActiveTab] = useState("overview");
    const [isLoading, setIsLoading] = useState(true);
    const [services, setServices] = useState([]);
    const [systemHealth, setSystemHealth] = useState({
        status: "healthy",
        percentage: 100,
    });
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchSystemHealth = () => __awaiter(this, void 0, void 0, function* () {
            try {
                setIsLoading(true);
                // Simulate API call to fetch system health data
                yield new Promise((resolve) => setTimeout(resolve, 1000));
                // Mock services data
                const mockServices = [
                    {
                        id: "1",
                        name: "Database",
                        description: "Supabase database connection",
                        status: "healthy",
                        lastChecked: new Date().toISOString(),
                        responseTime: 45,
                        details: "All database functions operating normally",
                    },
                    {
                        id: "2",
                        name: "Authentication",
                        description: "User authentication service",
                        status: "healthy",
                        lastChecked: new Date().toISOString(),
                        responseTime: 32,
                        details: "Authentication service functioning correctly",
                    },
                    {
                        id: "3",
                        name: "API Server",
                        description: "Backend API services",
                        status: "healthy",
                        lastChecked: new Date().toISOString(),
                        responseTime: 78,
                        details: "All API endpoints responding within expected parameters",
                    },
                    {
                        id: "4",
                        name: "Storage",
                        description: "File storage service",
                        status: "healthy",
                        lastChecked: new Date().toISOString(),
                        responseTime: 120,
                        details: "Storage buckets accessible and functioning correctly",
                    },
                    {
                        id: "5",
                        name: "Email Service",
                        description: "Email delivery service via Postmark",
                        status: "healthy",
                        lastChecked: new Date().toISOString(),
                        responseTime: 254,
                        details: "Email delivery service operational",
                    },
                ];
                setServices(mockServices);
                // Calculate overall health percentage
                const totalServices = mockServices.length;
                const healthyServices = mockServices.filter((s) => s.status === "healthy").length;
                const degradedServices = mockServices.filter((s) => s.status === "degraded").length;
                let status = "healthy";
                if (healthyServices < totalServices && healthyServices > 0) {
                    status = "degraded";
                }
                else if (healthyServices === 0) {
                    status = "down";
                }
                const healthPercentage = Math.round(((healthyServices + degradedServices * 0.5) / totalServices) * 100);
                setSystemHealth({
                    status,
                    percentage: healthPercentage,
                });
                toast.success("System health data refreshed");
            }
            catch (error) {
                console.error("Error fetching system health:", error);
                toast.error("Failed to fetch system health data");
            }
            finally {
                setIsLoading(false);
            }
        });
        fetchSystemHealth();
    }, []);
    const handleTabChange = (value) => {
        setActiveTab(value);
    };
    const getStatusBadge = (status) => {
        switch (status) {
            case "healthy":
                return (_jsxs("div", { className: "flex items-center", children: [_jsx(Badge, { variant: "outline", className: "bg-green-50 text-green-700 border-green-200", children: "Healthy" }), _jsx(CheckCircle, { className: "h-4 w-4 text-green-500 ml-2" })] }));
            case "degraded":
                return (_jsxs("div", { className: "flex items-center", children: [_jsx(Badge, { variant: "outline", className: "bg-amber-50 text-amber-700 border-amber-200", children: "Degraded" }), _jsx(AlertCircle, { className: "h-4 w-4 text-amber-500 ml-2" })] }));
            case "down":
                return (_jsxs("div", { className: "flex items-center", children: [_jsx(Badge, { variant: "outline", className: "bg-red-50 text-red-700 border-red-200", children: "Down" }), _jsx(AlertCircle, { className: "h-4 w-4 text-red-500 ml-2" })] }));
            default:
                return null;
        }
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsx(SystemHealthHeader, {}), _jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs(CardTitle, { className: "flex justify-between", children: [_jsxs("div", { className: "flex items-center", children: [_jsx(Server, { className: "mr-2 h-5 w-5 text-primary" }), "System Status"] }), getStatusBadge(systemHealth.status)] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "flex flex-col md:flex-row gap-4", children: [_jsx(Card, { className: "flex-1 bg-muted/50", children: _jsxs(CardContent, { className: "p-4 flex items-center gap-3", children: [_jsx(Database, { className: "h-8 w-8 text-primary" }), _jsxs("div", { children: [_jsx("div", { className: "text-sm font-medium", children: "Database" }), _jsx("div", { className: "text-xs text-muted-foreground", children: "Operational" })] })] }) }), _jsx(Card, { className: "flex-1 bg-muted/50", children: _jsxs(CardContent, { className: "p-4 flex items-center gap-3", children: [_jsx(Network, { className: "h-8 w-8 text-primary" }), _jsxs("div", { children: [_jsx("div", { className: "text-sm font-medium", children: "API" }), _jsx("div", { className: "text-xs text-muted-foreground", children: "Operational" })] })] }) }), _jsx(Card, { className: "flex-1 bg-muted/50", children: _jsxs(CardContent, { className: "p-4 flex items-center gap-3", children: [_jsx(Server, { className: "h-8 w-8 text-primary" }), _jsxs("div", { children: [_jsx("div", { className: "text-sm font-medium", children: "Services" }), _jsx("div", { className: "text-xs text-muted-foreground", children: "Operational" })] })] }) })] }) })] }), _jsx(SystemHealthTabs, { activeTab: activeTab, onTabChange: handleTabChange, services: services, systemHealth: systemHealth })] }));
}
