
import { WebhookType, BusinessEventType, BusinessEventPayload, WebhookResult } from '@/types';

// Validate and sanitize webhook URLs
export const sanitizeWebhookUrl = (url: string, type: WebhookType = 'custom'): string => {
  if (!url) return '';
  
  // Ensure URL has protocol
  if (!/^https?:\/\//i.test(url)) {
    url = 'https://' + url;
  }
  
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.toString();
  } catch (e) {
    return '';
  }
};

// Validate webhook URL format
export const validateWebhookUrlFormat = (url: string, type: WebhookType): boolean => {
  if (!url) return false;
  
  try {
    const parsedUrl = new URL(url);
    
    // Type-specific validation
    switch (type) {
      case 'zapier':
        return parsedUrl.hostname.includes('hooks.zapier.com');
      case 'stripe':
        return true; // No specific format requirements for Stripe
      case 'slack':
        return parsedUrl.hostname.includes('hooks.slack.com');
      case 'github':
        return parsedUrl.hostname.includes('api.github.com');
      case 'custom':
        return true; // Custom URLs can be any valid URL
      default:
        return true;
    }
  } catch (e) {
    return false;
  }
};

// Test a webhook by sending a test event
export const testWebhook = async (url: string, type: WebhookType): Promise<WebhookResult> => {
  if (!url) {
    return { success: false, message: 'Invalid webhook URL' };
  }
  
  const testPayload: BusinessEventPayload = {
    eventType: 'test_webhook',
    data: {
      message: 'This is a test webhook from Allora AI',
      timestamp: new Date().toISOString(),
      webhookType: type
    }
  };
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Source': 'Allora-AI'
      },
      body: JSON.stringify(testPayload)
    });
    
    if (response.ok) {
      return { 
        success: true, 
        message: `Test webhook sent successfully (${response.status})` 
      };
    } else {
      return { 
        success: false, 
        message: `Failed to send test webhook (${response.status})`,
        error: `HTTP error: ${response.status}`
      };
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to send test webhook due to network error',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Export the types for backward compatibility
export type { WebhookType, BusinessEventType, BusinessEventPayload, WebhookResult };
