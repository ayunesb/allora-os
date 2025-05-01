
export type WebhookType = 'zapier' | 'custom' | 'stripe' | 'github' | 'slack' | 'notion';

export type BusinessEventType = 
  | 'campaign_created' 
  | 'strategy_approved' 
  | 'new_lead'
  | 'campaign_launched'
  | 'lead_converted'
  | 'lead_added'
  | 'revenue_milestone'
  | 'user_onboarded'
  | 'test_webhook'
  | 'test_event';

export interface BusinessEventPayload {
  eventType: string;
  data: Record<string, any>;
}

export interface WebhookEvent {
  id: string;
  webhook_id: string;
  event_type: string;
  status: 'success' | 'failed' | 'pending';
  created_at: string;
  payload: any;
  response?: any;
  targetUrl: string;
  webhookType: WebhookType;
  timestamp: string;
  duration?: number;
  errorMessage?: string;
  responseCode?: number;
  source?: string;
  eventType?: string; // Added for backward compatibility
}

export interface WebhookResult {
  success: boolean;
  message?: string;
  error?: any;
  statusCode?: number;
  responseData?: any;
}
