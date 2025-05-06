import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AIContentGenerator } from "@/components/content-generation/AIContentGenerator";
import { MarketingPlatformIntegrations } from "@/components/integrations/MarketingPlatformIntegrations";
import { CustomerJourneyMapper } from "@/components/customer-journey/CustomerJourneyMapper";
export default function MarketingTools() {
    const [activeTab, setActiveTab] = useState("content-generation");
    return (_jsxs("div", { className: "container mx-auto px-4 py-8", children: [_jsx("h1", { className: "text-3xl font-bold mb-2", children: "Marketing Tools" }), _jsx("p", { className: "text-muted-foreground mb-6", children: "Advanced tools to enhance your marketing capabilities" }), _jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, className: "space-y-4", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-3", children: [_jsx(TabsTrigger, { value: "content-generation", children: "Content Generation" }), _jsx(TabsTrigger, { value: "platform-integrations", children: "Platform Integrations" }), _jsx(TabsTrigger, { value: "customer-journey", children: "Customer Journey" })] }), _jsx(TabsContent, { value: "content-generation", className: "space-y-4", children: _jsx(AIContentGenerator, {}) }), _jsx(TabsContent, { value: "platform-integrations", className: "space-y-4", children: _jsx(MarketingPlatformIntegrations, {}) }), _jsx(TabsContent, { value: "customer-journey", className: "space-y-4", children: _jsx(CustomerJourneyMapper, {}) })] })] }));
}
