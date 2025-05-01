
export type WebhookType = 'zapier' | 'custom' | 'slack' | 'github' | 'stripe';

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
