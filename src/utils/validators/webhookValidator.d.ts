/**
 * Webhook Validation Utility
 *
 * This utility provides webhook validation functionality for various webhook types.
 */
import { WebhookType } from '@/utils/webhookTypes';
/**
 * Validates a webhook URL format based on the service type
 *
 * @param url The webhook URL to validate
 * @param type The type of webhook service
 * @returns Boolean indicating if the URL format is valid
 */
export declare const validateWebhookUrlFormat: (url: string, type: WebhookType) => boolean;
/**
 * Tests a webhook by sending a test payload
 *
 * @param url The webhook URL to test
 * @param type The type of webhook service
 * @returns Promise with test result
 */
export declare const testWebhook: (url: string, type: WebhookType) => Promise<{
    success: boolean;
    message?: string;
}>;
/**
 * Sanitizes a webhook URL to remove any potential security issues
 *
 * @param url The webhook URL to sanitize
 * @param type The type of webhook service
 * @returns Sanitized URL or null if invalid
 */
export declare const sanitizeWebhookUrl: (url: string, type: WebhookType) => string | null;
