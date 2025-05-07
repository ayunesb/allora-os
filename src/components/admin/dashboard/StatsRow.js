import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent } from "@/components/ui/card";
import { Activity } from "lucide-react";
import { useBreakpoint } from "@/hooks/use-mobile";
export function StatsRow({ stats, isLoading }) {
    const breakpoint = useBreakpoint();
    const isMobileView = ["xs", "mobile"].includes(breakpoint);
    if (isLoading)
        return null; // Loading state is handled by the parent component
    return (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4 sm:mb-6", children: stats.map((stat, i) => (_jsx(Card, { className: "border-primary/10 shadow-sm overflow-hidden", children: _jsxs(CardContent, { className: `p-3 sm:p-4 ${isMobileView ? "flex justify-between items-center" : ""}`, children: [_jsxs("div", { className: `${isMobileView ? "flex-1" : ""}`, children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: stat.name }), _jsx("h3", { className: `${isMobileView ? "text-xl" : "text-2xl"} font-bold mt-1`, children: stat.value })] }), _jsxs("span", { className: `flex items-center px-2 py-1 rounded text-xs ${stat.up ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"} ${isMobileView ? "self-end" : "mt-2"}`, children: [_jsx(Activity, { className: "h-3 w-3 mr-1" }), stat.change] })] }) }, i))) }));
}
