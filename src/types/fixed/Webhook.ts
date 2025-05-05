export interface Webhook {
  id: string;
  url: string;
  event: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WebhookEvent {
  id: string;
  eventType: string;
  webhook_id: string;
  status: string;
  created_at: string;
  payload: Record<string, any>;
  targetUrl: string;
  webhookType?: string;
  timestamp?: string;
  duration?: number;
  errorMessage?: string;
  responseCode?: number;
  resource: string;
  response: any;
}

export type WebhookType = 'created' | 'updated' | 'deleted';

export {};