
import { WebhookEvent } from '@/types/fixed/Webhook';

/**
 * Normalizes webhook event objects to handle different property names
 * across the application
 */
export function normalizeWebhookEvent(event: WebhookEvent): WebhookEvent & { eventType: string } {
  return {
    ...event,
    // Add eventType as an alias to event_type for backward compatibility
    eventType: event.event_type
  };
}

/**
 * Creates webhook events with both event_type and eventType properties
 * to maintain compatibility with different components
 */
export function createWebhookEvent(data: Partial<WebhookEvent>): WebhookEvent & { eventType: string } {
  const event = {
    id: data.id || '',
    webhook_id: data.webhook_id || '',
    event_type: data.event_type || '',
    status: data.status || 'pending' as const,
    created_at: data.created_at || new Date().toISOString(),
    payload: data.payload || {},
    targetUrl: data.targetUrl || '',
    webhookType: data.webhookType || 'custom',
    timestamp: data.timestamp || new Date().toISOString(),
    duration: data.duration,
    errorMessage: data.errorMessage,
    responseCode: data.responseCode,
    source: data.source,
    response: data.response
  };
  
  return {
    ...event,
    eventType: event.event_type
  };
}
