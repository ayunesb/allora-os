import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Skeleton } from "@/components/ui/skeleton";
export function CampaignLoadingState() {
    return (_jsx("div", { className: "container mx-auto px-4 py-8", children: _jsxs("div", { className: "space-y-6 animate-pulse", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4", children: [_jsxs("div", { children: [_jsx(Skeleton, { className: "h-10 w-64 mb-2" }), _jsx(Skeleton, { className: "h-5 w-80" })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Skeleton, { className: "h-10 w-32" }), _jsx(Skeleton, { className: "h-10 w-40" })] })] }), _jsx("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-4", children: Array(4)
                        .fill(0)
                        .map((_, i) => (_jsx(Skeleton, { className: "h-32 rounded-xl" }, i))) }), _jsx("div", { className: "flex gap-2 overflow-x-auto pb-2", children: Array(5)
                        .fill(0)
                        .map((_, i) => (_jsx(Skeleton, { className: "h-10 w-24 rounded-lg shrink-0" }, i))) }), _jsx("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3", children: Array(6)
                        .fill(0)
                        .map((_, i) => (_jsx(Skeleton, { className: "h-64 rounded-xl" }, i))) })] }) }));
}
