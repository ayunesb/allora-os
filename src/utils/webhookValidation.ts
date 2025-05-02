
import { WebhookType } from '@/types/fixed/Webhook';

/**
 * Validates webhook URL format based on service type
 */
export function validateWebhookUrlFormat(url: string, type?: WebhookType): boolean {
  if (!url) return false;
  
  try {
    const urlObj = new URL(url);
    
    // Basic checks
    if (urlObj.protocol !== 'https:') {
      return false;
    }
    
    // Type-specific validation
    if (type) {
      switch(type) {
        case 'zapier':
          return url.includes('hooks.zapier.com');
        case 'slack':
          return url.includes('hooks.slack.com');
        case 'github':
          return url.includes('api.github.com');
        case 'stripe':
          return url.includes('api.stripe.com');
        // For other types, just validate it's a proper URL
      }
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

// Re-export the WebhookType for consistency
export type { WebhookType };
