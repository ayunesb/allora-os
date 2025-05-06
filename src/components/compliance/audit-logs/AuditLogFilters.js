import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Download, Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBreakpoint } from "@/hooks/use-mobile";
export default function AuditLogFilters({ actionFilter, setActionFilter, userFilter, setUserFilter, date, setDate, onExportLogs, }) {
    const resetFilters = () => {
        setActionFilter("all");
        setUserFilter("");
        setDate(undefined);
    };
    const breakpoint = useBreakpoint();
    const isMobileView = ["xs", "mobile"].includes(breakpoint);
    const [showFilters, setShowFilters] = useState(!isMobileView);
    // Only show filter toggle on mobile
    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };
    return (_jsxs("div", { className: "space-y-4", children: [isMobileView && (_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs(Button, { variant: "outline", size: "sm", onClick: toggleFilters, className: "flex items-center", children: [_jsx(Filter, { className: "h-4 w-4 mr-2" }), showFilters ? "Hide Filters" : "Show Filters"] }), _jsxs(Button, { variant: "outline", size: "sm", onClick: onExportLogs, children: [_jsx(Download, { className: "h-4 w-4 mr-2" }), "Export"] })] })), (showFilters || !isMobileView) && (_jsxs("div", { className: "flex flex-col md:flex-row gap-4 items-end", children: [_jsxs("div", { className: "space-y-2 w-full md:w-48", children: [_jsx("label", { className: "text-sm font-medium", children: "Action Type" }), _jsxs(Select, { value: actionFilter, onValueChange: setActionFilter, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "All actions" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: "All actions" }), _jsx(SelectItem, { value: "DATA_ACCESS", children: "Data Access" }), _jsx(SelectItem, { value: "DATA_MODIFICATION", children: "Data Modification" }), _jsx(SelectItem, { value: "AUTHENTICATION", children: "Authentication" }), _jsx(SelectItem, { value: "SYSTEM_CHANGE", children: "System Change" }), _jsx(SelectItem, { value: "EXPORT", children: "Export" })] })] })] }), _jsxs("div", { className: "space-y-2 w-full md:w-60", children: [_jsx("label", { className: "text-sm font-medium", children: "User" }), _jsx(Input, { placeholder: "Search by user", value: userFilter, onChange: (e) => setUserFilter(e.target.value) })] }), _jsxs("div", { className: "space-y-2 w-full md:w-48", children: [_jsx("label", { className: "text-sm font-medium", children: "Date" }), _jsxs(Popover, { children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", className: cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground"), children: [_jsx(CalendarIcon, { className: "mr-2 h-4 w-4" }), date ? format(date, "PPP") : "Pick a date"] }) }), _jsx(PopoverContent, { className: "w-auto p-0", children: _jsx(Calendar, { mode: "single", selected: date, onSelect: setDate, initialFocus: true }) })] })] }), _jsx(Button, { variant: "outline", size: isMobileView ? "sm" : "default", onClick: resetFilters, children: "Reset" }), !isMobileView && (_jsxs(Button, { className: "ml-auto", variant: "outline", onClick: onExportLogs, children: [_jsx(Download, { className: "mr-2 h-4 w-4" }), "Export Logs"] }))] })), (actionFilter !== "all" || userFilter || date) && (_jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [_jsx("span", { children: "Active filters:" }), actionFilter !== "all" && (_jsxs("span", { className: "bg-muted px-2 py-1 rounded-md flex items-center", children: ["Action: ", actionFilter, _jsx(X, { className: "h-3 w-3 ml-1 cursor-pointer", onClick: () => setActionFilter("all") })] })), userFilter && (_jsxs("span", { className: "bg-muted px-2 py-1 rounded-md flex items-center", children: ["User: ", userFilter, _jsx(X, { className: "h-3 w-3 ml-1 cursor-pointer", onClick: () => setUserFilter("") })] })), date && (_jsxs("span", { className: "bg-muted px-2 py-1 rounded-md flex items-center", children: ["Date: ", format(date, "PP"), _jsx(X, { className: "h-3 w-3 ml-1 cursor-pointer", onClick: () => setDate(undefined) })] }))] }))] }));
}
