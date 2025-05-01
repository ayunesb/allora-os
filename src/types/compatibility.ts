
// This file provides type compatibility for legacy code
import { User } from './fixed/User';
import { WebhookEvent, WebhookType, BusinessEventType } from './fixed/Webhook';
import { SocialMediaPost, SocialPlatform, ContentType, PostStatus } from './fixed/SocialMedia';

// Type aliases for backward compatibility
export type UserRole = 'admin' | 'user';
export type WebhookStatus = 'success' | 'failed' | 'pending';

// Legacy webhook types
export type { WebhookType, BusinessEventType };
export interface LegacyWebhookEvent extends Partial<WebhookEvent> {
  type?: WebhookType;
  event_type?: string;
  timestamp?: string;
  webhookType?: WebhookType;
  eventType?: string;
  targetUrl?: string;
  url?: string;
  source?: string;
}

// Social media compatibility types
export interface LegacySocialPost extends Partial<SocialMediaPost> {
  scheduled_at?: string;
}

// Export for backward compatibility
export type PostContentType = ContentType;
export type { SocialPlatform, ContentType, PostStatus, User };
