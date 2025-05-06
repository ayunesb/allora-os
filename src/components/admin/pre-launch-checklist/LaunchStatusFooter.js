import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
export function LaunchStatusFooter({ allItemsCompleted, criticalItemsCompleted, }) {
    return (_jsx("div", { className: "pt-4 border-t border-border", children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { children: [_jsx("div", { className: "text-lg font-medium", children: "Launch Status" }), _jsx("div", { className: "text-sm text-muted-foreground", children: allItemsCompleted
                                ? "All items completed! You're ready to launch."
                                : criticalItemsCompleted
                                    ? "All critical items completed. Ready for launch, but consider completing remaining items."
                                    : "Complete all critical items before launching." })] }), _jsxs(Button, { className: "gap-2", disabled: !criticalItemsCompleted, children: [_jsx(ExternalLink, { className: "h-4 w-4" }), criticalItemsCompleted
                            ? "Launch Project"
                            : "Complete Critical Items"] })] }) }));
}
