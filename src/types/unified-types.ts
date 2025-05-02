
import { User } from './fixed/User';
import { WebhookType, BusinessEventType, WebhookStatus, WebhookEvent, WebhookTestResult, WebhookFilter } from './fixed/Webhook';
import { ExtendedComplianceContextType } from './fixed/Compliance';
import { AuthContextProps } from './fixed/Auth';
import { Campaign, CampaignStatus, Platform, ExecutiveBot } from './fixed/Campaign';
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

// Export existing types
export type {
  User,
  WebhookType,
  BusinessEventType,
  WebhookStatus,
  WebhookEvent,
  WebhookTestResult,
  WebhookFilter,
  ExtendedComplianceContextType,
  AuthContextProps,
  SocialPlatform,
  ContentType,
  PostStatus
};
