
import { WebhookType } from './webhookTypes';

export function validateWebhookUrlFormat(url: string, type: WebhookType): boolean {
  if (!url || typeof url !== 'string') {
    return false;
  }
  
  try {
    const parsedUrl = new URL(url);
    
    // Basic checks
    if (!parsedUrl.protocol.startsWith('http')) {
      return false;
    }
    
    // Specific webhook type validation
    switch (type) {
      case 'stripe':
        return parsedUrl.hostname === 'api.stripe.com' || parsedUrl.hostname.endsWith('.stripe.com');
      
      case 'zapier':
        return parsedUrl.hostname === 'hooks.zapier.com' || parsedUrl.hostname.endsWith('.zapier.com');
      
      case 'github':
        return parsedUrl.hostname === 'api.github.com' || parsedUrl.hostname.endsWith('.github.com');
      
      case 'slack':
        return parsedUrl.hostname === 'hooks.slack.com' || parsedUrl.hostname.endsWith('.slack.com');
      
      case 'custom':
        // For custom webhooks, just ensure it's a valid HTTPS URL
        return parsedUrl.protocol === 'https:';
      
      default:
        return true;
    }
  } catch (error) {
    // URL parsing failed
    return false;
  }
}

export function sanitizeWebhookUrl(url: string, type: WebhookType): string {
  return url.trim();
}

export async function testWebhook(url: string, type: WebhookType) {
  if (!validateWebhookUrlFormat(url, type)) {
    return {
      success: false,
      message: `Invalid ${type} webhook URL format`
    };
  }
  
  try {
    // Send a test ping to the webhook
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'no-cors',
      body: JSON.stringify({
        test: true,
        message: `Test ping from Allora AI at ${new Date().toISOString()}`,
        webhook_type: type
      }),
    });
    
    // With mode: 'no-cors', we won't get a proper response to check
    // Just assume it was sent successfully
    return {
      success: true,
      message: `Test sent to ${type} webhook`
    };
  } catch (error) {
    console.error(`Error testing ${type} webhook:`, error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

export { WebhookType };
