import { WebhookTestResult, BusinessEventType } from "@/types/fixed/Webhook";
export declare const testZapierWebhook: (
  webhookUrl: string,
) => Promise<WebhookTestResult>;
export declare const triggerZapierWebhook: (
  webhookUrl: string,
  data?: any,
) => Promise<WebhookTestResult>;
export declare const triggerBusinessEvent: (
  webhookUrl: string,
  eventType: BusinessEventType,
  data: Record<string, any>,
) => Promise<WebhookTestResult>;
