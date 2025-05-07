import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Skeleton } from "@/components/ui/skeleton";
import { useBreakpoint } from "@/hooks/use-mobile";
export default function LoadingState() {
    const breakpoint = useBreakpoint();
    // Determine number of skeleton cards to show based on breakpoint
    const getCardCount = () => {
        switch (breakpoint) {
            case "xs":
            case "mobile":
                return 2;
            case "tablet":
                return 4;
            default:
                return 6;
        }
    };
    // Determine grid columns based on breakpoint
    const getGridClass = () => {
        switch (breakpoint) {
            case "xs":
            case "mobile":
                return "grid-cols-1";
            case "tablet":
                return "grid-cols-2";
            default:
                return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
        }
    };
    return (_jsx("div", { className: `grid ${getGridClass()} gap-4 sm:gap-6`, children: Array.from({ length: getCardCount() }).map((_, index) => (_jsxs("div", { className: "border border-white/10 bg-black/40 backdrop-blur-md rounded-lg p-4 sm:p-6 space-y-4", children: [_jsxs("div", { className: "flex flex-wrap justify-between gap-2", children: [_jsx(Skeleton, { className: "h-6 w-20" }), _jsx(Skeleton, { className: "h-6 w-24" })] }), _jsx(Skeleton, { className: "h-7 w-4/5" }), _jsx(Skeleton, { className: "h-4 w-1/3" }), _jsx(Skeleton, { className: "h-16 w-full" }), _jsx(Skeleton, { className: "h-2 w-full" }), _jsxs("div", { className: "flex justify-between pt-2", children: [_jsx(Skeleton, { className: "h-4 w-24" }), _jsx(Skeleton, { className: "h-4 w-20" })] }), _jsxs("div", { className: "flex gap-2 pt-2", children: [_jsx(Skeleton, { className: "h-9 flex-1" }), _jsx(Skeleton, { className: "h-9 w-9" }), _jsx(Skeleton, { className: "h-9 w-9" })] })] }, index))) }));
}
