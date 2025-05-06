import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Activity, XCircle } from "lucide-react";
export default function ServiceStatusList({ services, showViewAllButton = true, onViewAllClick, }) {
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
    return (_jsxs("div", { className: "space-y-4", children: [services.map((service) => (_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center", children: [getStatusIcon(service.status), _jsx("span", { className: "ml-2", children: service.name })] }), _jsx("span", { className: `text-sm px-2 py-1 rounded-full ${getStatusColorClass(service.status)}`, children: service.status })] }, service.name))), services.length > 0 && showViewAllButton && (_jsx(Button, { variant: "outline", size: "sm", className: "w-full mt-2", onClick: onViewAllClick, children: "View All Services" }))] }));
}
