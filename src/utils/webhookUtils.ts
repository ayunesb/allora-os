import { WebhookEvent, BusinessEventPayload } from '../types/fixed/Webhook';

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
  return {
    eventType: data.eventType || 'custom',
    status: data.status || 'pending',
    payload: data.payload as BusinessEventPayload, // Ensure payload has required properties
    targetUrl: data.targetUrl || '',
    resource: data.resource || 'unknown',
    response: data.response || {},
    webhookType: data.webhookType || 'default',
    timestamp: data.timestamp || new Date().toISOString(),
    duration: data.duration || 0,
    errorMessage: data.errorMessage,
    responseCode: data.responseCode,
  };
}

export function buildWebhookResponse(data: Partial<WebhookEvent>): WebhookEvent {
  return {
    id: data.id || '',
    eventType: data.eventType || 'custom',
    webhookId: data.webhookId || '',
    status: data.status || 'pending',
    createdAt: data.createdAt || new Date().toISOString(),
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
    webhookId: 'abc',
    eventType: 'mock',
    status: 'pending',
    createdAt: new Date().toISOString(),
    payload: {},
    targetUrl: 'https://example.com',
    resource: 'example-resource-id',
    response: {},
  };
}

export function getWebhookData(data: Partial<WebhookEvent>): WebhookEvent {
  return {
    id: data.id || '',
    webhookId: data.webhookId || '',
    eventType: data.eventType || 'custom',
    status: data.status || 'pending',
    createdAt: data.createdAt || new Date().toISOString(),
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
