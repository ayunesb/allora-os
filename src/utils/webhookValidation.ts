
import { WebhookType } from '@/types/fixed/Webhook';

export { WebhookType };

export const validateWebhookUrlFormat = (url: string, type: WebhookType): boolean => {
  // Basic URL validation
  if (!url || !url.startsWith('https://')) {
    return false;
  }

  // Specific validation based on webhook type
  switch (type) {
    case 'zapier':
      return url.includes('hooks.zapier.com');
    case 'slack':
      return url.includes('hooks.slack.com');
    case 'github':
      return url.includes('api.github.com') || url.includes('github.com');
    case 'stripe':
      // Stripe webhooks can have various domain patterns
      return true;
    case 'notion':
      return url.includes('notion.com') || url.includes('notion.so');
    case 'custom':
      // Custom webhooks just need to be valid URLs
      try {
        new URL(url);
        return true;
      } catch (e) {
        return false;
      }
    default:
      return true;
  }
};

export const sanitizeWebhookUrl = (url: string): string => {
  let sanitizedUrl = url.trim();
  
  // Ensure URL starts with https://
  if (sanitizedUrl && !sanitizedUrl.startsWith('http://') && !sanitizedUrl.startsWith('https://')) {
    sanitizedUrl = 'https://' + sanitizedUrl;
  }
  
  // Replace http:// with https:// for security
  if (sanitizedUrl.startsWith('http://')) {
    sanitizedUrl = 'https://' + sanitizedUrl.substring(7);
  }
  
  return sanitizedUrl;
};

export const testWebhook = async (url: string, type: WebhookType): Promise<{ success: boolean; message: string }> => {
  // In a real implementation, this would send a test request to the webhook URL
  // For this demo, we'll simulate a successful webhook test
  return new Promise((resolve) => {
    setTimeout(() => {
      // Validate the URL format first
      if (!validateWebhookUrlFormat(url, type)) {
        resolve({
          success: false,
          message: `Invalid ${type} webhook URL format`,
        });
        return;
      }
      
      resolve({
        success: true,
        message: `Successfully tested ${type} webhook`,
      });
    }, 1000);
  });
};
