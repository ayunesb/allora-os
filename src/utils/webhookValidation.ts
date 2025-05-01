
export type WebhookType = 'zapier' | 'custom' | 'stripe' | 'github' | 'slack' | 'notion';

/**
 * Tests a webhook by sending a test payload to the provided URL
 * @param url The webhook URL to test
 * @param type The type of webhook
 * @returns Promise resolving to success/failure status and details
 */
export const testWebhook = async (url: string, type: string) => {
  try {
    // Create a simple test payload
    const testPayload = {
      event: "webhook_test",
      timestamp: new Date().toISOString(),
      details: {
        message: "This is a test webhook from Allora AI",
        type
      }
    };

    // Make the request
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testPayload),
    });

    // Get status and response text
    const status = response.status;
    const text = await response.text();

    return {
      success: status >= 200 && status < 300,
      status,
      response: text,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Unknown error occurred',
    };
  }
};

/**
 * Sanitizes a webhook URL by checking for valid protocol and format
 * @param url The webhook URL to sanitize
 * @param type The webhook type for validation logic
 * @returns Sanitized URL or null if invalid
 */
export const sanitizeWebhookUrl = (url: string, type: WebhookType = 'custom'): string | null => {
  if (!url) return null;

  try {
    // Try to create a URL object to validate
    const urlObj = new URL(url);
    
    // Check for required protocols
    if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
      return null;
    }

    // Apply type-specific validation
    if (type === 'stripe' && !urlObj.hostname.includes('stripe.com')) {
      return null;
    } else if (type === 'zapier' && !urlObj.hostname.includes('hooks.zapier.com')) {
      return null;
    } else if (type === 'github' && !urlObj.hostname.includes('github.com')) {
      return null;
    } else if (type === 'slack' && !urlObj.hostname.includes('hooks.slack.com')) {
      return null;
    }
    
    // Reconstruct the URL to avoid injection attacks
    return `${urlObj.protocol}//${urlObj.host}${urlObj.pathname}${urlObj.search}${urlObj.hash}`;
  } catch (error) {
    // Invalid URL format
    return null;
  }
};

/**
 * Validates a webhook URL format
 * @param url The webhook URL to validate
 * @param type The webhook type for validation
 * @returns Boolean indicating if the URL is valid for the given type
 */
export const validateWebhookUrlFormat = (url: string, type: WebhookType = 'custom'): boolean => {
  if (!url) return false;

  try {
    const urlObj = new URL(url);

    // Check protocol
    if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
      return false;
    }

    // Type-specific validations
    switch (type) {
      case 'stripe':
        return urlObj.hostname.includes('stripe.com');
      case 'zapier':
        return urlObj.hostname.includes('hooks.zapier.com');
      case 'github':
        return urlObj.hostname.includes('github.com');
      case 'slack':
        return urlObj.hostname.includes('hooks.slack.com');
      case 'notion':
        return urlObj.hostname.includes('notion.so');
      case 'custom':
        return true; // Custom webhooks just need to be valid URLs
      default:
        return true;
    }
  } catch (error) {
    return false;
  }
};
