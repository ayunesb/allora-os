import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import WebhookCard from "./WebhookCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
export default function WebhookList({ webhooks, isLoading, onAddWebhook, onEditWebhook, onDeleteWebhook, onTestWebhook, }) {
    if (isLoading) {
        return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h2", { className: "text-xl font-semibold", children: "Webhooks" }), _jsxs(Button, { disabled: true, children: [_jsx(Plus, { className: "h-4 w-4 mr-2" }), "Add Webhook"] })] }), [1, 2, 3].map((i) => (_jsx(Skeleton, { className: "h-[180px] w-full" }, i)))] }));
    }
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h2", { className: "text-xl font-semibold", children: "Webhooks" }), _jsxs(Button, { onClick: onAddWebhook, children: [_jsx(Plus, { className: "h-4 w-4 mr-2" }), "Add Webhook"] })] }), webhooks.length === 0 ? (_jsxs("div", { className: "text-center py-12 border rounded-lg", children: [_jsx("p", { className: "text-muted-foreground", children: "No webhooks configured" }), _jsx(Button, { onClick: onAddWebhook, variant: "link", className: "mt-2", children: "Add your first webhook" })] })) : (_jsx("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3", children: webhooks.map((webhook) => (_jsx(WebhookCard, { webhook: webhook, onEdit: onEditWebhook, onDelete: onDeleteWebhook, onTest: onTestWebhook }, webhook.id))) }))] }));
}
