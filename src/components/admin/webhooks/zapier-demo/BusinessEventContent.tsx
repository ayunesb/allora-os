import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const BusinessEventContent = ({
  webhookUrl,
  onTrigger,
  isLoading,
  isTriggering,
}) => {
  const [selectedEvent, setSelectedEvent] = useState("campaign_created");
  const getEventPayload = (eventType) => {
    const basePayload = {
      id: `test-${Date.now().toString(36)}`,
      timestamp: new Date().toISOString(),
      tenant_id: "demo-tenant",
    };
    switch (eventType) {
      case "campaign_created":
        return {
          ...basePayload,
          campaign: {
            name: "Test Campaign",
            budget: 5000,
            start_date: new Date().toISOString(),
          },
        };
      case "strategy_approved":
        return {
          ...basePayload,
          strategy: {
            id: `strategy-${Date.now().toString(36)}`,
            title: "Market Expansion Strategy",
            approved_by: "CEO",
          },
        };
      case "lead_converted":
        return {
          ...basePayload,
          lead: {
            email: "test@example.com",
            name: "John Doe",
            converted_at: new Date().toISOString(),
          },
          deal_value: 2500,
        };
      case "revenue_milestone":
        return {
          ...basePayload,
          milestone: "1M ARR",
          previous_value: 950000,
          current_value: 1000000,
        };
      case "user_onboarded":
        return {
          ...basePayload,
          user: {
            email: "new-user@example.com",
            name: "Jane Smith",
            completed_steps: ["profile", "company", "goals"],
          },
        };
      default:
        return basePayload;
    }
  };
  const handleTrigger = () => {
    const payload = getEventPayload(selectedEvent);
    onTrigger(selectedEvent, payload);
  };
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-4">
        Send test business events to your Zapier webhook. This will help you
        test specific event handling in your Zaps.
      </p>

      <div className="space-y-2">
        <Label htmlFor="event-type">Event Type</Label>
        <Select
          value={selectedEvent}
          onValueChange={(value) => setSelectedEvent(value)}
        >
          <SelectTrigger id="event-type">
            <SelectValue placeholder="Select an event type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="campaign_created">Campaign Created</SelectItem>
            <SelectItem value="strategy_approved">Strategy Approved</SelectItem>
            <SelectItem value="lead_converted">Lead Converted</SelectItem>
            <SelectItem value="revenue_milestone">Revenue Milestone</SelectItem>
            <SelectItem value="user_onboarded">User Onboarded</SelectItem>
            <SelectItem value="test_webhook">Test Webhook</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        onClick={handleTrigger}
        disabled={!webhookUrl || isLoading || !!isTriggering}
        className="w-full"
      >
        {isLoading || !!isTriggering ? "Sending..." : "Send Event"}
      </Button>

      <div className="bg-muted p-4 rounded-md mt-4">
        <h4 className="font-medium text-sm mb-2">Event Payload</h4>
        <pre className="text-xs overflow-auto bg-background p-2 rounded">
          {JSON.stringify(getEventPayload(selectedEvent), null, 2)}
        </pre>
      </div>
    </div>
  );
};
export default BusinessEventContent;
