
/**
 * Webhook URL Validation Utilities
 * Provides functions to validate different types of webhook URLs and test connectivity
 */

import { logger } from '@/utils/loggingService';

// Define the webhook types supported by the application
export type WebhookType = 'stripe' | 'zapier' | 'github' | 'slack' | 'custom';

// Regex patterns for different webhook services
const WEBHOOK_PATTERNS = {
  stripe: /^https:\/\/(?:api|hooks)\.stripe\.com\/(?:v\d+\/)?(?:webhook|connect\/webhooks)/i,
  zapier: /^https:\/\/hooks\.zapier\.com\/hooks\/(?:catch|send)/i,
  github: /^https:\/\/(?:api\.)?github\.com\/(?:repos\/[\w-]+\/[\w-]+\/)?hooks/i,
  slack: /^https:\/\/hooks\.slack\.com\/services\//i,
  // More relaxed pattern for custom webhooks, but still requires https
  custom: /^https:\/\/[\w.-]+\.\w+(?:\/[\w\/.~:_@%&?+=,-]*)?$/i
};

/**
 * Validate the webhook URL format for a specific service
 * @param webhookUrl The webhook URL to validate
 * @param type The type of webhook service
 * @returns Boolean indicating if the URL format is valid
 */
export const validateWebhookUrlFormat = (webhookUrl: string, type: WebhookType): boolean => {
  if (!webhookUrl) return false;
  
  // Always enforce HTTPS
  if (!webhookUrl.startsWith('https://')) {
    logger.warn(`Invalid webhook URL: ${webhookUrl} - must use HTTPS`);
    return false;
  }
  
  // Check against the specific pattern for this webhook type
  const pattern = WEBHOOK_PATTERNS[type];
  if (!pattern) {
    logger.error(`Unknown webhook type: ${type}`);
    return false;
  }
  
  const isValid = pattern.test(webhookUrl);
  if (!isValid) {
    logger.warn(`Invalid ${type} webhook URL format: ${webhookUrl}`);
  }
  
  return isValid;
};

/**
 * Sanitize and normalize a webhook URL
 * @param webhookUrl The webhook URL to sanitize
 * @param type The type of webhook service
 * @returns The sanitized webhook URL or empty string if invalid
 */
export const sanitizeWebhookUrl = (webhookUrl: string, type: WebhookType): string => {
  if (!webhookUrl) return '';
  
  // Trim whitespace
  const trimmedUrl = webhookUrl.trim();
  
  // Validate the URL format
  if (!validateWebhookUrlFormat(trimmedUrl, type)) {
    return '';
  }
  
  return trimmedUrl;
};

/**
 * Test a webhook by sending a test payload
 * @param webhookUrl The webhook URL to test
 * @param type The type of webhook service 
 * @returns Promise with the test result
 */
export const testWebhook = async (
  webhookUrl: string, 
  type: WebhookType
): Promise<{ success: boolean; message?: string }> => {
  // First validate the URL format
  if (!validateWebhookUrlFormat(webhookUrl, type)) {
    return { 
      success: false, 
      message: `Invalid ${type} webhook URL format` 
    };
  }
  
  try {
    logger.info(`Testing webhook: ${type} at ${webhookUrl}`);
    
    // Create a test payload that identifies itself as a test
    const testPayload = {
      event: "test",
      timestamp: new Date().toISOString(),
      source: "Allora AI Platform",
      test: true,
      message: "This is a test webhook from Allora AI"
    };
    
    // Use a timeout to prevent long-running requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    // Special handling for Zapier (which may require no-cors mode)
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testPayload),
      signal: controller.signal
    };
    
    // For Zapier, we need to use no-cors mode since it doesn't implement CORS
    if (type === 'zapier') {
      requestOptions.mode = 'no-cors';
    }
    
    // Send the test request
    const response = await fetch(webhookUrl, requestOptions);
    
    // Clear the timeout
    clearTimeout(timeoutId);
    
    // With no-cors, we don't get response details
    if (type === 'zapier' && response.type === 'opaque') {
      return { 
        success: true, 
        message: "Request sent successfully. Due to CORS restrictions, we cannot confirm receipt."
      };
    }
    
    // For regular responses, check status
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
    }
    
    return { 
      success: true, 
      message: "Webhook test successful!" 
    };
  } catch (error: any) {
    // Log and return the error
    const message = error.message || "Unknown error occurred";
    logger.error(`Webhook test failed: ${message}`, error);
    
    return { 
      success: false, 
      message: `Test failed: ${message}` 
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
