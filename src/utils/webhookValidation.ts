
import { WebhookType, WebhookResult } from './webhookTypes';

// Re-export WebhookType to make it available to importing modules
export { WebhookType };

/**
 * Validate webhook URL format based on webhook type
 */
export function validateWebhookUrlFormat(url: string, type: WebhookType): boolean {
  if (!url || typeof url !== 'string') {
    return false;
  }
  
  // Remove whitespace
  url = url.trim();
  
  // Basic URL validation
  try {
    new URL(url);
  } catch (e) {
    return false;
  }
  
  // Type-specific validation
  switch (type) {
    case 'stripe':
      return url.startsWith('https://') && url.includes('stripe.com');
      
    case 'zapier':
      // Zapier webhook URLs typically start with hooks.zapier.com
      return (
        url.startsWith('https://') && 
        (url.includes('hooks.zapier.com') || url.includes('zapier.com/hooks'))
      );
      
    case 'github':
      return url.startsWith('https://') && url.includes('github.com');
      
    case 'slack':
      return url.startsWith('https://') && url.includes('hooks.slack.com');
      
    case 'custom':
      // Just basic HTTPS validation for custom webhooks
      return url.startsWith('https://');
      
    default:
      return false;
  }
}

/**
 * Sanitize webhook URL to ensure it's clean and safe
 */
export function sanitizeWebhookUrl(url: string, type: WebhookType): string {
  if (!url) return '';
  
  // Trim whitespace
  url = url.trim();
  
  // Basic URL validation
  try {
    // This will throw if the URL is invalid
    const parsedUrl = new URL(url);
    return parsedUrl.toString();
  } catch (e) {
    console.error('Invalid URL:', url);
    return '';
  }
}

/**
 * Test a webhook by sending a simple test payload
 */
export async function testWebhook(url: string, type: WebhookType): Promise<WebhookResult> {
  if (!url) {
    return { success: false, message: 'No webhook URL provided' };
  }
  
  if (!validateWebhookUrlFormat(url, type)) {
    return { success: false, message: `Invalid ${type} webhook URL format` };
  }
  
  try {
    console.log(`Testing ${type} webhook:`, url);
    
    // Prepare test payload based on webhook type
    const testPayload = {
      event: 'test',
      source: 'Allora AI Webhook Test',
      timestamp: new Date().toISOString(),
      webhook_type: type
    };
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testPayload),
      mode: 'no-cors', // Use no-cors mode for cross-origin webhooks
    });
    
    // Since we're using no-cors, we can't actually check the response status
    // For now, we'll just assume success if no error is thrown
    return { 
      success: true,
      message: 'Webhook test request sent successfully (no-cors mode)',
    };
  } catch (error: any) {
    console.error(`Error testing ${type} webhook:`, error);
    return {
      success: false,
      message: error.message || `Failed to test ${type} webhook`,
      error
    };
  }
}
