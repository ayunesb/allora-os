
/**
 * Fixed types for webhooks to ensure consistency across the app
 */

export type WebhookType =
  | 'zapier'
  | 'custom'
  | 'slack'
  | 'github'
  | 'stripe'
  | 'notion';

export type WebhookStatus = 'success' | 'failed' | 'pending';

export type BusinessEventType =
  | 'campaign_created'
  | 'strategy_approved'
  | 'new_lead'
  | 'lead_converted'
  | 'revenue_milestone'
  | 'user_onboarded'
  | 'plugin_installed'
  | 'kpi_synced'
  | 'test_webhook'
  | 'test_event'
  | 'payment.success'  // Added for Stripe compatibility
  | 'lead.created'     // Added for Zapier compatibility
  | 'push';            // Added for GitHub compatibility

export interface WebhookEvent {
  id: string;
  webhook_id: string;
  event_type: BusinessEventType;
  status: WebhookStatus;
  created_at: string;
  payload: Record<string, any>;
  response?: any;
  targetUrl: string;
  webhookType: WebhookType;
  timestamp: string;
  duration?: number;
  errorMessage?: string;
  responseCode?: number;
  source?: string;
  
  // Legacy fields for backward compatibility
  url?: string; // Alias for targetUrl
  webhook_type?: WebhookType; // Alias for webhookType
  type?: WebhookType; // Another alias sometimes used
  eventType?: BusinessEventType; // Alias for event_type
}

export interface WebhookTestResult {
  success: boolean;
  message?: string;
  statusCode?: number;
  data?: any;
}

export interface WebhookFilter {
  types?: WebhookType[];
  status?: WebhookStatus | '';
  dateRange?: [Date | null, Date | null];
  search?: string;
}
