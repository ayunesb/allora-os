import type { WebhookEvent } from '@/types/fixed/Webhook';

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

export const sampleWebhook = (): WebhookEvent => ({
  id: 'sample-id',
  webhook_id: 'sample-webhook-id',
  eventType: 'sample',
  status: 'active',
  created_at: new Date().toISOString(),
  payload: {},
  targetUrl: 'https://sample-url.com',
  resource: 'sample-resource',
  response: {},
});

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
