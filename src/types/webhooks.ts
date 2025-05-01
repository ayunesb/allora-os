
import { WebhookType, WebhookStatus, WebhookEvent, WebhookConfig } from './fixed/Webhook';

export type { WebhookType, WebhookStatus, WebhookEvent, WebhookConfig };

export interface UnifiedWebhookEvent extends WebhookEvent {
  type?: WebhookType;
  event_type?: string;
  timestamp?: string;
  webhookType?: WebhookType;
  eventType?: string;
  targetUrl?: string;
  url?: string;
  source?: string;
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
