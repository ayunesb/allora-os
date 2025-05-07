import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AlertStatusIcon } from "./AlertIcon";
import { AlertBadge } from "./AlertBadge";
export const AlertItem = ({ alert, onAcknowledge }) => {
    return (_jsxs("div", { className: `rounded-md p-3 border ${alert.acknowledged
            ? "bg-gray-50 border-gray-200"
            : `bg-${alert.severity === "critical" ? "red" : "amber"}-50 border-${alert.severity === "critical" ? "red" : "amber"}-200`}`, children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { className: "flex items-start gap-2", children: [_jsx(AlertStatusIcon, { severity: alert.severity }), _jsxs("div", { children: [_jsx("h4", { className: `font-medium ${alert.acknowledged ? "text-gray-700" : "text-gray-900"}`, children: alert.title }), _jsx("p", { className: `text-sm mt-0.5 ${alert.acknowledged ? "text-gray-500" : "text-gray-700"}`, children: alert.message })] })] }), _jsx(AlertBadge, { severity: alert.severity })] }), _jsxs("div", { className: "mt-2 flex justify-between items-center text-xs text-gray-500", children: [_jsx("span", { children: new Date(alert.timestamp).toLocaleTimeString() }), !alert.acknowledged && (_jsxs(Button, { variant: "ghost", size: "sm", className: "h-6 text-xs", onClick: () => onAcknowledge(alert.id), children: [_jsx(CheckCircle2, { className: "h-3 w-3 mr-1" }), "Acknowledge"] }))] })] }, alert.id));
};
