
import { WebhookType, WebhookResult, BusinessEventType } from './webhookTypes';

/**
 * Validates a webhook URL format based on the webhook type
 */
export const validateWebhookUrlFormat = (url: string, type: WebhookType): boolean => {
  if (!url) return false;
  
  const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/i;
  
  // Basic URL validation
  if (!urlPattern.test(url)) {
    return false;
  }
  
  // Type-specific validation
  switch (type) {
    case 'stripe':
      return url.includes('stripe.com') || url.includes('localhost');
    case 'zapier':
      return url.includes('hooks.zapier.com') || url.includes('localhost');
    case 'github':
      return url.includes('github.com') || url.includes('localhost');
    case 'slack':
      return url.includes('hooks.slack.com') || url.includes('localhost');
    case 'custom':
      return true; // Custom URLs just need to be valid URLs
    default:
      return false;
  }
};

/**
 * Sanitizes a webhook URL before saving
 */
export const sanitizeWebhookUrl = (url: string, type: WebhookType): string => {
  if (!url) return '';
  
  // Basic sanitization
  const trimmedUrl = url.trim();
  
  // Ensure URLs start with https:// (except for local development)
  if (!trimmedUrl.startsWith('http://localhost') && !trimmedUrl.startsWith('https://')) {
    return `https://${trimmedUrl}`;
  }
  
  return trimmedUrl;
};

/**
 * Test a webhook URL with a sample payload
 */
export const testWebhook = async (url: string, type: WebhookType): Promise<WebhookResult> => {
  if (!url) {
    return {
      success: false,
      message: 'No webhook URL provided'
    };
  }

  try {
    const testPayload = {
      event: 'test_webhook',
      timestamp: new Date().toISOString(),
      source: 'Allora AI Platform',
      message: `This is a test from the webhook testing utility (${type})`,
    };

    const startTime = Date.now();
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'no-cors', // This helps with CORS issues in the browser
      body: JSON.stringify(testPayload)
    });
    
    const duration = Date.now() - startTime;
    
    // With no-cors mode, we can't access response details
    // So we just assume the request was sent successfully
    return {
      success: true,
      message: 'Webhook test request sent',
      duration
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      error: error instanceof Error ? error : new Error('Unknown error')
    };
  }
};

// Export the types
export { WebhookType, WebhookResult, BusinessEventType };
