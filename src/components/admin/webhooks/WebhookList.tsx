import React from "react";
import WebhookCard from "./WebhookCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
export default function WebhookList({
  webhooks,
  isLoading,
  onAddWebhook,
  onEditWebhook,
  onDeleteWebhook,
  onTestWebhook,
}) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Webhooks</h2>
          <Button disabled>
            <Plus className="h-4 w-4 mr-2" />
            Add Webhook
          </Button>
        </div>
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-[180px] w-full" />
        ))}
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Webhooks</h2>
        <Button onClick={onAddWebhook}>
          <Plus className="h-4 w-4 mr-2" />
          Add Webhook
        </Button>
      </div>

      {webhooks.length === 0 ? (
        <div className="text-center py-12 border rounded-lg">
          <p className="text-muted-foreground">No webhooks configured</p>
          <Button onClick={onAddWebhook} variant="link" className="mt-2">
            Add your first webhook
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {webhooks.map((webhook) => (
            <WebhookCard
              key={webhook.id}
              webhook={webhook}
              onEdit={onEditWebhook}
              onDelete={onDeleteWebhook}
              onTest={onTestWebhook}
            />
          ))}
        </div>
      )}
    </div>
  );
}
