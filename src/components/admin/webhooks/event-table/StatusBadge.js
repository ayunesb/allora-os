import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Clock } from "lucide-react";
export const StatusBadge = ({ status }) => {
    switch (status) {
        case "success":
            return (_jsxs(Badge, { variant: "outline", className: "bg-green-500/10 text-green-500 border-green-500/20 flex items-center gap-1", children: [_jsx(CheckCircle, { className: "h-3 w-3" }), "Success"] }));
        case "failed":
            return (_jsxs(Badge, { variant: "outline", className: "bg-destructive/10 text-destructive border-destructive/20 flex items-center gap-1", children: [_jsx(AlertCircle, { className: "h-3 w-3" }), "Failed"] }));
        case "pending":
            return (_jsxs(Badge, { variant: "outline", className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20 flex items-center gap-1", children: [_jsx(Clock, { className: "h-3 w-3" }), "Pending"] }));
        default:
            return _jsx(Badge, { variant: "outline", children: status });
    }
};
export default StatusBadge;
