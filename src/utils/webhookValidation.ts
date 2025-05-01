
import { WebhookType } from '@/types';

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
