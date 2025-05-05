// Export all types from the fixed directory
export * from './fixed/User';
export * from './fixed/Auth';
export * from './fixed/Agent';
export type { WebhookEvent, WebhookStatus } from './fixed/Webhook';
export * from './fixed/Accessibility';
export * from './fixed/Compliance';
export * from './fixed/LaunchChecklist';
export * from './fixed/Campaign';
export * from './fixed/Message';
export * from './fixed/Bot';
export * from './fixed/SocialMedia';

// Export all from unified types
export * from './unified-types';

// Export compatibility types
export * from './compatibility';

// Re-export the WebhookType for compatibility
export { WebhookType, validateWebhookUrlFormat, testWebhook, sanitizeWebhookUrl } from '@/utils/webhookValidation';

// Re-export social media types for compatibility
export { type SocialPlatform, type ContentType, type PostStatus, type SocialMediaPost, type SocialMediaCalendarFilters } from './unified-types';

// Re-export business event types
export { type BusinessEventType, type BusinessEventPayload, type WebhookResult } from './unified-types';

// Re-export any other types needed
export { ChecklistCategory, ChecklistItem } from './Checklist';
export { WebhookType } from './webhooks';
import { User } from './user'; // Updated import
