import { WebhookType } from "@/utils/webhookValidation";
/**
 * Webhook utilities for working with various webhook types
 */
export declare function getWebhookTemplateUrl(type: WebhookType): string;
export declare function getWebhookDefaultPayload(type: WebhookType): any;
/**
 * Helper function to properly test webhooks with appropriate headers and payload
 */
export declare function testWebhookAdvanced(
  url: string,
  type: WebhookType,
): Promise<{
  success: boolean;
  message: string;
}>;
