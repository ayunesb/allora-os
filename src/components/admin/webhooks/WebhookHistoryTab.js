import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
const WebhookHistoryTab = ({ events, onRefresh, isLoading }) => {
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between", children: [_jsx(CardTitle, { children: "Webhook Event History" }), _jsxs(Button, { variant: "outline", size: "sm", onClick: onRefresh, disabled: isLoading, children: [_jsx(RefreshCw, { className: "h-4 w-4 mr-2" }), "Refresh"] })] }), _jsx(CardContent, { children: isLoading ? (_jsx("div", { className: "text-center py-8", children: "Loading webhook events..." })) : events.length === 0 ? (_jsxs("div", { className: "text-center py-8", children: [_jsx("p", { className: "text-muted-foreground", children: "No webhook events have been recorded yet." }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Events will appear here once webhooks are triggered." })] })) : (_jsx("div", { className: "space-y-4", children: events.map((event) => (_jsxs("div", { className: "p-4 border rounded-lg", children: [_jsxs("div", { className: "flex justify-between mb-2", children: [_jsx("span", { className: "font-medium", children: event.event_type }), _jsx("span", { className: `text-sm ${event.status === "success"
                                            ? "text-green-500"
                                            : event.status === "failed"
                                                ? "text-red-500"
                                                : "text-amber-500"}`, children: event.status })] }), _jsxs("div", { className: "text-sm text-muted-foreground", children: [_jsxs("p", { children: ["Target: ", event.targetUrl || event.url] }), _jsxs("p", { children: ["Time:", " ", new Date(event.timestamp || event.created_at).toLocaleString()] })] })] }, event.id))) })) })] }));
};
export default WebhookHistoryTab;
