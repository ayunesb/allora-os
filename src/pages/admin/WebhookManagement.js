import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { WebhooksTab } from "@/components/admin";
import { Helmet } from "react-helmet-async";
export default function WebhookManagement() {
    return (_jsxs(_Fragment, { children: [_jsx(Helmet, { children: _jsx("title", { children: "Webhook Management | Allora AI" }) }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold", children: "Webhook Management" }), _jsx("p", { className: "text-muted-foreground mb-4", children: "Configure and manage webhooks to integrate with external services" })] }), _jsx(WebhooksTab, {})] })] }));
}
