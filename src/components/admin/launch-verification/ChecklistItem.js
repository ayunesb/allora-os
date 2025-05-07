import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CheckCircle, AlertTriangle, XCircle, Clock, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip";
export function ChecklistItem({ item }) {
    // Determine status icon and color
    const renderStatusIcon = () => {
        switch (item.status) {
            case "completed":
                return _jsx(CheckCircle, { className: "h-5 w-5 text-green-600" });
            case "warning":
                return _jsx(AlertTriangle, { className: "h-5 w-5 text-yellow-600" });
            case "error":
                return _jsx(XCircle, { className: "h-5 w-5 text-red-600" });
            case "in-progress":
                return _jsx(Clock, { className: "h-5 w-5 text-blue-600" });
            case "pending":
            default:
                return _jsx(Clock, { className: "h-5 w-5 text-gray-400" });
        }
    };
    const getStatusText = () => {
        switch (item.status) {
            case "completed":
                return "Completed";
            case "warning":
                return "Warning";
            case "error":
                return "Error";
            case "in-progress":
                return "In Progress";
            case "pending":
            default:
                return "Pending";
        }
    };
    return (_jsxs("div", { className: "p-3 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [renderStatusIcon(), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "font-medium", children: item.name }), item.isRequired && (_jsx("span", { className: "text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded", children: "Required" }))] }), item.description && (_jsx("p", { className: "text-sm text-muted-foreground", children: item.description })), item.statusMessage && (_jsx("p", { className: `text-sm mt-1 ${item.status === "warning"
                                    ? "text-yellow-600"
                                    : item.status === "error"
                                        ? "text-red-600"
                                        : "text-muted-foreground"}`, children: item.statusMessage }))] })] }), item.details && (_jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsx("button", { className: "p-1.5 rounded-full hover:bg-secondary", "aria-label": "View details", children: _jsx(Info, { className: "h-4 w-4 text-muted-foreground" }) }) }), _jsx(TooltipContent, { children: _jsx("p", { className: "max-w-xs", children: item.details }) })] }) }))] }));
}
