import { jsx as _jsx } from "react/jsx-runtime";
import { AlertCircle, AlertTriangle, Info, AlertCircle as AlertIcon, } from "lucide-react";
export const AlertStatusIcon = ({ severity }) => {
    switch (severity) {
        case "critical":
            return _jsx(AlertIcon, { className: "h-5 w-5 text-red-600" });
        case "error":
            return _jsx(AlertCircle, { className: "h-5 w-5 text-red-500" });
        case "warning":
            return _jsx(AlertTriangle, { className: "h-5 w-5 text-amber-500" });
        case "info":
        default:
            return _jsx(Info, { className: "h-5 w-5 text-blue-500" });
    }
};
