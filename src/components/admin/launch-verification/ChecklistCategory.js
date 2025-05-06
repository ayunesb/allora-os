import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ChecklistItem } from "./ChecklistItem";
export function ChecklistCategory({ category }) {
    const [isExpanded, setIsExpanded] = useState(true);
    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };
    // Calculate status counts
    const completedCount = category.items.filter((item) => item.status === "completed").length;
    const warningCount = category.items.filter((item) => item.status === "warning").length;
    const errorCount = category.items.filter((item) => item.status === "error").length;
    return (_jsxs("div", { className: "border rounded-lg overflow-hidden", children: [_jsxs("div", { className: "flex justify-between items-center p-4 bg-secondary/40 cursor-pointer", onClick: toggleExpanded, children: [_jsxs("div", { children: [_jsx("h3", { className: "font-medium text-lg", children: category.name }), category.description && (_jsx("p", { className: "text-sm text-muted-foreground", children: category.description }))] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "flex items-center gap-2 text-sm", children: [_jsx("span", { className: "text-green-600 font-medium", children: completedCount }), _jsx("span", { className: "text-muted-foreground", children: "/" }), _jsx("span", { className: "font-medium", children: category.items.length }), warningCount > 0 && (_jsxs("span", { className: "ml-2 px-1.5 py-0.5 bg-yellow-100 text-yellow-800 rounded text-xs", children: [warningCount, " warning", warningCount !== 1 ? "s" : ""] })), errorCount > 0 && (_jsxs("span", { className: "ml-2 px-1.5 py-0.5 bg-red-100 text-red-800 rounded text-xs", children: [errorCount, " error", errorCount !== 1 ? "s" : ""] }))] }), _jsx(Button, { variant: "ghost", size: "sm", className: "p-0 h-auto", children: isExpanded ? (_jsx(ChevronUp, { className: "h-5 w-5" })) : (_jsx(ChevronDown, { className: "h-5 w-5" })) })] })] }), isExpanded && (_jsx("div", { className: "divide-y", children: category.items.map((item) => (_jsx(ChecklistItem, { item: item }, item.id))) }))] }));
}
