
import { WebhookType, WebhookResult } from '@/types/unified-types';

/**
 * Validates if a URL string is a valid webhook URL format
 */
export function validateWebhookUrlFormat(url: string): boolean {
  if (!url) return false;
  
  try {
    const parsedUrl = new URL(url);
    return ['http:', 'https:'].includes(parsedUrl.protocol);
  } catch (e) {
    return false;
  }
}

/**
 * Sanitizes a webhook URL to ensure it's valid
 */
export function sanitizeWebhookUrl(url: string): string {
  if (!url) return '';
  
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.toString();
  } catch (e) {
    // Try adding https if missing
    if (!/^https?:\/\//i.test(url)) {
      return sanitizeWebhookUrl(`https://${url}`);
    }
    return '';
  }
}

/**
 * Test a webhook by sending a simple test payload
 */
export async function testWebhook(
  url: string, 
  type: WebhookType = 'custom',
  eventType: string = 'test_event'
): Promise<WebhookResult> {
  if (!validateWebhookUrlFormat(url)) {
    return { 
      success: false, 
      message: 'Invalid webhook URL format',
      error: 'URL validation failed' 
    };
  }
  
  try {
    const testPayload = {
      event_type: eventType,
      webhook_type: type,
      timestamp: new Date().toISOString(),
      data: { message: 'This is a test webhook event' }
    };
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testPayload)
    });
    
    if (response.ok) {
      return { 
        success: true, 
        message: `Webhook test sent successfully with status ${response.status}`,
        statusCode: response.status,
        responseData: await response.text()
      };
    } else {
      return { 
        success: false,
        message: `Webhook test failed with status ${response.status}`,
        statusCode: response.status,
        error: await response.text()
      };
    }
  } catch (error) {
    return { 
      success: false, 
      message: `Error sending test webhook: ${error instanceof Error ? error.message : String(error)}`,
      error
    };
  }
}

// Export webhook types for convenience
export { WebhookType } from '@/types/unified-types';

// Function to check if event contains expected structure
export function validateWebhookEvent(event: any): boolean {
  return !!(event && 
    (event.eventType || event.event_type) && 
    (event.webhookType || event.webhook_type));
}
