export type WebhookType = "zapier" | "custom" | "stripe" | "slack" | "github" | "notion";
export type WebhookStatus = "pending" | "success" | "failed";

export interface WebhookEvent {
  id: string;
  webhook_id: string;
  eventType: string; // Consolidated property
  status: WebhookStatus;
  created_at: string;
  payload: Record<string, any>;
  targetUrl: string;
  response: any;
  resource: string; // Consolidated property
}

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
}
