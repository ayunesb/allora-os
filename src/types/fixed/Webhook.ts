export type WebhookType = "zapier" | "custom" | "stripe" | "slack" | "github" | "notion";
export type WebhookStatus = "pending" | "success" | "failed";

export interface WebhookEvent {
  id: string;
  webhook_id: string;
  event_type: string;
  webhookType: WebhookType;
  status: WebhookStatus;
  payload: Record<string, any>;
  created_at: string;
  timestamp?: string;
  duration?: number;
  response?: any;
  responseCode?: number;
  targetUrl?: string;
  source?: string;
  url?: string;
  type?: string;
  // Add back these fields which are referenced in components
  eventType?: string;
  webhook_type?: WebhookType;
  errorMessage?: string; // add this
  resource: 'example-resource-id', // Added resource to return object
}

// Add missing types referenced in hooks and components
export interface WebhookTestResult {
  success: boolean;
  message?: string;
  statusCode?: number;
  data?: any;
}

export interface WebhookResult {
  success: boolean;
  message?: string;
  error?: any;
  statusCode?: number;
  responseData?: any;
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
  eventType: BusinessEventType;
  data: Record<string, any>;
}export type WebhookStatus = 'pending' | 'success' | 'failed';export interface WebhookEvent {  id: string;  status: WebhookStatus;  resource: string;  errorMessage?: string;  // ...any other fields}
