
import { WebhookType } from '@/types';

export function validateWebhookUrlFormat(url: string, type: WebhookType): boolean {
  if (!url) return false;
  
  try {
    // First check if it's a valid URL
    new URL(url);
    
    // Then check type-specific patterns
    switch (type) {
      case 'zapier':
        return url.startsWith('https://hooks.zapier.com/');
      case 'slack':
        return url.startsWith('https://hooks.slack.com/');
      case 'github':
        return url.includes('github.com') || url.includes('githubusercontent.com');
      case 'stripe':
        return url.startsWith('https://');
      case 'notion':
        return url.includes('notion.so') || url.includes('notion.site');
      case 'custom':
        return url.startsWith('https://') || url.startsWith('http://');
      default:
        return url.startsWith('https://');
    }
  } catch (e) {
    return false;
  }
}

export function validateWebhookPayload(payload: any): boolean {
  // Basic validation for webhook payloads
  if (!payload || typeof payload !== 'object') {
    return false;
  }
  
  // Must have at least some properties
  return Object.keys(payload).length > 0;
}
