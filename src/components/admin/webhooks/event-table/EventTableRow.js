import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Repeat, Eye } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { format } from "date-fns";
export const EventTableRow = ({ event, onViewDetails, onRetry }) => {
    const [expanded, setExpanded] = useState(false);
    const formatTimestamp = (timestamp) => {
        try {
            return format(new Date(timestamp), "MMM dd, yyyy HH:mm:ss");
        }
        catch (e) {
            return "Invalid date";
        }
    };
    const toggleExpand = () => {
        setExpanded(!expanded);
    };
    return (_jsxs(_Fragment, { children: [_jsxs(TableRow, { className: "group hover:bg-muted/50", children: [_jsx(TableCell, { children: _jsx(StatusBadge, { status: event.status }) }), _jsxs(TableCell, { children: [_jsx("div", { className: "font-medium", children: event.type || "Unknown" }), _jsx("div", { className: "text-xs text-muted-foreground md:hidden", children: event.webhook_type })] }), _jsx(TableCell, { className: "hidden md:table-cell", children: event.webhook_type || "Unknown" }), _jsx(TableCell, { className: "hidden md:table-cell", children: formatTimestamp(event.timestamp) }), _jsx(TableCell, { className: "text-right", children: _jsxs("div", { className: "flex justify-end items-center space-x-2", children: [_jsxs(Button, { variant: "ghost", size: "icon", onClick: toggleExpand, className: "h-8 w-8", children: [expanded ? (_jsx(ChevronUp, { className: "h-4 w-4" })) : (_jsx(ChevronDown, { className: "h-4 w-4" })), _jsx("span", { className: "sr-only", children: "Toggle details" })] }), _jsxs(Button, { variant: "ghost", size: "icon", onClick: () => onViewDetails && onViewDetails(event), className: "h-8 w-8", children: [_jsx(Eye, { className: "h-4 w-4" }), _jsx("span", { className: "sr-only", children: "View details" })] }), event.status === "failed" && (_jsxs(Button, { variant: "ghost", size: "icon", onClick: () => onRetry && onRetry(event), className: "h-8 w-8 text-yellow-500 hover:text-yellow-600", children: [_jsx(Repeat, { className: "h-4 w-4" }), _jsx("span", { className: "sr-only", children: "Retry webhook" })] }))] }) })] }), expanded && (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: 5, className: "p-0", children: _jsx("div", { className: "p-4 bg-muted/30 border-t border-b", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium mb-1", children: "Request URL" }), _jsx("pre", { className: "text-xs bg-background p-2 rounded overflow-x-auto", children: event.url || "N/A" })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium mb-1", children: "Response" }), _jsx("pre", { className: "text-xs bg-background p-2 rounded overflow-x-auto", children: event.response || "No response data" })] }), _jsxs("div", { className: "md:col-span-2", children: [_jsx("h4", { className: "text-sm font-medium mb-1", children: "Payload" }), _jsx("pre", { className: "text-xs bg-background p-2 rounded overflow-x-auto", children: JSON.stringify(event.payload, null, 2) ||
                                                "No payload data" })] })] }) }) }) }))] }));
};
export default EventTableRow;
