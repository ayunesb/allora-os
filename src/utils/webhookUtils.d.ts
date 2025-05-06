import { WebhookEvent } from "@/types/fixed/Webhook";
/**
 * Normalizes webhook event objects to handle different property names
 * across the application
 */
export declare function normalizeWebhookEvent(
  event: WebhookEvent,
): WebhookEvent;
/**
 * Creates webhook events with both event_type and eventType properties
 * to maintain compatibility with different components
 */
export declare function createWebhookEvent(
  data: Partial<WebhookEvent>,
): WebhookEvent;
