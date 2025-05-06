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
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useZapier } from "@/hooks/useZapier";
import ManualTriggerContent from "./zapier-demo/ManualTriggerContent";
import BusinessEventContent from "./zapier-demo/BusinessEventContent";
const ZapierWebhookDemo = ({ webhookUrl }) => {
    const [activeTab, setActiveTab] = useState("manual");
    const { isLoading, triggerBusinessEvent } = useZapier();
    const handleManualTrigger = () => __awaiter(void 0, void 0, void 0, function* () {
        if (!webhookUrl)
            return;
        yield triggerBusinessEvent(webhookUrl, "test_webhook", {
            message: "This is a manual trigger test",
            timestamp: new Date().toISOString(),
            triggered_by: "manual-demo",
        });
    });
    const handleBusinessEventTrigger = (eventType, payload) => __awaiter(void 0, void 0, void 0, function* () {
        if (!webhookUrl)
            return;
        yield triggerBusinessEvent(webhookUrl, eventType, payload);
    });
    return (_jsxs(Card, { className: "p-6", children: [_jsx("h3", { className: "text-lg font-medium mb-4", children: "Test Zapier Integration" }), _jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-2", children: [_jsx(TabsTrigger, { value: "manual", children: "Simple Trigger" }), _jsx(TabsTrigger, { value: "business", children: "Business Events" })] }), _jsx(TabsContent, { value: "manual", className: "mt-4", children: _jsx(ManualTriggerContent, { webhookUrl: webhookUrl, onTrigger: handleManualTrigger, isLoading: isLoading }) }), _jsx(TabsContent, { value: "business", className: "mt-4", children: _jsx(BusinessEventContent, { webhookUrl: webhookUrl, onTrigger: handleBusinessEventTrigger, isLoading: isLoading }) })] })] }));
};
export default ZapierWebhookDemo;
