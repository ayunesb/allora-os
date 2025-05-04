import { WebhookType, WebhookResult, RetryOptions } from './webhookTypes';
/**
 * Execute a single webhook call with improved error handling and logging
 */
export declare const executeWebhook: (url: string, payload: any, type: WebhookType, eventType: string) => Promise<WebhookResult>;
/**
 * Execute a webhook with enhanced retry logic and performance monitoring
 */
export declare const executeWithRetry: (url: string, payload: any, type: WebhookType, eventType: string, options?: RetryOptions) => Promise<WebhookResult>;
