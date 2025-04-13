
/**
 * Shared webhook type definitions for Allora AI platform
 */

// Define all supported webhook service types
export type WebhookType = 'stripe' | 'zapier' | 'github' | 'slack' | 'custom';

// Result interface from webhook execution
export interface WebhookResult {
  success: boolean;
  message?: string;
  statusCode?: number;
  responseData?: any;
  error?: Error;
  duration?: number;
}

// Configuration for webhook retry logic
export interface RetryOptions {
  maxRetries?: number;
  initialDelay?: number;
  backoffFactor?: number;
  maxDelay?: number;
  jitter?: boolean;
  onRetry?: (attempt: number, delay: number, error?: Error) => void;
}

// Interface for webhook events in the history
export interface WebhookEvent {
  id: string;
  timestamp: string;
  webhookType: WebhookType;
  eventType: string;
  targetUrl: string;
  payload: any;
  status: 'pending' | 'success' | 'error';
  responseCode?: number;
  response?: any;
  errorMessage?: string;
  duration?: number;
  retryCount?: number;
}

// Business event types for better type safety
export type BusinessEventType = 
  // Strategy events
  | 'strategy_approved' 
  | 'strategy_created'
  // Lead events
  | 'lead_created' 
  | 'lead_converted'
  | 'lead_status_changed'
  // Campaign events
  | 'campaign_created'
  | 'campaign_approved'
  | 'campaign_launched'
  // Revenue events
  | 'revenue_milestone_reached'
  | 'order_placed'
  // General events
  | 'milestone_reached'
  | 'experiment_logged'
  | string; // Allow custom events as well

// Define payload types for business events
export interface BusinessEventPayload {
  // Common fields
  timestamp?: string;
  userId?: string;
  companyId?: string;
  entityId?: string;
  entityType?: string;
  botId?: string;
  botName?: string;
  
  // Specific event fields can be added via spreading additional fields
  [key: string]: any;
}
