/**
 * Webhook URL Validation Utilities
 * Provides functions to validate different types of webhook URLs and test connectivity
 */

import { logger } from '@/utils/loggingService';
import { WebhookType, WebhookResult } from './webhookTypes';
import { executeWebhook } from './webhookRetry';
import { validateWebhookUrlFormat, sanitizeWebhookUrl } from './validators/webhookValidator';

// Use export type for type re-export
export type { WebhookType } from './webhookTypes';
export { validateWebhookUrlFormat, sanitizeWebhookUrl };

/**
 * Test a webhook by sending a test payload
 * @param webhookUrl The webhook URL to test
 * @param type The type of webhook service 
 * @returns Promise with the test result
 */
export const testWebhook = async (
  webhookUrl: string, 
  type: WebhookType
): Promise<WebhookResult> => {
  // First validate the URL format
  if (!validateWebhookUrlFormat(webhookUrl, type)) {
    return { 
      success: false, 
      message: `Invalid ${type} webhook URL format` 
    };
  }
  
  // Create a test payload that identifies itself as a test
  const testPayload = {
    event: "test",
    timestamp: new Date().toISOString(),
    source: "Allora AI Platform",
    test: true,
    message: "This is a test webhook from Allora AI"
  };

  try {
    // Use our improved executeWebhook function
    const result = await executeWebhook(webhookUrl, testPayload, type, 'webhook_test');
    return result;
  } catch (error: any) {
    // Log and return the error
    const message = error.message || "Unknown error occurred";
    logger.error(`Webhook test failed: ${message}`, error);
    
    return { 
      success: false, 
      message: `Test failed: ${message}`,
      error
    };
  }
};

/**
 * Validates API credentials format (not just webhooks, but other API keys too)
 * @param credential The API credential to validate
 * @param type The type of service
 * @param options Additional validation options
 * @returns Promise with validation result
 */
export const validateApiCredential = async (
  credential: string,
  type: WebhookType | 'stripe_key' | 'postmark_key' | 'twilio_key' | 'openai_key',
  options: { logAttempts?: boolean; redactSensitive?: boolean } = {}
): Promise<boolean> => {
  const { logAttempts = false, redactSensitive = true } = options;
  
  if (!credential) return false;
  
  // Format validation for webhook URLs
  if (['stripe', 'zapier', 'github', 'slack', 'custom'].includes(type)) {
    return validateWebhookUrlFormat(credential, type as WebhookType);
  }
  
  // For API keys, check the format based on known patterns
  const keyPatterns: Record<string, RegExp> = {
    stripe_key: /^sk_(?:test|live)_[a-zA-Z0-9]{24,}$/,
    postmark_key: /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/,
    twilio_key: /^[a-zA-Z0-9]{32}$/,
    openai_key: /^sk-[a-zA-Z0-9]{32,}$/
  };
  
  const pattern = keyPatterns[type];
  if (!pattern) {
    logger.error(`Unknown API credential type: ${type}`);
    return false;
  }
  
  const isValid = pattern.test(credential);
  
  if (logAttempts) {
    const redactedCredential = redactSensitive
      ? `${credential.substring(0, 4)}...${credential.substring(credential.length - 4)}`
      : credential;
    
    if (isValid) {
      logger.info(`Valid ${type} credential format: ${redactedCredential}`);
    } else {
      logger.warn(`Invalid ${type} credential format: ${redactedCredential}`);
    }
  }
  
  return isValid;
};
