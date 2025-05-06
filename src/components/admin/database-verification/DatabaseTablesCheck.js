import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CheckCircle2, XCircle } from "lucide-react";
export function DatabaseTablesCheck({ tables }) {
    if (!tables || tables.length === 0)
        return null;
    // Count missing tables
    const missingTables = tables.filter((table) => !table.exists).length;
    return (_jsxs("div", { className: "rounded-md border border-border/60 overflow-hidden", children: [_jsxs("div", { className: "bg-muted/30 px-4 py-3 font-medium border-b border-border/60 flex justify-between items-center", children: [_jsx("span", { children: "Database Tables" }), missingTables > 0 ? (_jsxs("span", { className: "text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full", children: [missingTables, " missing"] })) : (_jsx("span", { className: "text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full", children: "All present" }))] }), _jsx("div", { className: "divide-y divide-border/60", children: tables.map((table) => (_jsxs("div", { className: "px-4 py-3 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [table.exists ? (_jsx(CheckCircle2, { className: "h-5 w-5 text-green-500" })) : (_jsx(XCircle, { className: "h-5 w-5 text-red-500" })), _jsx("span", { className: "font-medium", children: table.name })] }), _jsx("span", { className: `text-sm ${table.exists ? "text-green-600" : "text-red-600"}`, children: table.exists ? "Exists" : "Missing" })] }, table.name))) })] }));
}
