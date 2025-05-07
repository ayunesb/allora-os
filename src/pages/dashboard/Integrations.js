var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, FileText, Link2, MoreHorizontal, Plug, RefreshCw, Shield, Wrench, } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { DocumentGenerator } from "@/components/integrations/DocumentGenerator";
export default function Integrations() {
    const [activeTab, setActiveTab] = useState("crm");
    const [webhookUrl, setWebhookUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const handleSaveWebhook = () => {
        setIsLoading(true);
        setTimeout(() => {
            toast.success("Webhook URL saved successfully");
            setIsLoading(false);
        }, 1000);
    };
    const handleConnect = (platform) => {
        toast.success(`Initiating connection to ${platform}...`);
        // In a real implementation, this would redirect to the platform's OAuth flow
    };
    const handleZapierTrigger = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        if (!webhookUrl) {
            toast.error("Please enter your Zapier webhook URL");
            return;
        }
        setIsLoading(true);
        console.log("Triggering Zapier webhook:", webhookUrl);
        try {
            yield fetch(webhookUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                mode: "no-cors", // Handle CORS
                body: JSON.stringify({
                    timestamp: new Date().toISOString(),
                    triggered_from: window.location.origin,
                    event_type: "integration_test",
                }),
            });
            toast.success("Request sent to Zapier. Check your Zap's history to confirm it was triggered.");
        }
        catch (error) {
            console.error("Error triggering webhook:", error);
            toast.error("Failed to trigger the Zapier webhook. Please check the URL and try again.");
        }
        finally {
            setIsLoading(false);
        }
    });
    return (_jsxs("div", { className: "animate-fadeIn space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold tracking-tight", children: "Integrations" }), _jsx("p", { className: "text-muted-foreground", children: "Connect Allora AI with your favorite platforms and services" })] }), _jsxs(Button, { variant: "outline", className: "gap-1", children: [_jsx(RefreshCw, { className: "h-4 w-4" }), "Refresh Connections"] })] }), _jsxs(Tabs, { defaultValue: "crm", value: activeTab, onValueChange: setActiveTab, className: "w-full", children: [_jsxs(TabsList, { className: "grid grid-cols-4 mb-6", children: [_jsx(TabsTrigger, { value: "crm", children: "CRM Systems" }), _jsx(TabsTrigger, { value: "marketing", children: "Marketing Platforms" }), _jsx(TabsTrigger, { value: "documents", children: "Document Generation" }), _jsx(TabsTrigger, { value: "webhooks", children: "Webhooks & APIs" })] }), _jsxs(TabsContent, { value: "crm", className: "space-y-6", children: [_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [
                                    {
                                        name: "Salesforce",
                                        status: "connected",
                                        icon: _jsx(Shield, { className: "h-8 w-8 text-blue-600" }),
                                    },
                                    {
                                        name: "HubSpot",
                                        status: "not-connected",
                                        icon: _jsx(Shield, { className: "h-8 w-8 text-orange-500" }),
                                    },
                                    {
                                        name: "Zoho CRM",
                                        status: "not-connected",
                                        icon: _jsx(Shield, { className: "h-8 w-8 text-green-500" }),
                                    },
                                    {
                                        name: "Pipedrive",
                                        status: "not-connected",
                                        icon: _jsx(Shield, { className: "h-8 w-8 text-green-600" }),
                                    },
                                    {
                                        name: "Microsoft Dynamics",
                                        status: "not-connected",
                                        icon: _jsx(Shield, { className: "h-8 w-8 text-blue-500" }),
                                    },
                                ].map((crm) => (_jsxs(Card, { className: "relative overflow-hidden", children: [_jsx("div", { className: "absolute top-0 right-0 p-3", children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8", children: _jsx(MoreHorizontal, { className: "h-4 w-4" }) }) }), _jsxs(DropdownMenuContent, { align: "end", children: [_jsx(DropdownMenuLabel, { children: "Options" }), _jsx(DropdownMenuSeparator, {}), _jsx(DropdownMenuItem, { children: "View Connection Details" }), _jsx(DropdownMenuItem, { children: "Sync Data" }), _jsx(DropdownMenuItem, { className: "text-destructive", children: "Disconnect" })] })] }) }), _jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center space-x-3", children: [crm.icon, _jsxs("div", { children: [_jsx(CardTitle, { className: "text-base", children: crm.name }), _jsx(CardDescription, { children: crm.status === "connected"
                                                                    ? "Connected & Syncing"
                                                                    : "Not Connected" })] })] }) }), _jsx(CardContent, { children: _jsx("div", { className: "mt-2", children: crm.status === "connected" ? (_jsxs("div", { className: "space-y-2", children: [_jsxs(Badge, { className: "bg-green-100 text-green-800 hover:bg-green-100", children: [_jsx(Check, { className: "mr-1 h-3 w-3" }), " Connected"] }), _jsx("p", { className: "text-xs text-muted-foreground mt-2", children: "Last synced: 27 minutes ago" }), _jsxs("div", { className: "flex mt-4 space-x-2", children: [_jsxs(Button, { size: "sm", variant: "outline", className: "text-xs", children: [_jsx(RefreshCw, { className: "mr-1 h-3 w-3" }), " Sync Now"] }), _jsx(Button, { size: "sm", variant: "outline", className: "text-xs", children: "Settings" })] })] })) : (_jsxs(Button, { onClick: () => handleConnect(crm.name), className: "w-full mt-2", children: [_jsx(Plug, { className: "mr-2 h-4 w-4" }), "Connect"] })) }) })] }, crm.name))) }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "CRM Integration Benefits" }), _jsx(CardDescription, { children: "Connecting your CRM system enables these powerful features" })] }), _jsx(CardContent, { children: _jsxs("ul", { className: "grid gap-2 md:grid-cols-2", children: [_jsxs("li", { className: "flex items-start", children: [_jsx(Check, { className: "mr-2 h-5 w-5 text-green-500 shrink-0" }), _jsx("span", { children: "Automatic lead import and synchronization" })] }), _jsxs("li", { className: "flex items-start", children: [_jsx(Check, { className: "mr-2 h-5 w-5 text-green-500 shrink-0" }), _jsx("span", { children: "AI-enhanced lead scoring based on CRM data" })] }), _jsxs("li", { className: "flex items-start", children: [_jsx(Check, { className: "mr-2 h-5 w-5 text-green-500 shrink-0" }), _jsx("span", { children: "Campaign performance tracking in CRM" })] }), _jsxs("li", { className: "flex items-start", children: [_jsx(Check, { className: "mr-2 h-5 w-5 text-green-500 shrink-0" }), _jsx("span", { children: "Smarter insights using historical CRM data" })] })] }) })] })] }), _jsxs(TabsContent, { value: "marketing", className: "space-y-6", children: [_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [
                                    {
                                        name: "Google Ads",
                                        status: "connected",
                                        icon: _jsx(Shield, { className: "h-8 w-8 text-blue-600" }),
                                    },
                                    {
                                        name: "Meta Ads",
                                        status: "not-connected",
                                        icon: _jsx(Shield, { className: "h-8 w-8 text-blue-500" }),
                                    },
                                    {
                                        name: "LinkedIn Ads",
                                        status: "not-connected",
                                        icon: _jsx(Shield, { className: "h-8 w-8 text-blue-700" }),
                                    },
                                    {
                                        name: "TikTok Ads",
                                        status: "not-connected",
                                        icon: _jsx(Shield, { className: "h-8 w-8 text-black" }),
                                    },
                                    {
                                        name: "Mailchimp",
                                        status: "connected",
                                        icon: _jsx(Shield, { className: "h-8 w-8 text-yellow-500" }),
                                    },
                                ].map((platform) => (_jsxs(Card, { className: "relative overflow-hidden", children: [_jsx("div", { className: "absolute top-0 right-0 p-3", children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8", children: _jsx(MoreHorizontal, { className: "h-4 w-4" }) }) }), _jsxs(DropdownMenuContent, { align: "end", children: [_jsx(DropdownMenuLabel, { children: "Options" }), _jsx(DropdownMenuSeparator, {}), _jsx(DropdownMenuItem, { children: "View Connection Details" }), _jsx(DropdownMenuItem, { children: "Sync Data" }), _jsx(DropdownMenuItem, { className: "text-destructive", children: "Disconnect" })] })] }) }), _jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center space-x-3", children: [platform.icon, _jsxs("div", { children: [_jsx(CardTitle, { className: "text-base", children: platform.name }), _jsx(CardDescription, { children: platform.status === "connected"
                                                                    ? "Connected & Active"
                                                                    : "Not Connected" })] })] }) }), _jsx(CardContent, { children: _jsx("div", { className: "mt-2", children: platform.status === "connected" ? (_jsxs("div", { className: "space-y-2", children: [_jsxs(Badge, { className: "bg-green-100 text-green-800 hover:bg-green-100", children: [_jsx(Check, { className: "mr-1 h-3 w-3" }), " Connected"] }), _jsx("p", { className: "text-xs text-muted-foreground mt-2", children: "Last synced: 2 hours ago" }), _jsxs("div", { className: "flex mt-4 space-x-2", children: [_jsxs(Button, { size: "sm", variant: "outline", className: "text-xs", children: [_jsx(RefreshCw, { className: "mr-1 h-3 w-3" }), " Sync Now"] }), _jsx(Button, { size: "sm", variant: "outline", className: "text-xs", children: "Settings" })] })] })) : (_jsxs(Button, { onClick: () => handleConnect(platform.name), className: "w-full mt-2", children: [_jsx(Plug, { className: "mr-2 h-4 w-4" }), "Connect"] })) }) })] }, platform.name))) }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Marketing Platform Benefits" }), _jsx(CardDescription, { children: "Connect your marketing platforms to enhance your campaigns" })] }), _jsx(CardContent, { children: _jsxs("ul", { className: "grid gap-2 md:grid-cols-2", children: [_jsxs("li", { className: "flex items-start", children: [_jsx(Check, { className: "mr-2 h-5 w-5 text-green-500 shrink-0" }), _jsx("span", { children: "AI-optimized ad copy and creative suggestions" })] }), _jsxs("li", { className: "flex items-start", children: [_jsx(Check, { className: "mr-2 h-5 w-5 text-green-500 shrink-0" }), _jsx("span", { children: "Unified campaign performance analytics" })] }), _jsxs("li", { className: "flex items-start", children: [_jsx(Check, { className: "mr-2 h-5 w-5 text-green-500 shrink-0" }), _jsx("span", { children: "Cross-platform audience optimization" })] }), _jsxs("li", { className: "flex items-start", children: [_jsx(Check, { className: "mr-2 h-5 w-5 text-green-500 shrink-0" }), _jsx("span", { children: "Campaign budget recommendations" })] })] }) })] })] }), _jsx(TabsContent, { value: "documents", className: "space-y-6", children: _jsx(DocumentGenerator, {}) }), _jsx(TabsContent, { value: "webhooks", className: "space-y-6", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center", children: [_jsx(Wrench, { className: "mr-2 h-5 w-5" }), "Zapier Integration"] }), _jsx(CardDescription, { children: "Connect Allora AI to 3,000+ apps with Zapier" })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("form", { onSubmit: handleZapierTrigger, className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "webhook-url", children: "Zapier Webhook URL" }), _jsx(Input, { id: "webhook-url", placeholder: "https://hooks.zapier.com/hooks/catch/...", value: webhookUrl, onChange: (e) => setWebhookUrl(e.target.value) }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Create a \"Webhook\" trigger in Zapier and paste the URL here" })] }), _jsxs("div", { className: "flex space-x-2", children: [_jsx(Button, { type: "submit", disabled: isLoading || !webhookUrl, children: isLoading ? "Sending..." : "Test Webhook" }), _jsx(Button, { type: "button", variant: "outline", onClick: handleSaveWebhook, disabled: isLoading, children: "Save" })] })] }), _jsxs("div", { className: "pt-4", children: [_jsx("h4", { className: "text-sm font-medium mb-2", children: "Popular Zapier use cases:" }), _jsxs("ul", { className: "text-sm space-y-1", children: [_jsxs("li", { className: "flex items-center", children: [_jsx(Check, { className: "mr-2 h-4 w-4 text-green-500" }), "Send new Allora AI strategies to Slack"] }), _jsxs("li", { className: "flex items-center", children: [_jsx(Check, { className: "mr-2 h-4 w-4 text-green-500" }), "Create tasks in Asana from AI recommendations"] }), _jsxs("li", { className: "flex items-center", children: [_jsx(Check, { className: "mr-2 h-4 w-4 text-green-500" }), "Add new leads to your email marketing platform"] })] })] })] })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center", children: [_jsx(Link2, { className: "mr-2 h-5 w-5" }), "API Access"] }), _jsx(CardDescription, { children: "Access Allora AI via our RESTful API" })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "api-key", children: "Your API Key" }), _jsxs("div", { className: "flex", children: [_jsx(Input, { id: "api-key", type: "password", value: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", readOnly: true, className: "rounded-r-none" }), _jsx(Button, { className: "rounded-l-none", variant: "secondary", children: "Show" })] }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Use this API key to authenticate requests to the Allora AI API" })] }), _jsxs("div", { className: "pt-2 space-y-2", children: [_jsx("h4", { className: "text-sm font-medium", children: "API Documentation" }), _jsxs(Button, { variant: "outline", className: "w-full text-sm", children: [_jsx(FileText, { className: "mr-2 h-4 w-4" }), "View API Documentation"] })] }), _jsxs("div", { className: "pt-2", children: [_jsx("h4", { className: "text-sm font-medium mb-2", children: "Available API Endpoints:" }), _jsxs("ul", { className: "text-sm space-y-1", children: [_jsx("li", { children: "\u2022 /api/strategies - Get AI business strategies" }), _jsx("li", { children: "\u2022 /api/leads - Manage your leads" }), _jsx("li", { children: "\u2022 /api/analytics - Access business analytics" }), _jsx("li", { children: "\u2022 /api/recommendations - Get AI recommendations" })] })] })] })] })] }) })] })] }));
}
