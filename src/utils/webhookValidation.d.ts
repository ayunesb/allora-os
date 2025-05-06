export type WebhookType =
  | "zapier"
  | "custom"
  | "stripe"
  | "slack"
  | "github"
  | "notion";
export interface WebhookTestResult {
  success: boolean;
  message?: string;
  statusCode?: number;
  data?: any;
}
export interface WebhookResult {
  success: boolean;
  message?: string;
  error?: any;
  statusCode?: number;
  responseData?: any;
}
/**
 * Validates if a URL has proper format for a webhook
 */
export declare function validateWebhookUrlFormat(
  url: string,
  type?: WebhookType,
): boolean;
/**
 * Test a webhook URL with a simple payload
 */
export declare function testWebhook(url: string): Promise<WebhookTestResult>;
/**
 * Sanitize a webhook URL by trimming whitespace
 */
export declare function sanitizeWebhookUrl(url: string): string;
