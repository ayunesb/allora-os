import React from "react";
import WebhookHistoryContent from '@/components/admin/webhooks/history/WebhookHistoryContent';
import { WebhookEvent } from "@/types/fixed/Webhook";

// Keeping the content minimal as we just need to fix the import 
// and correctly type the webhook events

export default function WebhooksPage() {
  // Just enough to fix compilation errors
  const mockEvents: WebhookEvent[] = [
    {
      id: "1",
      webhook_type: "stripe",
      event_type: "payment.success",
      targetUrl: "https://api.example.com/webhooks/stripe",
      source: "stripe.com",
      status: "success",
      created_at: new Date().toISOString(),
      payload: { data: "Sample payload" },
      response: { status: "200 OK" },
    },
    {
      id: "2",
      webhook_type: "zapier",
      event_type: "lead.created",
      targetUrl: "https://hooks.zapier.com/123/abc",
      source: "zapier.com",
      status: "success",
      created_at: new Date().toISOString(),
      payload: { data: "Sample payload" },
      response: { status: "200 OK" }, 
    },
    {
      id: "3", 
      webhook_type: "github",
      event_type: "push",
      targetUrl: "https://api.github.com/webhooks",
      source: "github.com",
      status: "failed",
      created_at: new Date().toISOString(),
      payload: { data: "Sample payload" },
      response: { status: "500 Error", error: "Server error" },
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Webhook Management</h1>
        <p className="text-muted-foreground">
          Configure and test webhooks for integrations
        </p>
      </div>
      
      <WebhookHistoryContent events={mockEvents} />
    </div>
  );
}
