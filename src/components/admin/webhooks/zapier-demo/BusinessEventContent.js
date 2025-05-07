import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
const BusinessEventContent = ({ webhookUrl, onTrigger, isLoading, isTriggering, }) => {
    const [selectedEvent, setSelectedEvent] = useState("campaign_created");
    const getEventPayload = (eventType) => {
        const basePayload = {
            id: `test-${Date.now().toString(36)}`,
            timestamp: new Date().toISOString(),
            tenant_id: "demo-tenant",
        };
        switch (eventType) {
            case "campaign_created":
                return Object.assign(Object.assign({}, basePayload), { campaign: {
                        name: "Test Campaign",
                        budget: 5000,
                        start_date: new Date().toISOString(),
                    } });
            case "strategy_approved":
                return Object.assign(Object.assign({}, basePayload), { strategy: {
                        id: `strategy-${Date.now().toString(36)}`,
                        title: "Market Expansion Strategy",
                        approved_by: "CEO",
                    } });
            case "lead_converted":
                return Object.assign(Object.assign({}, basePayload), { lead: {
                        email: "test@example.com",
                        name: "John Doe",
                        converted_at: new Date().toISOString(),
                    }, deal_value: 2500 });
            case "revenue_milestone":
                return Object.assign(Object.assign({}, basePayload), { milestone: "1M ARR", previous_value: 950000, current_value: 1000000 });
            case "user_onboarded":
                return Object.assign(Object.assign({}, basePayload), { user: {
                        email: "new-user@example.com",
                        name: "Jane Smith",
                        completed_steps: ["profile", "company", "goals"],
                    } });
            default:
                return basePayload;
        }
    };
    const handleTrigger = () => {
        const payload = getEventPayload(selectedEvent);
        onTrigger(selectedEvent, payload);
    };
    return (_jsxs("div", { className: "space-y-4", children: [_jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Send test business events to your Zapier webhook. This will help you test specific event handling in your Zaps." }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "event-type", children: "Event Type" }), _jsxs(Select, { value: selectedEvent, onValueChange: (value) => setSelectedEvent(value), children: [_jsx(SelectTrigger, { id: "event-type", children: _jsx(SelectValue, { placeholder: "Select an event type" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "campaign_created", children: "Campaign Created" }), _jsx(SelectItem, { value: "strategy_approved", children: "Strategy Approved" }), _jsx(SelectItem, { value: "lead_converted", children: "Lead Converted" }), _jsx(SelectItem, { value: "revenue_milestone", children: "Revenue Milestone" }), _jsx(SelectItem, { value: "user_onboarded", children: "User Onboarded" }), _jsx(SelectItem, { value: "test_webhook", children: "Test Webhook" })] })] })] }), _jsx(Button, { onClick: handleTrigger, disabled: !webhookUrl || isLoading || !!isTriggering, className: "w-full", children: isLoading || !!isTriggering ? "Sending..." : "Send Event" }), _jsxs("div", { className: "bg-muted p-4 rounded-md mt-4", children: [_jsx("h4", { className: "font-medium text-sm mb-2", children: "Event Payload" }), _jsx("pre", { className: "text-xs overflow-auto bg-background p-2 rounded", children: JSON.stringify(getEventPayload(selectedEvent), null, 2) })] })] }));
};
export default BusinessEventContent;
