import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
// Simple JSON viewer component
const JsonViewer = ({ data }) => {
    return (_jsx("pre", { className: "bg-muted p-4 rounded-md overflow-auto max-h-96 text-xs", children: JSON.stringify(data, null, 2) }));
};
// Format date function
const formatDateTimeString = (dateString) => {
    if (!dateString)
        return "Unknown";
    try {
        const date = new Date(dateString);
        return date.toLocaleString();
    }
    catch (error) {
        return "Invalid Date";
    }
};
export function EventDetailsModal({ event, isOpen, onClose }) {
    if (!event)
        return null;
    // Determine status color
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
    return (_jsx(Dialog, { open: isOpen, onOpenChange: () => onClose(), children: _jsxs(DialogContent, { className: "max-w-3xl max-h-[80vh] overflow-y-auto", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Webhook Event Details" }), _jsxs(DialogDescription, { children: ["Event ID: ", event.id] })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium", children: "Event Type" }), _jsx("p", { className: "text-sm", children: event.event_type || event.eventType || event.type || "Unknown" })] }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium", children: "Status" }), _jsx(Badge, { className: getStatusColor(event.status), children: event.status })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium", children: "Created At" }), _jsx("p", { className: "text-sm", children: formatDateTimeString(event.created_at || event.timestamp || "") })] }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium", children: "Webhook Type" }), _jsx("p", { className: "text-sm capitalize", children: event.webhookType || event.type || "custom" })] })] }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium", children: "Target URL" }), _jsx("p", { className: "text-sm break-all", children: event.targetUrl || event.url || "N/A" })] }), _jsx(Separator, {}), event.response && (_jsxs(_Fragment, { children: [_jsxs("div", { children: [_jsx("h3", { className: "text-sm font-medium", children: "Response" }), _jsx(JsonViewer, { data: event.response })] }), _jsx(Separator, {})] })), _jsxs("div", { children: [_jsx("h3", { className: "text-sm font-medium", children: "Payload" }), _jsx(JsonViewer, { data: event.payload || {} })] }), event.responseCode && event.responseCode >= 400 && (_jsxs("div", { className: "mt-4 p-4 border border-red-300 rounded-md bg-red-50 dark:bg-red-900/20", children: [_jsx("h3", { className: "text-sm font-medium text-red-700 dark:text-red-400", children: "Error Code" }), _jsxs("p", { className: "text-sm text-red-600 dark:text-red-400", children: ["Response code: ", event.responseCode] })] }))] })] }) }));
}
export default EventDetailsModal;
