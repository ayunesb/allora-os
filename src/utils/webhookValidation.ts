
import { WebhookType } from '@/types/fixed/Webhook';

// Export WebhookType for use in other components
export { WebhookType };

const VALID_WEBHOOK_PATTERNS = {
  zapier: /^https:\/\/hooks\.zapier\.com\/.+/i,
  slack: /^https:\/\/hooks\.slack\.com\/.+/i,
  github: /^https:\/\/.+/i,
  stripe: /^https:\/\/.+/i,
  custom: /^https:\/\/.+/i,
  notion: /^https:\/\/.+/i
};

export const validateWebhookUrlFormat = (url: string, type: WebhookType): boolean => {
  if (!url) return false;
  
  const pattern = VALID_WEBHOOK_PATTERNS[type];
  return pattern.test(url);
};
