
import React from "react";
import { WebhooksTab } from "@/components/admin";
import { Helmet } from "react-helmet-async";

export default function WebhookManagement() {
  return (
    <>
      <Helmet>
        <title>Webhook Management | Allora AI</title>
      </Helmet>
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold">Webhook Management</h1>
          <p className="text-muted-foreground mb-4">
            Configure and manage webhooks to integrate with external services
          </p>
        </div>
        
        <WebhooksTab />
      </div>
    </>
  );
}
