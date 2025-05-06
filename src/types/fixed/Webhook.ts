export interface Webhook {
  id: string;
  url: string;
  event: string;
  createdAt: Date;
  updatedAt: Date;
}

// Consolidated Webhook types to avoid duplication

export type BusinessEventPayload = {
  id: string;
  // ...other properties...
};

export type WebhookEvent = {
  eventType: string;
  status: string;
  payload: BusinessEventPayload;
  targetUrl: string;
  resource: string;
  response: object;
  webhookType: string;
  timestamp: string;
  duration: number;
  errorMessage?: string;
  responseCode?: number;
  // ...other properties...
};

export type BusinessEventType = 'ORDER_CREATED' | 'USER_SIGNED_UP' | 'CREATED' | 'UPDATED' | 'DELETED';

export type WebhookResult = { success: boolean; message?: string };

export type WebhookStatus = 'active' | 'pending' | 'failed';
export type WebhookType = 'custom' | 'stripe' | 'github';

export default {}; // Ensures this file is treated as a module