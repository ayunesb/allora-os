import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
export function SessionRefreshBar({ onRefreshSession }) {
    return (_jsx("div", { className: "bg-muted py-2 px-4 border-b", children: _jsx("div", { className: "container mx-auto flex justify-end", children: _jsxs(Button, { size: "sm", variant: "ghost", onClick: onRefreshSession, className: "text-xs flex items-center gap-1", children: [_jsx(RefreshCw, { className: "h-3 w-3" }), " Refresh Session"] }) }) }));
}
