
/**
 * Types for webhook configuration and validation
 */

export type WebhookType = 'stripe' | 'zapier' | 'github' | 'slack' | 'custom';

export type BusinessEventType = 
  | 'new_strategy_approved'
  | 'new_lead_added'
  | 'campaign_launched'
  | 'shopify_order_placed'
  | 'new_client_signed'
  | 'revenue_milestone';

export interface BusinessEventPayload {
  companyId?: string;
  entityId?: string;
  entityType?: string;
  timestamp?: string;
  [key: string]: any;
}
