
import { WebhookType } from '@/utils/webhookTypes';

// Define regex patterns for webhook URL validation
const WEBHOOK_PATTERNS = {
  stripe: /^https:\/\/(?:api|hooks)\.stripe\.com\/(?:v\d+\/)?(?:webhook|connect\/webhooks)/i,
  zapier: /^https:\/\/hooks\.zapier\.com\/hooks\/(?:catch|send)/i,
  github: /^https:\/\/(?:api\.)?github\.com\/(?:repos\/[\w-]+\/[\w-]+\/)?hooks/i,
  slack: /^https:\/\/hooks\.slack\.com\/services\//i,
  // More relaxed pattern for custom webhooks, but still requires https
  custom: /^https:\/\/[\w.-]+\.\w+(?:\/[\w\/.~:_@%&?+=,-]*)?$/i
};

/**
 * Validate the webhook URL format for a specific service
 */
export function validateWebhookUrlFormat(webhookUrl: string, type: WebhookType): boolean {
  if (!webhookUrl) return false;
  
  // Always enforce HTTPS
  if (!webhookUrl.startsWith('https://')) {
    return false;
  }
  
  // Check against the specific pattern for this webhook type
  const pattern = WEBHOOK_PATTERNS[type];
  if (!pattern) {
    return false;
  }
  
  return pattern.test(webhookUrl);
}

/**
 * Sanitize and normalize a webhook URL
 */
export function sanitizeWebhookUrl(webhookUrl: string, type: WebhookType): string {
  if (!webhookUrl) return '';
  
  // Trim whitespace
  const trimmedUrl = webhookUrl.trim();
  
  // Validate the URL format
  if (!validateWebhookUrlFormat(trimmedUrl, type)) {
    return '';
  }
  
  return trimmedUrl;
}
