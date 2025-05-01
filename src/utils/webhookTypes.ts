
/**
 * Types for webhook configuration and validation
 */

export type WebhookType = 'stripe' | 'zapier' | 'github' | 'slack' | 'custom';

export type BusinessEventType = 
  | 'strategy_approved'
  | 'lead_added'
  | 'campaign_launched'
  | 'revenue_milestone_reached'
  | 'new_client_signed'
  | 'shopify_order_placed'
  | 'test_webhook';

export interface BusinessEventPayload {
  eventType: BusinessEventType;
  data: Record<string, any>;
  timestamp?: string;
  companyId?: string;
  entityId?: string;
  entityType?: string;
}

// Result interface for webhook operations
export interface WebhookResult {
  success: boolean;
  message?: string;
  statusCode?: number;
  responseData?: any;
  duration?: number;
  error?: Error | string;
}

// Retry options for webhook execution
export interface RetryOptions {
  maxRetries?: number;
  initialDelay?: number;
  backoffFactor?: number;
  maxDelay?: number;
  jitter?: boolean;
  onRetry?: (attempt: number, delay: number, error?: Error) => void;
}

// Interface for webhook events (used for logging/history)
export interface WebhookEvent {
  id: string;
  webhookType: WebhookType;
  eventType: string;
  targetUrl: string;
  source?: string;
  status: 'success' | 'failed' | 'pending';
  timestamp: string;
  payload?: any;
  response?: any;
  duration?: number;
  errorMessage?: string;
  responseCode?: number;
  retryCount?: number;
}

// Add these additional types for the components that need them
export interface StrategyApprovalPayload {
  entityId: string;
  entityType: string;
  strategyName: string;
  companyId: string;
  botName: string;
  suggestedBy: string;
  riskLevel: string;
  timestamp: string;
}

export interface LeadPayload {
  company: string;
  leadName: string;
  source: string;
  leadId: string;
  email: string;
}

export interface CampaignPayload {
  name: string;
  type: string;
  campaignId: string;
  startDate: string;
  budget: number;
}
