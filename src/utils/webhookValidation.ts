
// Create the missing WebhookType type used by useWebhookHistory
export type WebhookType = 'stripe' | 'zapier' | 'github' | 'slack' | 'custom';

export const validateWebhookUrl = (url: string, type: WebhookType): boolean => {
  if (!url.trim()) return false;
  
  try {
    const urlObj = new URL(url);
    
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return false;
    }
    
    // Type-specific validations
    switch (type) {
      case 'stripe':
        return url.includes('stripe.com') || url.includes('api.example.com/webhooks/stripe');
      case 'zapier':
        return url.includes('hooks.zapier.com');
      case 'github':
        return url.includes('github.com') || url.includes('api.example.com/webhooks/github');
      case 'slack':
        return url.includes('hooks.slack.com');
      case 'custom':
        return true; // Any valid URL is fine for custom webhooks
      default:
        return false;
    }
  } catch (e) {
    return false;
  }
};
