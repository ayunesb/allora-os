
export interface WebhookEvent {
  id: string;
  webhookType: WebhookType;
  targetUrl: string;
  event_type: string;
  status: 'success' | 'failed' | 'pending';
  timestamp: string;
  payload?: any;
  response?: any;
  duration?: number;
  errorMessage?: string;
  responseCode?: number;
  webhook_id?: string;
  source?: string;
  url?: string;
  type?: string;
  webhook_type?: string;
}

export interface Webhook {
  id: string;
  type: string;
  url: string;
  active: boolean;
  createdAt: string;
  lastTriggered?: string;
  events?: string[];
}

export type WebhookType = 'zapier' | 'stripe' | 'github' | 'slack' | 'custom' | 'notion';

export type BusinessEventType = 
  | 'campaign_created' 
  | 'strategy_approved' 
  | 'lead_converted'
  | 'revenue_milestone'
  | 'user_onboarded'
  | 'campaign_launched'
  | 'lead_added'
  | 'test_event';

export interface WebhookResult {
  success: boolean;
  message?: string;
  error?: any;
  statusCode?: number;
  responseData?: any;
}
