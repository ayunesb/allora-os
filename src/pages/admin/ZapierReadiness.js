import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ZapierReadinessTest from "@/components/admin/webhooks/ZapierReadinessTest";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { validateWebhookUrlFormat } from "@/utils/webhookValidation";
export default function ZapierReadiness() {
    const { profile } = useAuth();
    const [activeTab, setActiveTab] = useState("test");
    const [webhookUrl, setWebhookUrl] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    // Load webhook URL from localStorage on mount
    useEffect(() => {
        const savedWebhookUrl = localStorage.getItem("zapier_webhook_url");
        if (savedWebhookUrl) {
            setWebhookUrl(savedWebhookUrl);
            validateUrl(savedWebhookUrl);
        }
    }, []);
    const validateUrl = (url) => {
        if (!url) {
            setIsValid(false);
            return;
        }
        const validationResult = validateWebhookUrlFormat(url);
        setIsValid(validationResult);
    };
    const handleSave = () => {
        if (!webhookUrl) {
            toast.error("Please enter a webhook URL");
            return;
        }
        if (isValid !== true) {
            toast.error("Please enter a valid Zapier webhook URL");
            return;
        }
        setIsSaving(true);
        // Sanitize URL before saving
        const sanitizedUrl = webhookUrl.trim();
        // Save to localStorage
        localStorage.setItem("zapier_webhook_url", sanitizedUrl);
        setTimeout(() => {
            setIsSaving(false);
            toast.success("Zapier webhook URL saved successfully");
        }, 500);
    };
    return (_jsxs(_Fragment, { children: [_jsx(Helmet, { children: _jsx("title", { children: "Zapier Integration Readiness | Allora AI" }) }), _jsxs("div", { className: "space-y-6", children: [_jsx("div", { className: "flex justify-between items-start", children: _jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold", children: "Zapier Integration Readiness" }), _jsx("p", { className: "text-muted-foreground", children: "Verify all Zapier webhooks are correctly configured and firing on business events" })] }) }), _jsxs(Tabs, { defaultValue: activeTab, onValueChange: setActiveTab, className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-3", children: [_jsx(TabsTrigger, { value: "test", children: "Webhook Tests" }), _jsx(TabsTrigger, { value: "config", children: "Configure" }), _jsx(TabsTrigger, { value: "documentation", children: "Documentation" })] }), _jsx(TabsContent, { value: "test", className: "space-y-4 mt-6", children: _jsx(ZapierReadinessTest, { webhookUrl: webhookUrl, isValid: isValid }) }), _jsx(TabsContent, { value: "config", className: "space-y-4 mt-6", children: _jsxs(Card, { className: "p-6", children: [_jsx("h3", { className: "text-lg font-medium mb-4", children: "Configure Your Zapier Webhook" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "webhookUrl", className: "text-sm font-medium", children: "Zapier Webhook URL" }), _jsx(Input, { id: "webhookUrl", placeholder: "https://hooks.zapier.com/hooks/catch/123456/abcdef/", value: webhookUrl, onChange: (e) => {
                                                                setWebhookUrl(e.target.value);
                                                                validateUrl(e.target.value);
                                                            }, className: `max-w-xl ${isValid === false ? "border-red-500" : ""}` }), isValid === false && webhookUrl && (_jsx("p", { className: "text-red-500 text-sm", children: "Please enter a valid Zapier webhook URL" }))] }), _jsx(Button, { onClick: handleSave, disabled: isSaving || isValid !== true, className: "mt-2", children: isSaving ? "Saving..." : "Save Webhook URL" }), _jsxs("div", { className: "bg-muted p-4 rounded-md mt-6", children: [_jsx("h4", { className: "font-medium mb-2", children: "How to get your Zapier webhook URL:" }), _jsxs("ol", { className: "list-decimal pl-5 space-y-2 text-sm", children: [_jsx("li", { children: "Log in to your Zapier account" }), _jsx("li", { children: "Create a new Zap" }), _jsx("li", { children: "Select \"Webhook\" as the trigger app" }), _jsx("li", { children: "Choose \"Catch Hook\" as the trigger event" }), _jsx("li", { children: "Copy the webhook URL provided by Zapier" }), _jsx("li", { children: "Paste it in the field above" })] })] })] })] }) }), _jsx(TabsContent, { value: "documentation", className: "space-y-4 mt-6", children: _jsxs(Card, { className: "p-6", children: [_jsx("h3", { className: "text-lg font-medium mb-4", children: "How to Configure Your Zapier Webhooks" }), _jsxs("div", { className: "space-y-4", children: [_jsx("p", { children: "Allora AI sends webhook events to Zapier for the following events:" }), _jsxs("ul", { className: "list-disc pl-6 space-y-2", children: [_jsxs("li", { children: [_jsx("strong", { children: "Campaign Launched" }), " - Fired when a new marketing campaign is launched"] }), _jsxs("li", { children: [_jsx("strong", { children: "Lead Added" }), " - Fired when a new lead is added to the system"] }), _jsxs("li", { children: [_jsx("strong", { children: "Strategy Approved" }), " - Fired when a business strategy is approved"] }), _jsxs("li", { children: [_jsx("strong", { children: "Lead Converted" }), " - Fired when a lead is converted to a customer"] }), _jsxs("li", { children: [_jsx("strong", { children: "Revenue Milestone" }), " - Fired when a revenue milestone is reached"] })] }), _jsx("p", { className: "mt-4", children: "To set up a Zapier webhook:" }), _jsxs("ol", { className: "list-decimal pl-6 space-y-2", children: [_jsx("li", { children: "Log in to your Zapier account and create a new Zap" }), _jsx("li", { children: "Select \"Webhook\" as the trigger app" }), _jsx("li", { children: "Choose \"Catch Hook\" as the trigger event" }), _jsx("li", { children: "Copy the webhook URL provided by Zapier" }), _jsx("li", { children: "Go to the \"Configure\" tab and paste the URL in the Zapier webhook field" }), _jsx("li", { children: "Set up your desired action in Zapier (e.g., send an email, create a task)" }), _jsx("li", { children: "Test the webhook using the tests on the \"Webhook Tests\" tab" })] }), _jsx("p", { className: "mt-4", children: "For company-specific configuration, please contact your account administrator." })] })] }) })] })] })] }));
}
