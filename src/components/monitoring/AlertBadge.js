import { jsx as _jsx } from "react/jsx-runtime";
import { Badge } from "@/components/ui/badge";
export const AlertBadge = ({ severity }) => {
    const getSeverityColor = (severity) => {
        switch (severity) {
            case "critical":
                return "bg-red-500 text-white";
            case "error":
                return "bg-red-400 text-white";
            case "warning":
                return "bg-amber-500 text-white";
            case "info":
            default:
                return "bg-blue-500 text-white";
        }
    };
    return _jsx(Badge, { className: getSeverityColor(severity), children: severity });
};
