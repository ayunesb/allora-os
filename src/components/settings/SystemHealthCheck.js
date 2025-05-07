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
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CircleCheck, CircleAlert, AlertOctagon, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { checkSystemHealth } from "@/utils/monitoring"; // Ensure this utility exists
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
export function SystemHealthCheck() {
    const [healthCheck, setHealthCheck] = useState(null);
    const [loading, setLoading] = useState(false);
    const [lastChecked, setLastChecked] = useState(null);
    useEffect(() => {
        // Run initial health check when component mounts
        runHealthCheck();
    }, []);
    const runHealthCheck = () => __awaiter(this, void 0, void 0, function* () {
        setLoading(true);
        try {
            const result = yield checkSystemHealth();
            setHealthCheck(result);
            setLastChecked(new Date());
            // Provide toast notification based on system status
            if (result.status === "unhealthy") {
                toast.error("System health issues detected. Please review.");
            }
            else if (result.status === "degraded") {
                toast.warning("Some system services are experiencing issues.");
            }
            else {
                toast.success("System is up to date and running smoothly.");
            }
        }
        catch (error) {
            console.error("Health check failed:", error);
            toast.error("Failed to perform system health check.");
        }
        finally {
            setLoading(false);
        }
    });
    const getStatusIcon = (status) => {
        switch (status) {
            case "healthy":
                return _jsx(CircleCheck, { className: "h-5 w-5 text-green-500" });
            case "degraded":
                return _jsx(CircleAlert, { className: "h-5 w-5 text-amber-500" });
            case "unhealthy":
                return _jsx(AlertOctagon, { className: "h-5 w-5 text-destructive" });
        }
    };
    const getStatusBadge = (status) => {
        switch (status) {
            case "healthy":
                return _jsx(Badge, { className: "bg-green-500", children: "Healthy" });
            case "degraded":
                return _jsx(Badge, { className: "bg-amber-500", children: "Degraded" });
            case "unhealthy":
                return _jsx(Badge, { variant: "destructive", children: "Unhealthy" });
        }
    };
    if (!healthCheck) {
        return (_jsx(Card, { children: _jsx(CardContent, { className: "flex justify-center items-center py-12", children: _jsx("div", { className: "animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full" }) }) }));
    }
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx(CardTitle, { children: "System Status" }), _jsx(Button, { variant: "outline", size: "sm", onClick: runHealthCheck, disabled: loading, children: loading ? "Checking..." : "Refresh Status" })] }), _jsx(CardDescription, { children: "Real-time monitoring of system services and overall health" })] }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [getStatusIcon(healthCheck.status), _jsx("span", { className: "font-medium", children: "Overall Status:" }), getStatusBadge(healthCheck.status)] }), _jsxs("div", { className: "text-sm text-muted-foreground flex items-center gap-1", children: [_jsx(Clock, { className: "h-4 w-4" }), _jsxs("span", { children: ["Last checked:", " ", lastChecked ? lastChecked.toLocaleTimeString() : "Never"] })] })] }), _jsx(Separator, {}), _jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "font-medium text-sm", children: "Service Status" }), _jsx("div", { className: "grid gap-2", children: Object.entries(healthCheck.services).map(([serviceName, serviceHealth]) => (_jsxs("div", { className: "flex items-center justify-between py-1", children: [_jsxs("div", { className: "flex items-center gap-2", children: [getStatusIcon(serviceHealth.status), _jsx("span", { className: "capitalize", children: serviceName })] }), getStatusBadge(serviceHealth.status)] }, serviceName))) })] })] }) })] }));
}
