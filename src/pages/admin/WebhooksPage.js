import React from "react";
import WebhookHistoryContent from '@/components/admin/webhooks/history/WebhookHistoryContent';
// Mock data for the webhook events with complete type structure
const mockEvents = [
    {
        id: "1",
        webhook_id: "wh_1",
        event_type: "payment.success",
        targetUrl: "https://api.example.com/webhooks/stripe",
        source: "stripe.com",
        status: "success",
        created_at: new Date().toISOString(),
        payload: { data: "Sample payload" },
        response: { status: "200 OK" },
        webhookType: "stripe",
        webhook_type: "stripe",
        timestamp: new Date().toISOString()
    },
    {
        id: "2",
        webhook_id: "wh_2",
        event_type: "lead.created",
        targetUrl: "https://hooks.zapier.com/123/abc",
        source: "zapier.com",
        status: "success",
        created_at: new Date().toISOString(),
        payload: { data: "Sample payload" },
        response: { status: "200 OK" },
        webhookType: "zapier",
        webhook_type: "zapier",
        timestamp: new Date().toISOString()
    },
    {
        id: "3",
        webhook_id: "wh_3",
        event_type: "push",
        targetUrl: "https://api.github.com/webhooks",
        source: "github.com",
        status: "failed",
        created_at: new Date().toISOString(),
        payload: { data: "Sample payload" },
        response: { status: "500 Error", error: "Server error" },
        webhookType: "github",
        webhook_type: "github",
        timestamp: new Date().toISOString()
    }
];
export default function WebhooksPage() {
    return (<div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Webhook Management</h1>
        <p className="text-muted-foreground">
          Configure and test webhooks for integrations
        </p>
      </div>
      
      <WebhookHistoryContent events={mockEvents}/>
    </div>);
}
