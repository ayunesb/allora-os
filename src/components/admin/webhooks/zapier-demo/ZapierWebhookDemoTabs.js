import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManualTriggerContent from "./ManualTriggerContent";
import BusinessEventContent from "./BusinessEventContent";
import { useBreakpoint } from "@/hooks/use-mobile";
export function ZapierWebhookDemoTabs({ webhookUrl, isTriggering, triggerSample, triggerBusinessSample, }) {
    const [activeTab, setActiveTab] = React.useState("business");
    const breakpoint = useBreakpoint();
    const isMobileView = ["xs", "mobile"].includes(breakpoint);
    return (_jsxs(Tabs, { defaultValue: "business", value: activeTab, onValueChange: setActiveTab, children: [_jsxs(TabsList, { className: `mb-4 ${isMobileView ? "w-full overflow-x-auto scrollbar-thin" : ""}`, children: [_jsx(TabsTrigger, { value: "business", className: isMobileView ? "flex-1 text-sm px-3 whitespace-nowrap" : "", children: "Business Events" }), _jsx(TabsTrigger, { value: "manual", className: isMobileView ? "flex-1 text-sm px-3 whitespace-nowrap" : "", children: "Manual Triggers" })] }), _jsx(TabsContent, { value: "business", className: "mt-0", children: _jsx(BusinessEventContent, { webhookUrl: webhookUrl, onTrigger: triggerBusinessSample, isLoading: false, isTriggering: isTriggering }) }), _jsx(TabsContent, { value: "manual", className: "mt-0", children: _jsx(ManualTriggerContent, { webhookUrl: webhookUrl, onTrigger: () => triggerSample("manual", { test: true }), isLoading: false, isTriggering: isTriggering }) })] }));
}
export default ZapierWebhookDemoTabs;
