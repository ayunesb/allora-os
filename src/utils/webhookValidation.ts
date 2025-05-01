
import { WebhookType, WebhookResult } from './webhookTypes';

/**
 * Validates webhook URL format for different webhook types
 */
export function validateWebhookUrlFormat(url: string, type: WebhookType): boolean {
  if (!url || url.trim() === '') return false;
  
  try {
    // Basic URL validation
    new URL(url);
    
    // Type-specific validation
    switch (type) {
      case 'zapier':
        return url.includes('hooks.zapier.com/hooks/catch/');
      case 'stripe':
        return url.includes('stripe.com/') || url.includes('api.stripe.com/');
      case 'github':
        return url.includes('github.com/') || url.includes('api.github.com/');
      case 'slack':
        return url.includes('hooks.slack.com/');
      case 'custom':
        return true; // No specific validation for custom webhooks
      default:
        return false;
    }
  } catch (error) {
    return false; // Invalid URL format
  }
}

/**
 * Tests a webhook by sending a test payload
 */
export async function testWebhook(url: string, type: WebhookType): Promise<WebhookResult> {
  if (!validateWebhookUrlFormat(url, type)) {
    return { success: false, message: `Invalid ${type} webhook URL format` };
  }
  
  try {
    // Create a test payload based on webhook type
    const payload = createTestPayload(type);
    
    const start = Date.now();
    
    // Send the test request
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'no-cors', // Use no-cors to prevent CORS issues
      body: JSON.stringify(payload),
    });
    
    const duration = Date.now() - start;
    
    // Since we're using no-cors, we won't get proper response data
    // Instead, we assume it worked if no error was thrown
    return {
      success: true,
      message: `${type} webhook test successfully sent`,
      duration,
    };
  } catch (error) {
    console.error(`Error testing ${type} webhook:`, error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
      error
    };
  }
}

/**
 * Creates an appropriate test payload based on webhook type
 */
function createTestPayload(type: WebhookType): any {
  const timestamp = new Date().toISOString();
  const basePayload = {
    test: true,
    timestamp,
    source: 'Allora AI Platform',
  };
  
  switch (type) {
    case 'zapier':
      return {
        ...basePayload,
        eventType: 'test_webhook',
        data: {
          message: 'This is a test webhook from Allora AI',
          source: 'Webhook Test'
        }
      };
    case 'stripe':
      return {
        ...basePayload,
        type: 'test_webhook',
        data: {
          object: 'event',
          api_version: '2020-08-27',
          created: Math.floor(Date.now() / 1000),
          livemode: false,
          pending_webhooks: 0,
          request: { id: null },
          type: 'test_webhook',
        }
      };
    case 'github':
      return {
        ...basePayload,
        action: 'test',
        sender: {
          login: 'allora-ai',
          type: 'Organization'
        }
      };
    case 'slack':
      return {
        text: "This is a test webhook from Allora AI Platform",
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "*Webhook Test* from Allora AI\nTimestamp: " + timestamp
            }
          }
        ]
      };
    case 'custom':
    default:
      return {
        ...basePayload,
        message: 'This is a test webhook from Allora AI Platform',
        details: {
          application: 'Allora AI',
          test: true
        }
      };
  }
}
