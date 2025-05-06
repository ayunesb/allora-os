// This file provides type compatibility for legacy code
import { User } from './fixed/User';
import { WebhookEvent, WebhookType } from './fixed/Webhook';
import BusinessEventType from './fixed/Webhook'; // ✅ default import
import { SocialMediaPost, SocialPlatform, ContentType, PostStatus } from './unified-types';

// Type aliases for backward compatibility
export type UserRole = 'admin' | 'user';
export type WebhookStatus = 'success' | 'failed' | 'pending';

// Legacy webhook types
export type { WebhookType, BusinessEventType };
export interface UnifiedWebhookEvent extends Partial<WebhookEvent> {
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
  scheduled_at?: string;  // Legacy field
}

// Export for backward compatibility
export type PostContentType = ContentType;
export type { SocialPlatform, ContentType, PostStatus, User };
