import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, ExternalLink, Clock } from "lucide-react";
export default function WebhookCard({ webhook, onEdit, onDelete, onTest }) {
    const formatWebhookType = (type) => {
        return type.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    };
    const truncateUrl = (url) => {
        return url.length > 40 ? `${url.substring(0, 40)}...` : url;
    };
    const getWebhookBadgeColor = (type) => {
        switch (type) {
            case "strategy_created":
                return "bg-blue-100 text-blue-800";
            case "campaign_updated":
                return "bg-green-100 text-green-800";
            case "lead_captured":
                return "bg-yellow-100 text-yellow-800";
            case "payment_received":
                return "bg-purple-100 text-purple-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };
    return (_jsxs(Card, { className: "w-full", children: [_jsx(CardHeader, { className: "pb-3", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(CardTitle, { className: "text-lg", children: _jsx(Badge, { className: `${getWebhookBadgeColor(webhook.type)}`, children: formatWebhookType(webhook.type) }) }), webhook.created_at && (_jsxs("div", { className: "text-xs text-muted-foreground flex items-center", children: [_jsx(Clock, { className: "h-3 w-3 mr-1" }), new Date(webhook.created_at).toLocaleDateString()] }))] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-2", children: _jsxs("div", { className: "text-sm", children: [_jsx("span", { className: "font-medium", children: "URL:" }), " ", _jsxs("a", { href: webhook.url, target: "_blank", rel: "noopener noreferrer", className: "text-primary hover:underline flex items-center", children: [_jsx("span", { className: "truncate", children: truncateUrl(webhook.url) }), _jsx(ExternalLink, { className: "ml-1 h-3 w-3" })] })] }) }) }), _jsxs(CardFooter, { className: "flex justify-end gap-2 pt-2", children: [_jsx(Button, { variant: "outline", size: "sm", onClick: () => onTest(webhook.id), children: "Test" }), _jsxs(Button, { variant: "outline", size: "sm", onClick: () => onEdit(webhook), children: [_jsx(Edit, { className: "h-4 w-4 mr-1" }), "Edit"] }), _jsxs(Button, { variant: "destructive", size: "sm", onClick: () => onDelete(webhook.id), children: [_jsx(Trash2, { className: "h-4 w-4 mr-1" }), "Delete"] })] })] }));
}
