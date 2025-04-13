
export interface WebhookEvent {
  id: string;
  source: string;
  status: string;
  timestamp: string;
  payload: any;
  response: any;
  webhookType: string;
  eventType: string;
  targetUrl: string;
}
