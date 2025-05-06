import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Shield, Cpu, Globe, CheckCircle2, Activity, XCircle, } from "lucide-react";
export default function SystemHealthCards(props) {
    const { systemHealth, services } = props;
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
    return (_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-6", children: [_jsxs(Card, { className: `border-l-4 ${systemHealth.status === "healthy"
                    ? "border-l-green-500"
                    : systemHealth.status === "degraded"
                        ? "border-l-amber-500"
                        : "border-l-red-500"}`, children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs(CardTitle, { className: "text-lg flex items-center", children: [_jsx(Shield, { className: "h-5 w-5 mr-2" }), "System Status"] }) }), _jsxs(CardContent, { children: [_jsxs("div", { className: "flex items-center", children: [getStatusIcon(systemHealth.status), _jsx("span", { className: "ml-2 font-medium capitalize", children: systemHealth.status })] }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: systemHealth.status === "healthy"
                                    ? "All systems operational"
                                    : systemHealth.status === "degraded"
                                        ? "Some services degraded"
                                        : "Critical services down" })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs(CardTitle, { className: "text-lg flex items-center", children: [_jsx(Cpu, { className: "h-5 w-5 mr-2" }), "Service Health"] }) }), _jsxs(CardContent, { children: [_jsxs("div", { className: "flex items-center justify-between text-sm mb-1", children: [_jsxs("span", { children: [services.filter((s) => s.status === "healthy").length, " Healthy"] }), _jsxs("span", { children: [services.filter((s) => s.status !== "healthy").length, " Issues"] })] }), _jsx("div", { className: "w-full h-2 bg-gray-100 rounded-full overflow-hidden", children: _jsx("div", { className: "h-full bg-green-500", style: { width: `${systemHealth.percentage}%` } }) })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs(CardTitle, { className: "text-lg flex items-center", children: [_jsx(Globe, { className: "h-5 w-5 mr-2" }), "API Status"] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "w-3 h-3 rounded-full bg-green-500 mr-2" }), _jsx("span", { children: "Operational" })] }), _jsx("span", { className: "text-sm text-muted-foreground", children: "Avg: 87ms" })] }) })] })] }));
}
