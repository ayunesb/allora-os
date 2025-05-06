import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { LogOut, RefreshCw } from "lucide-react";
export function AuthIssue({ onSignOut, onRefresh }) {
    return (_jsx("div", { className: "min-h-screen bg-background flex flex-col items-center justify-center p-4", children: _jsxs("div", { className: "bg-card border rounded-lg shadow-lg p-6 max-w-md w-full", children: [_jsx("h2", { className: "text-xl font-semibold mb-4", children: "Authentication Issue" }), _jsx("p", { className: "text-muted-foreground mb-6", children: "There was a problem loading your account information. This might be due to a temporary connection issue." }), _jsxs("div", { className: "flex gap-4 justify-end", children: [_jsxs(Button, { variant: "outline", onClick: onSignOut, children: [_jsx(LogOut, { className: "mr-2 h-4 w-4" }), "Sign out"] }), _jsxs(Button, { onClick: onRefresh, children: [_jsx(RefreshCw, { className: "mr-2 h-4 w-4" }), "Refresh page"] })] })] }) }));
}
