
/**
 * Types for webhook configuration and validation
 */

export type WebhookType = 'stripe' | 'zapier' | 'github' | 'slack' | 'custom';

export type BusinessEventType = 
  | 'strategy_approved'
  | 'lead_added'
  | 'campaign_launched'
  | 'shopify_order_placed'
  | 'new_client_signed'
  | 'revenue_milestone_reached'
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
  error?: Error;
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
