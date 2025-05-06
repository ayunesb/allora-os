import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AlertCircle, CheckCircle, Shield, Database, Zap } from "lucide-react";
export function DatabaseChecksSection({ title, items }) {
    // If items is null, undefined, or not an array, render nothing
    if (!items || !Array.isArray(items) || items.length === 0) {
        return null;
    }
    // Choose the appropriate icon based on the title
    const getIcon = () => {
        if (title.includes("RLS") || title.includes("Security")) {
            return _jsx(Shield, { className: "h-3.5 w-3.5 text-blue-400" });
        }
        else if (title.includes("Index") || title.includes("Performance")) {
            return _jsx(Zap, { className: "h-3.5 w-3.5 text-amber-400" });
        }
        else if (title.includes("Function")) {
            return _jsx(Database, { className: "h-3.5 w-3.5 text-blue-400" });
        }
        return null;
    };
    return (_jsxs("div", { className: "mt-4", children: [_jsx("h3", { className: "text-sm font-medium mb-2 text-white", children: title }), _jsx("div", { className: "space-y-2", children: items.map((item, index) => (_jsxs("div", { className: "bg-[#1E293B]/80 rounded-md border border-white/10 p-3 text-sm", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { className: "font-medium text-white flex items-center gap-1.5", children: [getIcon(), item.name || item.table || `Item ${index + 1}`] }), _jsxs("div", { className: "flex items-center gap-1", children: [item.status === "verified" || item.status === "ready" ? (_jsx(CheckCircle, { className: "h-4 w-4 text-green-500" })) : (_jsx(AlertCircle, { className: "h-4 w-4 text-amber-500" })), _jsx("span", { className: "text-xs capitalize text-gray-300", children: item.status })] })] }), item.message && (_jsx("div", { className: "text-xs text-gray-400 mt-1", children: item.message }))] }, index))) })] }));
}
