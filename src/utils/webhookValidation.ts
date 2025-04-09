
/**
 * Comprehensive webhook validation utility
 * Provides validation for various webhook service URLs
 */

import { executeAndLogWebhook } from './webhookUtils';

// Type definition for supported webhook services
export type WebhookType = 'stripe' | 'zapier' | 'github' | 'slack' | 'discord' | 'custom';

// Service-specific URL patterns
const WEBHOOK_PATTERNS = {
  stripe: /^https:\/\/(?:api|connect|hooks)\.stripe\.com\/.+/i,
  zapier: /^https:\/\/hooks\.zapier\.com\/.+/i,
  github: /^https:\/\/(?:api\.)?github\.com\/(?:repos\/[^\/]+\/[^\/]+\/hooks|orgs\/[^\/]+\/hooks)\/.+/i,
  slack: /^https:\/\/hooks\.slack\.com\/services\/.+/i,
  discord: /^https:\/\/(?:canary\.|ptb\.)?discord\.com\/api\/webhooks\/.+/i,
};

/**
 * Validates a webhook URL against the specified service pattern
 * 
 * @param url The webhook URL to validate
 * @param type The webhook service type
 * @returns An object with isValid status and optional message
 */
export function validateWebhookUrl(url: string, type: WebhookType): { 
  isValid: boolean; 
  message?: string;
} {
  if (!url || !url.trim()) {
    return { 
      isValid: false, 
      message: 'URL is required' 
    };
  }

  // First validate if it's a proper URL
  try {
    new URL(url);
  } catch (e) {
    return { 
      isValid: false, 
      message: 'Invalid URL format' 
    };
  }

  // For custom webhooks, just ensure it's HTTPS
  if (type === 'custom') {
    if (!url.startsWith('https://')) {
      return { 
        isValid: false, 
        message: 'Custom webhooks must use HTTPS' 
      };
    }
    return { isValid: true };
  }

  // Validate against the specific pattern
  const pattern = WEBHOOK_PATTERNS[type];
  if (!pattern) {
    return { 
      isValid: false, 
      message: `Unknown webhook type: ${type}` 
    };
  }

  const matches = pattern.test(url);
  if (!matches) {
    return { 
      isValid: false, 
      message: `URL does not match the pattern for ${type} webhooks` 
    };
  }

  return { isValid: true };
}

/**
 * Tests a webhook by sending a sample payload
 * 
 * @param url The webhook URL to test
 * @param type The webhook service type
 * @param payload Optional custom payload
 * @returns Promise resolving to test result
 */
export async function testWebhook(
  url: string, 
  type: WebhookType, 
  payload?: Record<string, any>
): Promise<{ success: boolean; message: string; eventId?: string }> {
  // First validate the URL
  const { isValid, message } = validateWebhookUrl(url, type);
  if (!isValid) {
    return { 
      success: false, 
      message: message || 'Invalid webhook URL' 
    };
  }

  // Default test payload
  const defaultPayload = {
    event: 'test_webhook',
    timestamp: new Date().toISOString(),
    source: 'Allora AI Platform',
    message: 'This is a test webhook from the Allora AI Platform'
  };

  // Merge with custom payload if provided
  const testPayload = payload ? { ...defaultPayload, ...payload } : defaultPayload;

  // Use our executeAndLogWebhook utility to handle the webhook call and logging
  return await executeAndLogWebhook(url, testPayload, type, 'test_webhook');
}

/**
 * Sanitizes and normalizes a webhook URL
 * 
 * @param url The webhook URL to sanitize
 * @param type The webhook service type
 * @returns Sanitized webhook URL
 */
export function sanitizeWebhookUrl(url: string, type: WebhookType): string {
  if (!url) return '';
  
  try {
    const urlObj = new URL(url.trim());
    
    // Basic security checks
    if (urlObj.protocol !== 'https:') {
      console.warn('Non-HTTPS webhook URL detected. For security, HTTPS is recommended.');
    }
    
    return urlObj.toString();
  } catch (e) {
    return '';
  }
}
