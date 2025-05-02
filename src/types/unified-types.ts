
import { User } from './fixed/User';
import { WebhookType, WebhookStatus, WebhookEvent } from './fixed/Webhook';
import { ExtendedComplianceContextType } from './fixed/Compliance';
import { AuthContextProps } from './fixed/Auth';
import { Campaign, CampaignStatus, Platform } from './fixed/Campaign';
import { ExecutiveBoardMember } from './fixed/Executives';
import { PageTitleProps } from './fixed/Layout';

// Social Media Types
export type SocialPlatform = 'Facebook' | 'Twitter' | 'LinkedIn' | 'Instagram' | 'TikTok' | 'YouTube';
export type ContentType = 'text' | 'image' | 'video' | 'link' | 'carousel' | 'poll';
export type PostStatus = 'draft' | 'scheduled' | 'published' | 'failed';

// Re-export other types
export * from './fixed/Campaign';
export * from './fixed/Executives';
export * from './fixed/Layout';
export * from './fixed/Webhook';

// Export existing types
export type {
  User,
  WebhookType,
  WebhookStatus,
  WebhookEvent,
  ExtendedComplianceContextType,
  AuthContextProps,
  SocialPlatform,
  ContentType,
  PostStatus
};
