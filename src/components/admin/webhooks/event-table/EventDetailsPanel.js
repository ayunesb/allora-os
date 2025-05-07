import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { formatDistanceToNow } from "date-fns";
import { Calendar, Hash, Server, RefreshCw, Clock, MessageSquare, } from "lucide-react";
import JsonViewer from "@/components/JsonViewer";
import StatusBadge from "./StatusBadge";
const EventDetailsPanel = ({ event, expanded = false }) => {
    if (!expanded)
        return null;
    // Format the date to relative time
    const relativeTime = event.created_at || event.timestamp
        ? formatDistanceToNow(new Date(event.created_at || event.timestamp), {
            addSuffix: true,
        })
        : "Unknown time";
    // Format webhook type with proper capitalization
    const formatWebhookType = (type) => {
        return type.charAt(0).toUpperCase() + type.slice(1);
    };
    const webhookType = event.webhookType || event.webhook_type || event.type || "Unknown";
    const eventType = event.eventType || event.event_type || "Unknown";
    const url = event.targetUrl || event.url || "No URL";
    return (_jsxs("div", { className: "bg-muted/30 p-4 rounded-md space-y-4 text-sm", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-start gap-2 mb-2", children: [_jsx(Hash, { className: "h-4 w-4 text-muted-foreground mt-0.5" }), _jsxs("div", { children: [_jsx("span", { className: "text-muted-foreground block", children: "ID" }), _jsx("span", { className: "font-mono text-xs", children: event.id })] })] }), _jsxs("div", { className: "flex items-start gap-2 mb-2", children: [_jsx(Calendar, { className: "h-4 w-4 text-muted-foreground mt-0.5" }), _jsxs("div", { children: [_jsx("span", { className: "text-muted-foreground block", children: "Time" }), _jsx("span", { children: relativeTime })] })] }), _jsxs("div", { className: "flex items-start gap-2 mb-2", children: [_jsx(Server, { className: "h-4 w-4 text-muted-foreground mt-0.5" }), _jsxs("div", { children: [_jsx("span", { className: "text-muted-foreground block", children: "Type" }), _jsx("span", { children: formatWebhookType(webhookType) })] })] })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-start gap-2 mb-2", children: [_jsx(MessageSquare, { className: "h-4 w-4 text-muted-foreground mt-0.5" }), _jsxs("div", { children: [_jsx("span", { className: "text-muted-foreground block", children: "Event" }), _jsx("span", { children: eventType })] })] }), _jsxs("div", { className: "flex items-start gap-2 mb-2", children: [_jsx(Clock, { className: "h-4 w-4 text-muted-foreground mt-0.5" }), _jsxs("div", { children: [_jsx("span", { className: "text-muted-foreground block", children: "Duration" }), _jsx("span", { children: event.duration ? `${event.duration}ms` : "N/A" })] })] }), _jsxs("div", { className: "flex items-start gap-2", children: [_jsx(RefreshCw, { className: "h-4 w-4 text-muted-foreground mt-0.5" }), _jsxs("div", { children: [_jsx("span", { className: "text-muted-foreground block", children: "Status" }), _jsx(StatusBadge, { status: event.status })] })] })] })] }), _jsxs("div", { children: [_jsx("span", { className: "text-muted-foreground block mb-1", children: "Target URL" }), _jsx("code", { className: "text-xs break-all block p-2 bg-muted rounded", children: url })] }), event.payload && (_jsxs("div", { children: [_jsx("span", { className: "text-muted-foreground block mb-1", children: "Payload" }), _jsx("div", { className: "max-h-60 overflow-auto rounded border", children: _jsx(JsonViewer, { data: event.payload }) })] })), event.response && (_jsxs("div", { children: [_jsx("span", { className: "text-muted-foreground block mb-1", children: "Response" }), _jsx("div", { className: "max-h-60 overflow-auto rounded border", children: _jsx(JsonViewer, { data: event.response }) })] }))] }));
};
export default EventDetailsPanel;
