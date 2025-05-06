import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
export const LeadBulkActions = ({ selectedCount, onStatusUpdate }) => {
    return (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(Button, { variant: "secondary", className: "flex items-center gap-2", children: [_jsx(Check, { className: "h-4 w-4" }), _jsxs("span", { children: [selectedCount, " Selected"] })] }) }), _jsxs(DropdownMenuContent, { align: "end", children: [_jsx(DropdownMenuItem, { onClick: () => onStatusUpdate("new"), children: "Mark as New" }), _jsx(DropdownMenuItem, { onClick: () => onStatusUpdate("contacted"), children: "Mark as Contacted" }), _jsx(DropdownMenuItem, { onClick: () => onStatusUpdate("qualified"), children: "Mark as Qualified" }), _jsx(DropdownMenuItem, { onClick: () => onStatusUpdate("closed"), children: "Mark as Closed" })] })] }));
};
