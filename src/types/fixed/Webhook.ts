
/**
 * Standard webhook type definitions used across the application
 */

// Supported webhook integration types
export type WebhookType = 'zapier' | 'custom' | 'slack' | 'notion' | 'github' | 'stripe';

// Webhook event types for business events
export type BusinessEventType = 
  | 'campaign_created' 
  | 'strategy_approved' 
  | 'lead_converted'
  | 'revenue_milestone'
  | 'user_onboarded'
  | 'campaign_launched'
  | 'lead_added'
  | 'test_event'
  | 'test_webhook';

// Webhook event status
export type WebhookStatus = 'success' | 'failed' | 'pending';

// Standard webhook event interface
export interface WebhookEvent {
  id: string;
  webhook_id: string;
  event_type: string;
  status: WebhookStatus;
  created_at: string;
  targetUrl: string;
  webhook_type: WebhookType;
  response: any;
  payload?: any;
  timestamp?: string;
  source?: string;
  webhookType?: WebhookType;
  eventType?: string;
  url?: string;
}

// Payload interface for business events
export interface BusinessEventPayload {
  eventType: BusinessEventType;
  data: Record<string, any>;
}

// Result of webhook operations
export interface WebhookResult {
  success: boolean;
  message?: string;
  statusCode?: number;
  data?: any;
  error?: any;
}

// Webhook configuration
export interface WebhookConfig {
  id?: string;
  type: WebhookType;
  url: string;
  name?: string;
  description?: string;
  events?: string[];
  headers?: Record<string, string>;
  enabled?: boolean;
  created_at?: string;
  tenant_id?: string;
}
