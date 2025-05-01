
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
