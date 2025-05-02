
/**
 * Fixed types for webhooks to ensure consistency across the app
 */

export type WebhookType = 'zapier' | 'custom' | 'slack' | 'github' | 'stripe' | 'notion';

export type WebhookStatus = 'success' | 'failed' | 'pending';

export interface WebhookEvent {
  id: string;
  webhook_id: string;
  event_type: string;
  status: WebhookStatus;
  created_at: string;
  payload: any;
  response?: any;
  targetUrl: string;
  webhookType: WebhookType;
  webhook_type?: WebhookType; // For compatibility
  type?: WebhookType; // For compatibility
  timestamp: string;
  duration?: number;
  errorMessage?: string;
  responseCode?: number;
  source?: string;
  url?: string; // Alias for targetUrl for compatibility
  eventType?: string; // Alias for event_type for compatibility
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

export type BusinessEventType = 
  | 'campaign_created' 
  | 'strategy_approved' 
  | 'lead_converted'
  | 'revenue_milestone'
  | 'user_onboarded'
  | 'test_webhook'
  | 'test_event';

export interface BusinessEventPayload {
  eventType: string;
  data: Record<string, any>;
}

export interface WebhookResult {
  success: boolean;
  message?: string;
  error?: any;
  statusCode?: number;
  responseData?: any;
}
