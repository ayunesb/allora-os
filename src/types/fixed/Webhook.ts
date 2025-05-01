
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
  | 'test_event';

// Webhook event status
export type WebhookStatus = 'success' | 'failed' | 'pending';

// Standard webhook event interface
export interface WebhookEvent {
  id: string;
  webhook_id?: string;
  event_type: string;
  eventType?: string;
  status: WebhookStatus;
  created_at: string;
  targetUrl: string;
  url?: string;
  response?: any;
  duration?: number;
  webhook_type?: WebhookType;
  webhookType?: WebhookType;
  payload?: any;
  timestamp?: string; // Added for compatibility
  type?: WebhookType; // Added for compatibility
  source?: string; // Added for compatibility
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
  error?: any; // Added for compatibility
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
