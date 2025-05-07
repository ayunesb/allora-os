import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CheckCircle2, XCircle, Shield } from "lucide-react";
export function RlsPoliciesCheck({ policies }) {
    if (!policies || policies.length === 0)
        return null;
    // Count disabled RLS policies
    const disabledPolicies = policies.filter((policy) => !policy.exists).length;
    return (_jsxs("div", { className: "rounded-md border border-border/60 overflow-hidden", children: [_jsxs("div", { className: "bg-muted/30 px-4 py-3 font-medium border-b border-border/60 flex justify-between items-center", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Shield, { className: "h-4 w-4 text-blue-500" }), _jsx("span", { children: "Row Level Security Policies" })] }), disabledPolicies > 0 ? (_jsxs("span", { className: "text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full", children: [disabledPolicies, " disabled"] })) : (_jsx("span", { className: "text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full", children: "All enabled" }))] }), _jsx("div", { className: "divide-y divide-border/60", children: policies.map((policy, index) => (_jsxs("div", { className: "px-4 py-3 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [policy.exists ? (_jsx(CheckCircle2, { className: "h-5 w-5 text-green-500" })) : (_jsx(XCircle, { className: "h-5 w-5 text-red-500" })), _jsx("span", { className: "font-medium", children: policy.table })] }), _jsx("span", { className: `text-sm ${policy.exists ? "text-green-600" : "text-red-600"}`, children: policy.exists ? "Enabled" : "Disabled" })] }, `${policy.table}-${index}`))) })] }));
}
