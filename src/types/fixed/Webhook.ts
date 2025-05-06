export interface Webhook {
  id: string;
  url: string;
  event: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WebhookEvent {
  id: string;
  webhookId: string; // Changed from webhook_id to camelCase
  eventType: string;
  status: string;
  createdAt: string; // Changed from created_at to camelCase
  payload: Record<string, any>;
  targetUrl: string;
  resource: string;
  response: any;
  webhookType?: string;
  timestamp?: string;
  duration?: number;
  errorMessage?: string;
  responseCode?: number;
  type?: string;
  url: string;
}

export type WebhookStatus = 'active' | 'pending' | 'failed';
export type WebhookType = 'custom' | 'stripe' | 'github';

export type BusinessEventType = 'ORDER_CREATED' | 'USER_SIGNED_UP'; // example
export type BusinessEventPayload = { id: string; /* ...other properties... */ };
export type WebhookResult = { success: boolean; message?: string };

export type WebhookEvent = { id: string; type: string; payload: any };
export type BusinessEventPayload = any;
export type BusinessEventType = 'CREATED' | 'UPDATED' | 'DELETED';
export type WebhookResult = 'success' | 'error';

export default {}; // Ensures this file is treated as a module