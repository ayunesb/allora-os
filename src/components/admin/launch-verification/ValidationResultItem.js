import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Check, X } from "lucide-react";
export function ValidationResultItem({ id, title, result }) {
    const getStatusIcon = () => {
        if (result.valid) {
            return _jsx(Check, { className: "h-4 w-4 text-green-500" });
        }
        else {
            return _jsx(X, { className: "h-4 w-4 text-red-500" });
        }
    };
    return (_jsxs("div", { className: "flex items-start gap-4 px-4 py-3 border rounded-md bg-muted/20", children: [_jsx("div", { className: "mt-0.5", children: getStatusIcon() }), _jsxs("div", { className: "flex-1", children: [_jsx("div", { className: "font-medium", children: title }), _jsx("p", { className: "text-sm text-muted-foreground", children: result.message })] })] }));
}
