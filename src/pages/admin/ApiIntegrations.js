import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ZapierReadinessTest from "@/components/admin/webhooks/ZapierReadinessTest";
export default function ApiIntegrations() {
    // Example webhook URL and validation state
    const webhookUrl = "https://hooks.zapier.com/hooks/catch/123456/abcdef/";
    const isValid = true;
    return (_jsxs("div", { children: [_jsx("h1", { children: "API Integrations" }), _jsxs("div", { className: "mt-6", children: [_jsx("h2", { children: "Zapier Integration" }), _jsx("div", { className: "mt-4", children: _jsx(ZapierReadinessTest, { webhookUrl: webhookUrl, isValid: isValid }) })] })] }));
}
