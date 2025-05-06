import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Progress } from "@/components/ui/progress";
import { CheckCircle } from "lucide-react";
export function LaunchProgress({ totalItems, completedItems, status, isComplete, launchStep, }) {
    return (_jsx("div", { className: "animate-in fade-in space-y-4 bg-primary-foreground border border-border/70 rounded-lg p-4", children: isComplete ? (_jsxs("div", { className: "flex items-center gap-2 text-green-600", children: [_jsx(CheckCircle, { className: "h-5 w-5" }), _jsx("span", { className: "font-medium", children: "Launch completed successfully!" })] })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "text-sm font-medium", children: "Launching Allora AI..." }), _jsx(Progress, { value: undefined, className: "h-2" }), launchStep && (_jsx("div", { className: "text-sm text-muted-foreground", children: launchStep }))] })) }));
}
