
export type WebhookType = 'zapier' | 'custom' | 'slack' | 'notion' | 'github';

export type BusinessEventType = 
  | 'campaign_created' 
  | 'strategy_approved' 
  | 'lead_converted'
  | 'revenue_milestone'
  | 'user_onboarded';

export interface BusinessEventPayload {
  eventType: BusinessEventType;
  data: Record<string, any>;
}
