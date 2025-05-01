
import { WebhookType, BusinessEventType, BusinessEventPayload, WebhookResult } from '@/types';

// Validate and sanitize webhook URLs
export const sanitizeWebhookUrl = (url: string): string => {
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
