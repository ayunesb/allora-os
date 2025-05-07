import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CheckCircle, XCircle, Database, Lock } from "lucide-react";
export function DatabaseTablesSection({ tables }) {
    if (!tables)
        return null;
    return (_jsxs("div", { className: "p-3 rounded-md bg-[#1E293B]/80 border border-white/10", children: [_jsxs("h3", { className: "font-medium mb-2 text-white flex items-center gap-1.5", children: [_jsx(Database, { className: "h-4 w-4 text-blue-400" }), "Database Tables Check"] }), _jsx("div", { className: "space-y-1.5", children: Object.entries(tables).map(([table, result]) => (_jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsxs("span", { className: "font-medium text-gray-300 flex items-center gap-1", children: [table, result.exists && result.rls && (_jsx(Lock, { className: "h-3 w-3 text-green-400" }))] }), _jsxs("div", { className: "flex items-center gap-1", children: [result.exists ? (_jsx(CheckCircle, { className: "h-3.5 w-3.5 text-green-500" })) : (_jsx(XCircle, { className: "h-3.5 w-3.5 text-red-500" })), _jsx("span", { className: `px-2 py-0.5 rounded-full text-xs ${result.exists ? "bg-green-900/50 text-green-300" : "bg-red-900/50 text-red-300"}`, children: result.exists ? "Exists" : "Missing" })] })] }, table))) })] }));
}
