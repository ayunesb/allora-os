
// This file unifies and re-exports all fixed types to ensure consistency
import { User } from './fixed/User';
import { WebhookType, WebhookEvent, BusinessEventType, BusinessEventPayload, WebhookResult } from './fixed/Webhook';
import { SocialPlatform, ContentType, PostStatus, SocialMediaPost, SocialMediaCalendarFilters } from './fixed/SocialMedia';

// Re-export all types for consistent usage across the application
export type {
  User,
  WebhookType,
  WebhookEvent as UnifiedWebhookEvent,
  BusinessEventType,
  BusinessEventPayload,
  WebhookResult,
  SocialPlatform,
  ContentType,
  PostStatus,
  SocialMediaPost,
  SocialMediaCalendarFilters
};

// Backward compatibility type aliases
export type UserRole = 'admin' | 'user';
export type WebhookStatus = 'success' | 'failed' | 'pending';
export type ChecklistItemStatus = 'pending' | 'error' | 'completed' | 'warning' | 'in-progress';
