import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useBreakpoint } from "@/hooks/use-mobile";
export function AdminHeader() {
    const breakpoint = useBreakpoint();
    const isMobileView = ["xs", "mobile"].includes(breakpoint);
    return (_jsxs("div", { className: "mb-4 sm:mb-6", children: [_jsx("h1", { className: `${isMobileView ? "text-xl" : "text-2xl sm:text-3xl"} font-bold`, children: "Admin Dashboard" }), _jsx("p", { className: "text-muted-foreground mt-1 sm:mt-2 text-sm", children: "Overview of platform metrics and management tools" })] }));
}
