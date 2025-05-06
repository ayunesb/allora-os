import { WebhookEvent } from '@/types/fixed/Webhook';

/**
 * Normalizes webhook event objects to handle different property names
 * across the application
 */
export function normalizeWebhookEvent(event: WebhookEvent): WebhookEvent {
  return {
    ...event,
    // Add eventType as an alias to event_type for backward compatibility
    eventType: event.eventType,
    // Normalize resource property
    resource: event.resource || 'unknown',
  };
}

/**
 * Creates webhook events with both event_type and eventType properties
 * to maintain compatibility with different components
 */
export function createWebhookEvent(data: Partial<WebhookEvent>): WebhookEvent {
  const event = {
    id: data.id || '',
    webhook_id: data.webhook_id || '',
    event_type: data.eventType || data.eventType || '',
    status: data.status || 'pending' as const,
    created_at: data.created_at || new Date().toISOString(),
    payload: data.payload || {},
    targetUrl: data.targetUrl || '',
    webhookType: data.webhookType || 'custom',
    timestamp: data.timestamp || new Date().toISOString(),
    duration: data.duration,
    errorMessage: data?.errorMessage ?? 'Unknown error',
    responseCode: data.responseCode,
    resource: data.resource || 'unknown',
    response: data.response || {},
  };

  return {
    ...event,
    eventType: event.event_type, // Add alias for backward compatibility
  };
}

export function buildWebhookResponse(data: Partial<WebhookEvent>): WebhookEvent {
  return {
    id: data.id || '',
    eventType: data.eventType || 'custom',
    webhook_id: data.webhook_id || '',
    status: data.status || 'pending',
    created_at: data.created_at || new Date().toISOString(),
    payload: data.payload || {},
    targetUrl: data.targetUrl || '',
    webhookType: data.webhookType || 'custom',
    timestamp: data.timestamp || new Date().toISOString(),
    duration: data.duration || 0,
    errorMessage: data.errorMessage ?? 'Unknown error',
    responseCode: data.responseCode ?? 500,
    resource: data.resource || 'unknown',
    response: data.response || {},
  };
}

export function getMockWebhook(): WebhookEvent {
  return {
    id: '123',
    webhook_id: 'abc',
    eventType: 'mock',
    status: 'pending',
    created_at: new Date().toISOString(),
    payload: {},
    targetUrl: 'https://example.com',
    resource: 'example-resource-id',
    response: {},
  };
}

export function getWebhookData(data: Partial<WebhookEvent>): WebhookEvent {
  return {
    id: data.id || '',
    webhook_id: data.webhook_id || '',
    eventType: data.eventType || 'custom',
    status: data.status || 'pending',
    created_at: data.created_at || new Date().toISOString(),
    payload: data.payload || {},
    targetUrl: data.targetUrl || '',
    resource: data.resource || 'unknown',
    response: data.response || {},
    webhookType: data.webhookType,
    timestamp: data.timestamp,
    duration: data.duration,
    errorMessage: data.errorMessage,
    responseCode: data.responseCode,
  };
}
