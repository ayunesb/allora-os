
/**
 * Comprehensive webhook validation utility
 * Provides validation for various webhook service URLs
 */

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
): Promise<{ success: boolean; message: string }> {
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

  try {
    // Use no-cors mode to avoid CORS issues with external webhook providers
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'no-cors',
      body: JSON.stringify(testPayload),
    });

    // Since we're using no-cors mode, we won't get a proper response status
    // We'll assume success but with a note about checking the service
    return {
      success: true,
      message: `Test webhook sent to ${type}. Check your ${type} service to confirm it was received.`
    };
  } catch (error) {
    console.error(`Error testing ${type} webhook:`, error);
    return {
      success: false,
      message: `Failed to send test webhook: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
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
