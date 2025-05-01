
export interface WebhookEvent {
  id: string;
  webhookType: string;
  event_type: string; // Using snake_case to match API
  webhook_id?: string;
  targetUrl: string;
  timestamp: string;
  status: string;
  responseCode?: number;
  response?: any;
  payload?: any;
  duration?: number;
  errorMessage?: string;
  source?: string;
  // For backward compatibility
  eventType?: string;
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

// Add BusinessEventType to support ZapierWebhookDemo
export type BusinessEventType = 
  | 'test_event' 
  | 'strategy_approved' 
  | 'lead_created' 
  | 'campaign_created'
  | 'lead_converted'
  | 'campaign_launched'
  | 'lead_added'
  | 'revenue_milestone'
  | 'user_onboarded';

export type WebhookResult = { 
  success: boolean; 
  message?: string;
  error?: Error;
};
