
export type WebhookType = 'zapier' | 'custom' | 'slack' | 'notion' | 'github' | 'stripe';

export type BusinessEventType = 
  | 'campaign_created' 
  | 'strategy_approved' 
  | 'lead_converted'
  | 'revenue_milestone'
  | 'user_onboarded'
  | 'campaign_launched'
  | 'lead_added';

export interface BusinessEventPayload {
  eventType: BusinessEventType;
  data: Record<string, any>;
}
