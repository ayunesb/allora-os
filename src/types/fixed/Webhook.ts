
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

export interface WebhookResult {
  success: boolean;
  message?: string;
  error?: any;
  statusCode?: number;
  responseData?: any;
}

export interface WebhookEvent {
  id: string;
  webhook_id: string;
  eventType: string;  // Primary event type identifier
  event_type?: string; // Backward compatibility
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
}
