import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
export const DashboardLoadingState = () => {
    return (_jsxs("div", { className: "space-y-6", children: [_jsx("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3", children: Array.from({ length: 3 }).map((_, i) => (_jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(Skeleton, { className: "h-5 w-40" }) }), _jsx(CardContent, { children: _jsx(Skeleton, { className: "h-24 w-full" }) })] }, i))) }), _jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(Skeleton, { className: "h-5 w-64" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx(Skeleton, { className: "h-40 w-full" }), _jsx("div", { className: "flex justify-end", children: _jsx(Skeleton, { className: "h-9 w-32" }) })] })] })] }));
};
// Also export default for components that import it directly
export default DashboardLoadingState;
