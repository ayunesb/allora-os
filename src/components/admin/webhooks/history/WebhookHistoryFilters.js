import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
const typeOptions = ["zapier", "custom", "slack", "github", "stripe", "notion"];
const statusOptions = ["success", "failed", "pending"];
export default function WebhookHistoryFilters({ filter, onFilterChange, onResetFilters, }) {
    const [datePopoverOpen, setDatePopoverOpen] = useState(false);
    const { types, status, dateRange, search } = filter;
    // Handle type selection/deselection
    const handleTypeSelect = (type) => {
        if (types.includes(type)) {
            onFilterChange({ types: types.filter((t) => t !== type) });
        }
        else {
            onFilterChange({ types: [...types, type] });
        }
    };
    // Format date range for display
    const formatDateRange = () => {
        const [start, end] = dateRange;
        if (start && end) {
            return `${format(start, "MMM d, yyyy")} - ${format(end, "MMM d, yyyy")}`;
        }
        if (start) {
            return `From ${format(start, "MMM d, yyyy")}`;
        }
        if (end) {
            return `Until ${format(end, "MMM d, yyyy")}`;
        }
        return "All dates";
    };
    return (_jsxs("div", { className: "space-y-4 mb-6 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h3", { className: "text-sm font-semibold", children: "Filter Webhook Events" }), _jsx(Button, { variant: "ghost", size: "sm", onClick: onResetFilters, className: "h-7 text-xs", children: "Reset filters" })] }), _jsxs("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [_jsxs("div", { className: "space-y-1", children: [_jsx(Label, { htmlFor: "search", className: "text-xs", children: "Search" }), _jsxs("div", { className: "flex", children: [_jsx(Input, { id: "search", placeholder: "Search by URL or payload", value: search, onChange: (e) => onFilterChange({ search: e.target.value }), className: "h-8 text-xs" }), search && (_jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8", onClick: () => onFilterChange({ search: "" }), children: _jsx(X, { className: "h-3 w-3" }) }))] })] }), _jsxs("div", { className: "space-y-1", children: [_jsx(Label, { htmlFor: "status", className: "text-xs", children: "Status" }), _jsxs(Select, { value: status, onValueChange: (value) => onFilterChange({ status: value }), children: [_jsx(SelectTrigger, { id: "status", className: "h-8 text-xs", children: _jsx(SelectValue, { placeholder: "All statuses" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "", children: "All statuses" }), statusOptions.map((s) => (_jsx(SelectItem, { value: s, children: s }, s)))] })] })] }), _jsxs("div", { className: "space-y-1", children: [_jsx(Label, { className: "text-xs", children: "Date Range" }), _jsxs(Popover, { open: datePopoverOpen, onOpenChange: setDatePopoverOpen, children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", className: "w-full justify-start text-left h-8 text-xs font-normal", children: [_jsx(CalendarIcon, { className: "mr-2 h-3 w-3" }), formatDateRange()] }) }), _jsx(PopoverContent, { className: "w-auto p-0", align: "start", children: _jsx(Calendar, { mode: "range", selected: {
                                                from: dateRange[0] || undefined,
                                                to: dateRange[1] || undefined,
                                            }, onSelect: (range) => {
                                                onFilterChange({
                                                    dateRange: [(range === null || range === void 0 ? void 0 : range.from) || null, (range === null || range === void 0 ? void 0 : range.to) || null],
                                                });
                                                setDatePopoverOpen(false);
                                            }, initialFocus: true }) })] })] })] }), _jsxs("div", { className: "space-y-1", children: [_jsx(Label, { className: "text-xs", children: "Webhook Types" }), _jsx("div", { className: "flex flex-wrap gap-2", children: typeOptions.map((type) => (_jsxs(Badge, { variant: types.includes(type) ? "default" : "outline", className: "cursor-pointer", onClick: () => handleTypeSelect(type), children: [type, types.includes(type) && _jsx(X, { className: "ml-1 h-3 w-3" })] }, type))) })] }), (types.length > 0 ||
                status ||
                dateRange[0] ||
                dateRange[1] ||
                search) && (_jsxs("div", { className: "pt-2 flex items-center gap-2 flex-wrap text-xs text-muted-foreground", children: [_jsx("span", { children: "Active filters:" }), types.length > 0 && (_jsxs("span", { children: [types.length, " type", types.length !== 1 ? "s" : ""] })), status && _jsxs("span", { children: ["Status: ", status] }), (dateRange[0] || dateRange[1]) && (_jsxs("span", { children: ["Date: ", formatDateRange()] })), search && _jsxs("span", { children: ["Search: \"", search, "\""] })] }))] }));
}
