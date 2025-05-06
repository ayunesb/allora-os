import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
export function CeoMessageBadges() {
    // Production-ready time display
    const currentDate = new Date();
    const formattedDate = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
    }).format(currentDate);
    return (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Badge, { variant: "outline", className: "bg-primary/10 text-primary border-primary/20", children: "Priority" }), _jsxs(Badge, { variant: "outline", className: "bg-secondary/10 text-secondary border-secondary/20", children: [_jsx(Clock, { className: "mr-1 h-3 w-3" }), " ", formattedDate] })] }));
}
