import { WebhookEvent, BusinessEventPayload } from "./types/fixed/Webhook";

export function getMockWebhook(): WebhookEvent {
  return {
    id: "123",
    webhook_id: "abc",
    eventType: "mock",
    status: "pending",
    createdAt: new Date().toISOString(),
    payload: { id: "mock-id" }, // Ensure payload includes required 'id'
    targetUrl: "https://example.com",
    resource: "example-resource-id",
    response: {},
  };
}

export const sampleWebhook = (): WebhookEvent => ({
  id: "sample-id",
  webhook_id: "sample-webhook-id",
  eventType: "sample",
  status: "active",
  createdAt: new Date().toISOString(),
  payload: { id: "sample-id" }, // Ensure payload includes required 'id'
  targetUrl: "https://sample-url.com",
  resource: "sample-resource",
  response: {},
});

export function getWebhookData(data: Partial<WebhookEvent>): WebhookEvent {
  const defaultWebhookEvent: WebhookEvent = {
    id: data.id || "default-id",
    webhook_id: data.webhook_id || "default-webhook",
    eventType: data.eventType || "event",
    status: data.status || "pending",
    createdAt: data.createdAt || new Date().toISOString(),
    webhookType: data.webhookType ?? "generic",
    timestamp: data.timestamp ?? new Date().toISOString(),
    duration: data.duration ?? 0,
    errorMessage: data.errorMessage ?? "",
    responseCode: data.responseCode ?? 200,
    payload: data.payload || { id: "default-id" },
    targetUrl: data.targetUrl ?? "",
    resource: data.resource ?? "",
    response: data.response ?? {},
  };

  return {
    id: data.id || "",
    webhook_id: data.webhook_id || "",
    eventType: data.eventType || "custom",
    status: data.status || "pending",
    createdAt: data.createdAt || new Date().toISOString(),
    payload: data.payload || { id: "default-id" }, // Ensure payload includes required 'id'
    targetUrl: data.targetUrl || "",
    resource: data.resource || "unknown",
    response: data.response || {},
    webhookType: data.webhookType || "default",
    timestamp: data.timestamp || new Date().toISOString(),
    duration: data.duration || 0,
    errorMessage: data.errorMessage,
    responseCode: data.responseCode,
  };
}

export function initializeWebhookEvent(
  data: Partial<WebhookEvent>,
): WebhookEvent {
  const defaultWebhookEvent: WebhookEvent = {
    id: data.id || "default-id",
    webhook_id: data.webhook_id || "default-webhook",
    eventType: data.eventType || "event",
    status: data.status || "pending",
    createdAt: data.createdAt || new Date().toISOString(),
    webhookType: data.webhookType ?? "generic",
    timestamp: data.timestamp ?? new Date().toISOString(),
    duration: data.duration ?? 0,
    errorMessage: data.errorMessage ?? "",
    responseCode: data.responseCode ?? 200,
    payload: data.payload || { id: "default-id" },
    targetUrl: data.targetUrl ?? "",
    resource: data.resource ?? "",
    response: data.response ?? {},
  };

  return {
    eventType: data.eventType || "custom",
    status: data.status || "pending",
    payload: data.payload || { id: "default-id" }, // Ensure payload includes required 'id'
    targetUrl: data.targetUrl || "",
    resource: data.resource || "unknown",
    response: data.response || {},
    webhookType: data.webhookType || "default",
    timestamp: data.timestamp || new Date().toISOString(),
    duration: data.duration || 0,
    errorMessage: data.errorMessage,
    responseCode: data.responseCode,
  };
}
