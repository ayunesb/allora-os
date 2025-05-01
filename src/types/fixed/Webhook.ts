
export type WebhookType = 'zapier' | 'custom' | 'stripe' | 'github' | 'slack' | 'notion';

export interface WebhookEvent {
  id: string;
  webhook_id: string;
  eventType: string;
  event_type: string;
  status: 'success' | 'failed' | 'pending';
  created_at: string;
  payload: any;
  response?: any;
  targetUrl: string;
  url?: string;
  webhookType: WebhookType;
  webhook_type?: WebhookType;
  timestamp: string;
  type?: string; // For backward compatibility
}

export type BusinessEventType = 
  | 'campaign_created' 
  | 'strategy_approved' 
  | 'lead_converted'
  | 'revenue_milestone'
  | 'user_onboarded'
  | 'campaign_launched'
  | 'lead_added'
  | 'test_event';

export interface BusinessEventPayload {
  eventType: BusinessEventType | string;
  data: Record<string, any>;
}

export interface WebhookResult {
  success: boolean;
  message?: string;
  error?: any;
  statusCode?: number;
  responseData?: any;
}
