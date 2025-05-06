import { WebhookEvent, WebhookType } from "@/types/fixed/Webhook";
export declare const getWebhookEvents: () => Promise<WebhookEvent[]>;
export declare const getWebhookEventById: (
  id: string,
) => Promise<WebhookEvent | null>;
export declare const testWebhook: (
  url: string,
  type: WebhookType,
) => Promise<{
  success: boolean;
  message: string;
}>;
