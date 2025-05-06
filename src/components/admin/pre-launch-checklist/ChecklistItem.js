import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
export function ChecklistItem({ item, onToggle }) {
    return (_jsxs("div", { className: `flex items-center justify-between p-2 rounded-md ${item.completed ? "bg-green-500/5" : item.critical ? "bg-yellow-500/5" : "bg-secondary/40"}`, children: [_jsxs("div", { className: "flex items-center gap-2", children: [item.completed ? (_jsx(Check, { className: "h-5 w-5 text-green-500" })) : item.critical ? (_jsx(AlertCircle, { className: "h-5 w-5 text-yellow-500" })) : (_jsx("div", { className: "h-5 w-5 border border-gray-300 rounded-md" })), _jsxs("div", { children: [_jsx("div", { className: "text-sm font-medium", children: item.task }), _jsx("div", { className: "text-xs text-muted-foreground", children: item.category })] })] }), _jsx(Button, { variant: item.completed ? "outline" : "default", size: "sm", onClick: () => onToggle(item.id), children: item.completed ? "Mark Incomplete" : "Mark Complete" })] }));
}
