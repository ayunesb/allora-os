
import { WebhookType } from '@/types/fixed/Webhook';

/**
 * Validates if a webhook URL is properly formatted
 */
export function validateWebhookUrlFormat(url: string): boolean {
  try {
    // Check if it's a valid URL first
    const urlObj = new URL(url);
    
    // Check if it uses HTTPS
    if (urlObj.protocol !== 'https:') {
      return false;
    }
    
    return true;
  } catch (error) {
    // If URL construction fails, it's invalid
    return false;
  }
}

/**
 * Tests a webhook by sending a test payload
 */
export async function testWebhook(url: string): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event: 'test_event',
        timestamp: new Date().toISOString(),
        data: {
          message: 'This is a test webhook event from Allora AI',
        },
      }),
    });
    
    // Any response in the 200 range is considered successful
    if (response.ok) {
      return { 
        success: true, 
        message: `Webhook test successful (Status: ${response.status})` 
      };
    } else {
      return { 
        success: false, 
        message: `Webhook test failed with status ${response.status}: ${response.statusText}` 
      };
    }
  } catch (error) {
    return { 
      success: false, 
      message: `Webhook test failed: ${error instanceof Error ? error.message : 'Unknown error'}` 
    };
  }
}

/**
 * Sanitizes a webhook URL by removing any sensitive parameters
 */
export function sanitizeWebhookUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    
    // List of potentially sensitive parameters to remove
    const sensitiveParams = ['token', 'secret', 'api_key', 'apikey', 'password', 'auth'];
    
    // Remove sensitive query parameters
    sensitiveParams.forEach(param => {
      if (urlObj.searchParams.has(param)) {
        urlObj.searchParams.set(param, '[REDACTED]');
      }
    });
    
    return urlObj.toString();
  } catch {
    // If URL parsing fails, return the original but warn about it
    console.warn('Failed to sanitize webhook URL, it may not be a valid URL');
    return url;
  }
}

// Export for compatibility
export { WebhookType };
