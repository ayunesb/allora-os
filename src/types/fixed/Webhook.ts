
export type WebhookType = "zapier" | "custom" | "stripe" | "slack" | "github" | "notion";
export type WebhookStatus = "pending" | "success" | "failed";

export interface WebhookEvent {
  id: string;
  webhook_id: string;
  event_type: string;
  webhookType: WebhookType;
  status: WebhookStatus;
  payload: Record<string, any>;
  created_at: string;
  timestamp?: string;
  duration?: number;
  response?: any;
  responseCode?: number;
  targetUrl?: string;
  source?: string;
  url?: string;
  type?: string;
  // Add back these fields which are referenced in components
  eventType?: string;
  webhook_type?: WebhookType;
}
