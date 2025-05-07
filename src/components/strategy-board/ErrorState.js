import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function ErrorState({ error, onRetry }) {
    return (_jsxs("div", { className: "flex flex-col items-center justify-center p-8 border border-red-900/30 bg-red-900/10 rounded-lg animate-fadeIn text-center", children: [_jsx("div", { className: "bg-red-900/20 p-4 rounded-full mb-6", children: _jsx(AlertCircle, { className: "h-10 w-10 text-red-400" }) }), _jsx("h3", { className: "text-2xl font-bold mb-3 text-white", children: "Oops! Couldn't load your strategies" }), _jsx("p", { className: "text-gray-300 text-center mb-8 max-w-md", children: (error === null || error === void 0 ? void 0 : error.message) ||
                    "Something went wrong while loading your strategies. Please try again." }), _jsxs(Button, { onClick: onRetry, variant: "outline", className: "border-red-700 bg-red-900/20 hover:bg-red-800/30 text-white retry-button", children: [_jsx(RefreshCw, { className: "mr-2 h-4 w-4 animate-spin-once" }), "Refresh and try again"] })] }));
}
