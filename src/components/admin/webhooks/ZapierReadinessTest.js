import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Check, AlertCircle } from "lucide-react";
/**
 * Component to test and display Zapier webhook readiness
 */
export default function ZapierReadinessTest({ webhookUrl, isValid }) {
    return (_jsxs("div", { className: "flex flex-col space-y-2", children: [_jsxs("div", { className: "bg-muted p-4 rounded-md", children: [_jsx("h3", { className: "text-sm font-medium mb-2", children: "Webhook Status" }), _jsx("div", { className: "flex items-center space-x-2", children: isValid ? (_jsxs(_Fragment, { children: [_jsx(Check, { className: "h-4 w-4 text-green-500" }), _jsx("p", { className: "text-sm", children: "Zapier webhook is properly configured" })] })) : (_jsxs(_Fragment, { children: [_jsx(AlertCircle, { className: "h-4 w-4 text-amber-500" }), _jsx("p", { className: "text-sm", children: "Zapier webhook needs configuration" })] })) })] }), _jsxs("div", { className: "bg-muted/50 p-4 rounded-md", children: [_jsx("h3", { className: "text-sm font-medium mb-2", children: "Webhook URL" }), _jsx("p", { className: "text-xs font-mono break-all", children: webhookUrl || "Not configured" })] })] }));
}
