// Export base types
export * from './fixed/User';
export * from './fixed/Auth';
export * from './fixed/Agent';
export * from './fixed/Accessibility';
export * from './fixed/Compliance';
export * from './fixed/LaunchChecklist';
export * from './fixed/Campaign';
export * from './fixed/Message';
export * from './fixed/Bot';
export * from './fixed/SocialMedia';
export * from './fixed/SocialMediaPost';
export * from './fixed/Strategy';
export type { WebhookEvent, WebhookStatus } from './fixed/Webhook';

// Unified + compatibility types
export * from './unified-types';
export * from './compatibility';

// Webhook utility compatibility
export {
  WebhookType,
  validateWebhookUrlFormat,
  testWebhook,
  sanitizeWebhookUrl,
} from '@/utils/webhookValidation';

// Social media types (explicit)
export type {
  SocialPlatform,
  ContentType,
  PostStatus,
  SocialMediaPost,
  SocialMediaCalendarFilters,
} from './unified-types';

// Checklist types (explicit)
export type {
  ChecklistCategory,
  ChecklistItem,
} from './fixed/LaunchChecklist';

// Legacy types that are NOT already exported above
export type {
  ExecutiveAgentProfile,
  AgentOptions,
  AgentRunOptions,
  ExtendedAccessibilityContextType,
} from './legacy';
