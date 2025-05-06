export interface Webhook {
  id: string;
  url: string;
  event: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WebhookEvent {
  id: string;
  webhook_id: string;
  eventType: string;
  status: string;
  created_at: string;
  payload: Record<string, any>;
  targetUrl: string;
  resource: string;
  response: any;
  webhookType?: string;
  timestamp?: string;
  duration?: number;
  errorMessage?: string;
  responseCode?: number;
}

export type WebhookStatus = 'pending' | 'active' | 'failed';
export type WebhookType = 'custom' | 'stripe' | 'github';

export default {}; // Ensures this file is treated as a module