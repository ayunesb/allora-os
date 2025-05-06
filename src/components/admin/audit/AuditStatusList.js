import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CheckCircle2, XCircle, AlertCircle, RefreshCw } from "lucide-react";
export function AuditStatusList({ items }) {
    const getStatusIcon = (status, size = "sm") => {
        const className = size === "lg" ? "h-6 w-6" : "h-4 w-4";
        switch (status) {
            case "passed":
                return _jsx(CheckCircle2, { className: `${className} text-green-500` });
            case "failed":
                return _jsx(XCircle, { className: `${className} text-red-500` });
            case "in-progress":
                return (_jsx(RefreshCw, { className: `${className} animate-spin text-blue-500` }));
            default:
                return _jsx(AlertCircle, { className: `${className} text-muted-foreground` });
        }
    };
    return (_jsx("div", { className: "grid grid-cols-1 gap-2 mb-6", children: items.map((item) => (_jsxs("div", { className: "flex justify-between items-center p-3 border rounded-md", children: [_jsxs("div", { className: "flex items-center gap-2", children: [getStatusIcon(item.status), _jsx("span", { className: "font-medium", children: item.label })] }), _jsx("div", { className: "text-sm text-muted-foreground", children: item.status === "passed"
                        ? item.passedMessage
                        : item.status === "failed"
                            ? item.failedMessage
                            : item.status === "in-progress"
                                ? "Checking..."
                                : item.pendingMessage })] }, item.id))) }));
}
