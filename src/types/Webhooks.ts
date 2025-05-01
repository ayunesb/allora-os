
export type WebhookType = 'zapier' | 'custom' | 'slack' | 'github' | 'stripe' | 'notion';

export interface BusinessEventPayload {
  eventType: string;
  data: Record<string, any>;
}

export interface CampaignPayload {
  campaignId: string;
  campaignTitle: string;
  platform: string;
  owner: string;
  budget: number;
  companyId: string;
}

export interface LeadPayload {
  leadId: string;
  leadName: string;
  company: string;
  email: string;
  source: string;
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
  webhookType: WebhookType;
  eventType: string;
  targetUrl: string;
  status: 'success' | 'failed' | 'pending';
  timestamp: string;
  payload: any;
  response?: any;
  duration?: number;
  errorMessage?: string;
  responseCode?: number;
  source?: string;
}
