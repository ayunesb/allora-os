import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowRight, Check, Lock, AlertCircle, ExternalLink, Loader2, } from "lucide-react";
import { toast } from "sonner";
const PLATFORMS = [
    {
        id: "facebook",
        name: "Facebook",
        description: "Connect your Facebook Ad account to manage ads and track performance.",
        status: "connected",
        logo: "/lovable-uploads/9f3a977b-9b9d-47db-97ee-29ffab9ac662.png",
        category: "social",
    },
    {
        id: "instagram",
        name: "Instagram",
        description: "Connect Instagram to schedule posts and analyze engagement.",
        status: "connected",
        logo: "/lovable-uploads/9f3a977b-9b9d-47db-97ee-29ffab9ac662.png",
        category: "social",
    },
    {
        id: "google_ads",
        name: "Google Ads",
        description: "Connect your Google Ads account to create and manage ad campaigns.",
        status: "not_connected",
        logo: "/lovable-uploads/9f3a977b-9b9d-47db-97ee-29ffab9ac662.png",
        category: "advertising",
    },
    {
        id: "linkedin",
        name: "LinkedIn",
        description: "Connect LinkedIn to target professionals and business audiences.",
        status: "not_connected",
        logo: "/lovable-uploads/9f3a977b-9b9d-47db-97ee-29ffab9ac662.png",
        category: "social",
    },
    {
        id: "mailchimp",
        name: "Mailchimp",
        description: "Integrate email campaigns with your marketing dashboard.",
        status: "premium",
        logo: "/lovable-uploads/9f3a977b-9b9d-47db-97ee-29ffab9ac662.png",
        category: "email",
    },
    {
        id: "tiktok",
        name: "TikTok",
        description: "Connect to TikTok to reach younger demographics with video content.",
        status: "not_connected",
        logo: "/lovable-uploads/9f3a977b-9b9d-47db-97ee-29ffab9ac662.png",
        category: "social",
    },
    {
        id: "hubspot",
        name: "HubSpot",
        description: "Sync contacts, campaigns and analytics with your CRM.",
        status: "premium",
        logo: "/lovable-uploads/9f3a977b-9b9d-47db-97ee-29ffab9ac662.png",
        category: "crm",
    },
    {
        id: "pinterest",
        name: "Pinterest",
        description: "Connect Pinterest for visual discovery campaigns.",
        status: "coming_soon",
        logo: "/lovable-uploads/9f3a977b-9b9d-47db-97ee-29ffab9ac662.png",
        category: "social",
    },
    {
        id: "twitter",
        name: "Twitter",
        description: "Connect your Twitter account to schedule and analyze posts.",
        status: "coming_soon",
        logo: "/lovable-uploads/9f3a977b-9b9d-47db-97ee-29ffab9ac662.png",
        category: "social",
    },
    {
        id: "salesforce",
        name: "Salesforce",
        description: "Enterprise CRM integration for advanced lead tracking.",
        status: "premium",
        logo: "/lovable-uploads/9f3a977b-9b9d-47db-97ee-29ffab9ac662.png",
        category: "crm",
    },
    {
        id: "google_analytics",
        name: "Google Analytics",
        description: "Import website analytics for comprehensive campaign reporting.",
        status: "not_connected",
        logo: "/lovable-uploads/9f3a977b-9b9d-47db-97ee-29ffab9ac662.png",
        category: "analytics",
    },
    {
        id: "zapier",
        name: "Zapier",
        description: "Connect with thousands of apps through Zapier workflows.",
        status: "not_connected",
        logo: "/lovable-uploads/9f3a977b-9b9d-47db-97ee-29ffab9ac662.png",
        category: "other",
    },
];
export function MarketingPlatformIntegrations() {
    const [activeCategory, setActiveCategory] = useState("all");
    const [connectingPlatform, setConnectingPlatform] = useState(null);
    const categories = [
        { id: "all", label: "All Integrations" },
        { id: "social", label: "Social Media" },
        { id: "advertising", label: "Advertising" },
        { id: "email", label: "Email Marketing" },
        { id: "crm", label: "CRM & Sales" },
        { id: "analytics", label: "Analytics" },
        { id: "other", label: "Other" },
    ];
    const filteredPlatforms = activeCategory === "all"
        ? PLATFORMS
        : PLATFORMS.filter((platform) => platform.category === activeCategory);
    const handleConnect = (platform) => {
        if (platform.status === "premium") {
            toast.info("This integration requires a premium subscription");
            return;
        }
        if (platform.status === "coming_soon") {
            toast.info("This integration is coming soon");
            return;
        }
        if (platform.status === "connected") {
            toast.info(`${platform.name} is already connected`);
            return;
        }
        setConnectingPlatform(platform.id);
        // Simulate API call
        setTimeout(() => {
            toast.success(`Connected to ${platform.name} successfully!`);
            setConnectingPlatform(null);
        }, 2000);
    };
    const handleDisconnect = (platform) => {
        if (platform.status !== "connected")
            return;
        setConnectingPlatform(platform.id);
        // Simulate API call
        setTimeout(() => {
            toast.success(`Disconnected from ${platform.name}`);
            setConnectingPlatform(null);
        }, 1500);
    };
    return (_jsxs(Card, { className: "w-full", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Marketing Platform Integrations" }), _jsx(CardDescription, { children: "Connect your marketing platforms to unify your campaigns and analytics" })] }), _jsxs(CardContent, { children: [_jsx("div", { className: "flex gap-2 flex-wrap mb-6", children: categories.map((category) => (_jsx(Button, { variant: activeCategory === category.id ? "default" : "outline", size: "sm", onClick: () => setActiveCategory(category.id), children: category.label }, category.id))) }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: filteredPlatforms.map((platform) => (_jsxs(Card, { className: "overflow-hidden", children: [_jsx(CardHeader, { className: "p-4 pb-0 flex flex-row items-center justify-between", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "bg-muted p-1 rounded-md w-10 h-10 flex items-center justify-center", children: _jsx("img", { src: "/lovable-uploads/9f3a977b-9b9d-47db-97ee-29ffab9ac662.png", alt: platform.name, className: "w-8 h-8 object-contain" }) }), _jsx("div", { children: _jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [platform.name, platform.status === "connected" && (_jsx(Badge, { variant: "outline", className: "bg-green-500/10 text-green-600 text-xs", children: "Connected" })), platform.status === "premium" && (_jsx(Badge, { variant: "outline", className: "bg-amber-500/10 text-amber-600 text-xs", children: "Premium" })), platform.status === "coming_soon" && (_jsx(Badge, { variant: "outline", className: "bg-blue-500/10 text-blue-600 text-xs", children: "Coming Soon" }))] }) })] }) }), _jsx(CardContent, { className: "p-4", children: _jsx("p", { className: "text-sm text-muted-foreground", children: platform.description }) }), _jsx(CardFooter, { className: "p-4 pt-0 gap-2", children: platform.status === "connected" ? (_jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", size: "sm", className: "w-full", onClick: () => handleDisconnect(platform), disabled: connectingPlatform === platform.id, children: [connectingPlatform === platform.id ? (_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" })) : (_jsx(Check, { className: "mr-2 h-4 w-4 text-green-500" })), "Manage Connection"] }) }), _jsx(TooltipContent, { children: _jsx("p", { children: "Configure settings or disconnect" }) })] }) })) : platform.status === "premium" ? (_jsxs(Button, { variant: "outline", size: "sm", className: "w-full", children: [_jsx(Lock, { className: "mr-2 h-4 w-4" }), "Upgrade to Connect"] })) : platform.status === "coming_soon" ? (_jsxs(Button, { variant: "outline", size: "sm", className: "w-full", disabled: true, children: [_jsx(AlertCircle, { className: "mr-2 h-4 w-4" }), "Coming Soon"] })) : (_jsxs(Button, { variant: "default", size: "sm", className: "w-full", onClick: () => handleConnect(platform), disabled: connectingPlatform === platform.id, children: [connectingPlatform === platform.id ? (_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" })) : (_jsx(ArrowRight, { className: "mr-2 h-4 w-4" })), "Connect"] })) })] }, platform.id))) })] }), _jsx(CardFooter, { className: "border-t pt-6", children: _jsxs(Alert, { className: "bg-muted/50", children: [_jsx(AlertCircle, { className: "h-4 w-4" }), _jsx(AlertTitle, { children: "Need a different integration?" }), _jsx(AlertDescription, { children: _jsxs("p", { className: "text-sm text-muted-foreground", children: ["Can't find the marketing platform you're looking for?", _jsxs(Button, { variant: "link", size: "sm", className: "px-1.5", children: ["Request an integration", _jsx(ExternalLink, { className: "ml-1 h-3 w-3" })] })] }) })] }) })] }));
}
export default MarketingPlatformIntegrations;
