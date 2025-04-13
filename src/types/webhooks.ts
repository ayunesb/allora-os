
import { WebhookType } from '@/utils/webhookTypes';

export interface WebhookEvent {
  id: string;
  webhookType: WebhookType;
  eventType: string;
  targetUrl: string;
  source: string;
  status: 'success' | 'failed' | 'pending';
  timestamp: string;
  payload: any;
  response: any;
  duration?: number;
  errorMessage?: string;
  responseCode?: string;
}
