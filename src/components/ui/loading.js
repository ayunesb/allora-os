import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
import { Loader2, Info } from "lucide-react";
import { HelpTooltip } from "@/components/help/HelpTooltip";
/**
 * Loading component that displays a spinner and optional text
 */
export function Loading({ size = "md", text, center = false, fullHeight = false, tooltip, className, }) {
    // Map sizes to Tailwind classes
    const sizeClasses = {
        sm: "h-4 w-4",
        md: "h-8 w-8",
        lg: "h-12 w-12",
    };
    // Basic component
    const spinner = (_jsx(Loader2, { className: cn(sizeClasses[size], "animate-spin", className) }));
    // If just the spinner is needed without any positioning or text
    if (!center && !fullHeight && !text) {
        return tooltip ? (_jsx(HelpTooltip, { content: tooltip, children: spinner })) : (spinner);
    }
    return (_jsxs("div", { className: cn("flex flex-col items-center justify-center", center && "w-full", fullHeight && "min-h-[200px]", center && fullHeight && "min-h-[50vh]"), role: "status", "aria-live": "polite", children: [spinner, text && (_jsxs("div", { className: "mt-2 flex items-center", children: [_jsx("p", { className: "text-sm text-muted-foreground", children: text }), tooltip && (_jsx(HelpTooltip, { content: tooltip, children: _jsx(Info, { className: "ml-1 h-4 w-4 text-muted-foreground cursor-help" }) }))] }))] }));
}
/**
 * Skeleton loader for content that's still loading
 */
export function SkeletonLoader({ rows = 3, className, tooltip }) {
    const skeletonContent = (_jsx("div", { className: cn("space-y-2", className), children: Array(rows)
            .fill(0)
            .map((_, i) => (_jsx("div", { className: "h-4 bg-muted animate-pulse rounded", style: {
                width: `${Math.floor(Math.random() * 50) + 50}%`,
            } }, i))) }));
    return tooltip ? (_jsxs("div", { className: "relative", children: [skeletonContent, _jsx(HelpTooltip, { content: tooltip, className: "absolute top-0 right-0", children: _jsx("span", { className: "sr-only", children: "Loading information" }) })] })) : (skeletonContent);
}
/**
 * Component to use when data is still being fetched
 */
export function DataLoading({ tooltipMessage }) {
    return (_jsx("div", { className: "flex flex-col items-center justify-center py-12", role: "status", "aria-live": "polite", children: _jsx(Loading, { size: "lg", text: "Loading data...", tooltip: tooltipMessage ||
                "We're fetching the latest data for you. This should only take a moment." }) }));
}
/**
 * Component to use specifically for API calls
 */
export function APILoading({ text = "Connecting to server...", tooltipMessage, }) {
    return (_jsx("div", { className: "rounded-lg border p-8 text-center", role: "status", "aria-live": "polite", children: _jsx(Loading, { center: true, text: text, tooltip: tooltipMessage ||
                "We're establishing a secure connection to our servers. This may take a few seconds." }) }));
}
export default Loading;
