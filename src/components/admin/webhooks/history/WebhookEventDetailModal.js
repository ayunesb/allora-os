import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import JsonViewer from "@/components/JsonViewer";
const WebhookEventDetailModal = ({ event, isOpen, onClose }) => {
    const getStatusBadge = (status) => {
        switch (status.toLowerCase()) {
            case "success":
                return (_jsx(Badge, { className: "bg-green-500/10 text-green-500 border-green-500/20", children: "Success" }));
            case "failed":
                return (_jsx(Badge, { className: "bg-red-500/10 text-red-500 border-red-500/20", children: "Failed" }));
            case "pending":
                return (_jsx(Badge, { className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20", children: "Pending" }));
            default:
                return _jsx(Badge, { variant: "outline", children: status });
        }
    };
    const formattedDate = event.created_at || event.timestamp
        ? format(new Date(event.created_at || event.timestamp), "PPP p")
        : "Unknown date";
    return (_jsx(Dialog, { open: isOpen, onOpenChange: onClose, children: _jsxs(DialogContent, { className: "max-w-3xl", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Webhook Event Details" }), _jsxs(DialogDescription, { className: "flex items-center gap-2", children: [getStatusBadge(event.status), _jsx("span", { className: "text-muted-foreground", children: formattedDate })] })] }), _jsxs("div", { className: "grid gap-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-sm font-medium mb-2", children: "Event Information" }), _jsxs("div", { className: "bg-muted/50 rounded-lg p-3 grid grid-cols-2 gap-2 text-sm", children: [_jsxs("div", { children: [_jsx("p", { className: "text-muted-foreground", children: "Event Type" }), _jsx("p", { className: "font-mono", children: event.event_type || event.eventType || event.type })] }), _jsxs("div", { children: [_jsx("p", { className: "text-muted-foreground", children: "Source" }), _jsx("p", { children: event.source || "Unknown" })] }), _jsxs("div", { children: [_jsx("p", { className: "text-muted-foreground", children: "Target URL" }), _jsx("p", { className: "font-mono truncate", children: event.targetUrl || event.url || "N/A" })] }), _jsxs("div", { children: [_jsx("p", { className: "text-muted-foreground", children: "Duration" }), _jsx("p", { children: event.duration ? `${event.duration}ms` : "Not available" })] })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-sm font-medium mb-2", children: "Payload" }), _jsx("div", { className: "bg-muted/50 rounded-lg p-3 max-h-[200px] overflow-auto", children: _jsx(JsonViewer, { data: event.payload || {} }) })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-sm font-medium mb-2", children: "Response" }), _jsx("div", { className: "bg-muted/50 rounded-lg p-3 max-h-[200px] overflow-auto", children: _jsx(JsonViewer, { data: event.response || {} }) })] })] })] }) }));
};
export default WebhookEventDetailModal;
