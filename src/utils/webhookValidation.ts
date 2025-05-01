
import { WebhookType } from '@/types/fixed/Webhook';

/**
 * Validates webhook URL format based on service type
 */
export function validateWebhookUrlFormat(url: string): boolean {
  if (!url) return false;
  
  try {
    const urlObj = new URL(url);
    
    // Basic checks
    if (urlObj.protocol !== 'https:') {
      return false;
    }
    
    return true;
  } catch (err) {
    return false;
  }
}

/**
 * Tests a webhook by sending a test event
 */
export async function testWebhook(url: string): Promise<{ success: boolean; message?: string }> {
  // This is a mock implementation
  // In a real application, this would send a test request to the webhook URL
  
  try {
    // Simulate a successful response for most URLs
    if (url.includes('example.com/error')) {
      return { 
        success: false, 
        message: 'Connection refused' 
      };
    }
    
    // Simulate a network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return { 
      success: true 
    };
  } catch (error) {
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

/**
 * Sanitizes webhook URL to prevent security issues
 */
export function sanitizeWebhookUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.toString();
  } catch (err) {
    return '';
  }
}

// Re-export the WebhookType from types/fixed/Webhook for consistency
export type { WebhookType };
export { testWebhook, sanitizeWebhookUrl };
