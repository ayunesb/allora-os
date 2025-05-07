import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
export function WebhookEventTable({ events, isLoading, onViewDetail }) {
    if (isLoading) {
        return (_jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Event Type" }), _jsx(TableHead, { children: "Status" }), _jsx(TableHead, { children: "Source" }), _jsx(TableHead, { children: "Date" }), _jsx(TableHead, { children: "Actions" })] }) }), _jsx(TableBody, { children: Array.from({ length: 5 }).map((_, i) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: _jsx(Skeleton, { className: "h-4 w-32" }) }), _jsx(TableCell, { children: _jsx(Skeleton, { className: "h-4 w-20" }) }), _jsx(TableCell, { children: _jsx(Skeleton, { className: "h-4 w-48" }) }), _jsx(TableCell, { children: _jsx(Skeleton, { className: "h-4 w-24" }) }), _jsx(TableCell, { children: _jsx(Skeleton, { className: "h-8 w-16" }) })] }, i))) })] }));
    }
    if (events.length === 0) {
        return (_jsx("div", { className: "text-center py-12", children: _jsx("p", { className: "text-muted-foreground", children: "No webhook events found matching the current filters." }) }));
    }
    // Format date function
    const formatDate = (dateString) => {
        if (!dateString)
            return "Unknown";
        try {
            return new Date(dateString).toLocaleString();
        }
        catch (error) {
            return "Invalid Date";
        }
    };
    // Get status badge color
    const getStatusColor = (status) => {
        switch (status) {
            case "success":
                return "bg-green-500 text-white";
            case "failed":
                return "bg-red-500 text-white";
            case "pending":
                return "bg-yellow-500 text-white";
            default:
                return "bg-gray-500 text-white";
        }
    };
    return (_jsx("div", { className: "rounded-md border", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Event Type" }), _jsx(TableHead, { children: "Status" }), _jsx(TableHead, { children: "Source" }), _jsx(TableHead, { children: "Date" }), _jsx(TableHead, { className: "text-right", children: "Actions" })] }) }), _jsx(TableBody, { children: events.map((event) => (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "font-medium", children: event.event_type || event.eventType || "Unknown" }), _jsx(TableCell, { children: _jsx(Badge, { className: getStatusColor(event.status), children: event.status }) }), _jsx(TableCell, { className: "max-w-[200px] truncate", title: event.targetUrl || event.url, children: event.source ||
                                    (event.targetUrl || event.url
                                        ? new URL(event.targetUrl || event.url || "#").hostname
                                        : "Unknown") }), _jsx(TableCell, { children: formatDate(event.created_at || event.timestamp || "") }), _jsx(TableCell, { className: "text-right", children: _jsxs(Button, { size: "sm", variant: "outline", onClick: () => onViewDetail(event), children: [_jsx(Eye, { className: "h-4 w-4 mr-1" }), "View"] }) })] }, event.id))) })] }) }));
}
export default WebhookEventTable;
