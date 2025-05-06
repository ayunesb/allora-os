import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
export function DecisionTable({ decisions, loading, error }) {
    const getPriorityColor = (priority) => {
        switch (priority) {
            case "high":
                return "bg-red-100 text-red-800 border-red-300";
            case "medium":
                return "bg-yellow-100 text-yellow-800 border-yellow-300";
            case "low":
                return "bg-green-100 text-green-800 border-green-300";
            default:
                return "bg-gray-100 text-gray-800 border-gray-300";
        }
    };
    if (loading) {
        return (_jsx("div", { className: "flex justify-center items-center h-64", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-primary" }) }));
    }
    if (error) {
        return (_jsx(Card, { className: "p-6 bg-red-50 border border-red-200 text-red-800", children: _jsx("p", { children: error }) }));
    }
    if (decisions.length === 0) {
        return (_jsxs(Card, { className: "p-8 text-center", children: [_jsx("h3", { className: "text-xl font-medium mb-2", children: "No decisions found" }), _jsx("p", { className: "text-muted-foreground", children: "No decisions match your current filters. Try adjusting your search criteria." })] }));
    }
    return (_jsx(Card, { className: "p-0 overflow-hidden", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Executive" }), _jsx(TableHead, { children: "Task" }), _jsx(TableHead, { children: "Decision" }), _jsx(TableHead, { children: "Risk Assessment" }), _jsx(TableHead, { children: "Priority" }), _jsx(TableHead, { children: "Date" })] }) }), _jsx(TableBody, { children: decisions.map((decision) => (_jsxs(TableRow, { children: [_jsxs(TableCell, { className: "font-medium", children: [_jsx("div", { children: _jsx(Link, { to: `/dashboard/executives/${encodeURIComponent(decision.executiveName)}`, className: "hover:underline hover:text-primary", children: decision.executiveName }) }), _jsx("div", { className: "text-xs text-muted-foreground", children: decision.executiveRole })] }), _jsx(TableCell, { children: decision.task }), _jsxs(TableCell, { children: [_jsx("div", { className: "font-medium", children: decision.selectedOption }), _jsx("div", { className: "text-sm text-muted-foreground mt-1", children: decision.reasoning })] }), _jsx(TableCell, { className: "max-w-xs", children: decision.riskAssessment || "No risk assessment" }), _jsx(TableCell, { children: decision.priority && (_jsx(Badge, { className: getPriorityColor(decision.priority), children: decision.priority })) }), _jsx(TableCell, { className: "whitespace-nowrap", children: new Date(decision.timestamp).toLocaleString() })] }, decision.id))) })] }) }));
}
