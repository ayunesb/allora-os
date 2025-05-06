import { jsx as _jsx } from "react/jsx-runtime";
import { Badge } from "@/components/ui/badge";
export default function DocumentStatusBadge({ status }) {
    switch (status) {
        case "current":
            return _jsx(Badge, { className: "bg-green-500", children: "Current" });
        case "outdated":
            return _jsx(Badge, { variant: "destructive", children: "Outdated" });
        case "update-available":
            return (_jsx(Badge, { variant: "outline", className: "border-amber-500 text-amber-500", children: "Update Available" }));
        default:
            return null;
    }
}
