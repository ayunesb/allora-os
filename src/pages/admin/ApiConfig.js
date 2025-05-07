import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from "react";
import { Helmet } from "react-helmet-async";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Settings, Key, ShieldAlert, Link as LinkIcon, AlertCircle, CheckCircle2, } from "lucide-react";
import APIKeysTab from "@/components/admin/APIKeysTab";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import GitHubWebhookConfigSection from "@/components/admin/webhooks/GitHubWebhookConfigSection";
export default function ApiConfig() {
    const navigate = useNavigate();
    const [activeApiKeys, setActiveApiKeys] = React.useState({
        stripe: true,
        openai: true,
        twilio: false,
        postmark: true,
        heygen: false,
    });
    const [isLoading, setIsLoading] = React.useState(false);
    const [webhookDebugEnabled, setWebhookDebugEnabled] = React.useState(false);
    const [apiLogging, setApiLogging] = React.useState(true);
    const [companyId, setCompanyId] = React.useState("company-123");
    const [apiKeys, setApiKeys] = React.useState({
        stripe: "sk_test_•••••••••••••••••••••••••",
        twilio_sid: "AC•••••••••••••••••••••••••",
        twilio_token: "••••••••••••••••••••••••••••••",
        heygen: "••••••••••••••••••••••••••••••",
        openai: "sk-•••••••••••••••••••••••••••••",
    });
    const toggleApiKey = (key) => {
        setActiveApiKeys((prev) => (Object.assign(Object.assign({}, prev), { [key]: !prev[key] })));
        toast.success(`${key.charAt(0).toUpperCase() + key.slice(1)} API ${!activeApiKeys[key] ? "enabled" : "disabled"}`);
    };
    const testApiConnection = () => {
        setIsLoading(true);
        // Simulate API test
        setTimeout(() => {
            setIsLoading(false);
            toast.success("API connections tested successfully");
        }, 2000);
    };
    const handleConfigureWebhook = (webhookType) => {
        navigate("/admin/webhooks", {
            state: { activeTab: "config", selectedWebhook: webhookType },
        });
    };
    return (_jsxs(_Fragment, { children: [_jsx(Helmet, { children: _jsx("title", { children: "API Configuration | Allora AI" }) }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold", children: "API Configuration" }), _jsx("p", { className: "text-muted-foreground mb-4", children: "Manage API keys and external service connections." })] }), _jsxs(Tabs, { defaultValue: "api-keys", className: "space-y-4", children: [_jsxs(TabsList, { children: [_jsx(TabsTrigger, { value: "api-keys", children: "API Keys" }), _jsx(TabsTrigger, { value: "security", children: "Security" }), _jsx(TabsTrigger, { value: "webhooks", children: "Webhooks" }), _jsx(TabsTrigger, { value: "advanced", children: "Advanced" })] }), _jsxs(TabsContent, { value: "api-keys", className: "space-y-4", children: [_jsx(APIKeysTab, { companyId: companyId, initialApiKeys: apiKeys, isLoading: isLoading }), _jsxs(Card, { className: "mt-6", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-base", children: "Active Integrations" }), _jsx(CardDescription, { children: "Enable or disable API integrations as needed" })] }), _jsx(CardContent, { children: _jsx("div", { className: "grid gap-4", children: Object.entries(activeApiKeys).map(([key, isActive]) => (_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Key, { className: "h-4 w-4 text-muted-foreground" }), _jsx("span", { className: "font-medium", children: key.charAt(0).toUpperCase() + key.slice(1) }), isActive ? (_jsx(Badge, { variant: "outline", className: "bg-green-50 text-green-700 border-green-200", children: "Active" })) : (_jsx(Badge, { variant: "outline", className: "bg-gray-50 text-gray-500", children: "Inactive" }))] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { variant: "outline", size: "sm", onClick: () => navigate(`/admin/api-integrations?service=${key}`), children: "Configure" }), _jsx(Switch, { checked: isActive, onCheckedChange: () => toggleApiKey(key) })] })] }, key))) }) })] })] }), _jsx(TabsContent, { value: "security", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(ShieldAlert, { className: "h-5 w-5 text-amber-500" }), _jsx(CardTitle, { children: "API Security Settings" })] }), _jsx(CardDescription, { children: "Configure security settings for API access" })] }), _jsx(CardContent, { className: "space-y-4", children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-medium", children: "API Rate Limiting" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Limit the number of API requests per minute" })] }), _jsx(Switch, { defaultChecked: true })] }), _jsx(Separator, {}), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-medium", children: "IP Whitelisting" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Restrict API access to specific IP addresses" })] }), _jsx(Switch, {})] }), _jsx(Separator, {}), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-medium", children: "API Key Rotation" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Automatically rotate API keys every 90 days" })] }), _jsx(Switch, { defaultChecked: true })] }), _jsx(Separator, {}), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-medium", children: "Enhanced Logging" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Enable detailed logging for API requests" })] }), _jsx(Switch, { checked: apiLogging, onCheckedChange: setApiLogging })] })] }) })] }) }), _jsx(TabsContent, { value: "webhooks", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(LinkIcon, { className: "h-5 w-5 text-blue-500" }), _jsx(CardTitle, { children: "Webhook Configuration" })] }), _jsx(CardDescription, { children: "Manage incoming and outgoing webhooks" })] }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-6", children: [_jsxs(Alert, { children: [_jsx(AlertCircle, { className: "h-4 w-4" }), _jsx(AlertTitle, { children: "Testing Mode Active" }), _jsx(AlertDescription, { children: "Webhook testing mode is currently active. Events will be logged but not fully processed." })] }), _jsxs("div", { className: "space-y-4 mt-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-medium", children: "Webhook Debugging" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Enable detailed logging for webhook events" })] }), _jsx(Switch, { checked: webhookDebugEnabled, onCheckedChange: setWebhookDebugEnabled })] }), webhookDebugEnabled && (_jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "text-sm font-medium", children: "Debug Webhook Response" }), _jsx(Textarea, { placeholder: "Webhook responses will appear here", className: "font-mono text-xs h-32", readOnly: true, value: `{
  "event": "webhook.test",
  "status": "success",
  "timestamp": "2025-04-14T10:23:45Z",
  "data": {
    "company": "Acme Corp",
    "action": "user.created"
  }
}` })] })), _jsxs("div", { className: "space-y-4 mt-6", children: [_jsx("h3", { className: "font-medium", children: "Webhook Endpoints" }), _jsxs("div", { className: "flex justify-between items-center p-2 border rounded-md", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(CheckCircle2, { className: "h-4 w-4 text-green-500" }), _jsx("span", { children: "Stripe Webhooks" })] }), _jsx(Button, { variant: "outline", size: "sm", onClick: () => handleConfigureWebhook("stripe"), children: "Configure" })] }), _jsxs("div", { className: "flex justify-between items-center p-2 border rounded-md", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(CheckCircle2, { className: "h-4 w-4 text-green-500" }), _jsx("span", { children: "Zapier Integration" })] }), _jsx(Button, { variant: "outline", size: "sm", onClick: () => handleConfigureWebhook("zapier"), children: "Configure" })] }), _jsx(GitHubWebhookConfigSection, { onConfigureWebhook: handleConfigureWebhook })] })] })] }) })] }) }), _jsx(TabsContent, { value: "advanced", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Settings, { className: "h-5 w-5 text-slate-500" }), _jsx(CardTitle, { children: "Advanced API Settings" })] }), _jsx(CardDescription, { children: "Configure advanced options for API services" })] }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "grid gap-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-medium mb-2", children: "API Timeout Settings" }), _jsxs("div", { className: "flex space-x-2", children: [_jsx(Toggle, { variant: "outline", "aria-label": "5 seconds", size: "sm", children: "5s" }), _jsx(Toggle, { variant: "outline", "aria-label": "10 seconds", size: "sm", pressed: true, children: "10s" }), _jsx(Toggle, { variant: "outline", "aria-label": "30 seconds", size: "sm", children: "30s" }), _jsx(Toggle, { variant: "outline", "aria-label": "60 seconds", size: "sm", children: "60s" })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-medium mb-2", children: "API Response Format" }), _jsxs("div", { className: "flex space-x-2", children: [_jsx(Toggle, { variant: "outline", "aria-label": "JSON", size: "sm", pressed: true, children: "JSON" }), _jsx(Toggle, { variant: "outline", "aria-label": "XML", size: "sm", children: "XML" }), _jsx(Toggle, { variant: "outline", "aria-label": "YAML", size: "sm", children: "YAML" })] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-medium", children: "Error Notification" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Receive email alerts for API errors" })] }), _jsx(Switch, { defaultChecked: true })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-medium", children: "Sandbox Mode" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Use test environments for all API calls" })] }), _jsx(Switch, {})] })] }), _jsx("div", { className: "mt-6", children: _jsx(Button, { onClick: testApiConnection, disabled: isLoading, children: isLoading ? (_jsxs(_Fragment, { children: [_jsx(AlertCircle, { className: "mr-2 h-4 w-4 animate-pulse" }), "Testing Connections..."] })) : (_jsxs(_Fragment, { children: [_jsx(LinkIcon, { className: "mr-2 h-4 w-4" }), "Test All API Connections"] })) }) })] }) })] }) })] })] })] }));
}
