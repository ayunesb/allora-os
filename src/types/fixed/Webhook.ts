
export type WebhookType = 'zapier' | 'custom' | 'stripe' | 'github' | 'slack' | 'notion';

export interface WebhookEvent {
  id: string;
  webhook_id: string;
  eventType: string;
  event_type: string;
  status: 'success' | 'failed' | 'pending';
  created_at: string;
  payload: any;
  response?: any;
  targetUrl: string;
  url?: string;
  webhookType: WebhookType;
  webhook_type?: WebhookType;
  timestamp: string;
}
