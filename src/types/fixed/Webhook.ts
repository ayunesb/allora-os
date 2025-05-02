
export type WebhookType = "zapier" | "custom" | "stripe" | "slack" | "github" | "notion";
export type WebhookStatus = "pending" | "success" | "failed";

export interface WebhookEvent {
  id: string;
  webhook_id: string;
  event_type: string;
  eventType?: string;
  webhookType: WebhookType;
  status: WebhookStatus;
  payload: Record<string, any>;
  created_at: string;
  timestamp?: string;
  response?: any;
  responseCode?: number;
  targetUrl?: string;
  source?: string;
  url?: string;
  type?: string;
}
