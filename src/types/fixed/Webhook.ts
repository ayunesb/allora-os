
export type WebhookType = "zapier" | "custom" | "stripe" | "slack" | "github";
export type WebhookStatus = "pending" | "success" | "failed";

export interface WebhookEvent {
  id: string;
  webhook_id: string;
  event_type: string;
  webhookType: WebhookType;
  status: WebhookStatus;
  payload: Record<string, any>;
  created_at: string;
  duration?: number;
  responseCode?: number;
}
