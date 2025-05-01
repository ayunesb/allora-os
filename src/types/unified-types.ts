
import { User } from './fixed/User';
import { WebhookType, BusinessEventType, WebhookEvent, WebhookConfig, WebhookResult, BusinessEventPayload, WebhookStatus } from './fixed/Webhook';
import { ExtendedComplianceContextType } from './fixed/Compliance';
import { ExtendedAccessibilityContextType } from './fixed/Accessibility';

// Social Media Types
export type SocialPlatform = 'Facebook' | 'Twitter' | 'LinkedIn' | 'Instagram' | 'TikTok' | 'YouTube';
export type ContentType = 'text' | 'image' | 'video' | 'link' | 'carousel' | 'poll';
export type PostStatus = 'draft' | 'scheduled' | 'published' | 'failed';

export interface SocialMediaPost {
  id: string;
  title: string;
  content: string;
  platform: SocialPlatform;
  content_type: ContentType;
  status: PostStatus;
  is_approved: boolean;
  scheduled_date: string;
  publish_time: string;
  created_at: string;
  updated_at: string;
  published_at?: string;
  company_id: string;
  media_urls: string[];
  link_url: string;
  tags: string[];
  campaign_id?: string;
}

export interface CreatePostInput {
  title: string;
  content: string;
  platform: SocialPlatform;
  content_type: ContentType;
  scheduled_date?: string;
  publish_time?: string;
  media_urls?: string[];
  link_url?: string;
  tags?: string[];
  campaign_id?: string;
}

export interface SocialMediaCalendarFilters {
  platform?: SocialPlatform;
  content_type?: ContentType;
  status?: PostStatus;
  date_range?: [Date | null, Date | null];
  campaign_id?: string;
  search_query?: string;
}

// Executive Message Type
export interface UnifiedExecutiveMessage {
  id: string;
  content: string;
  message_content?: string;  // Adding for backward compatibility
  created_at: string;
  from_executive: boolean;
  to_executive: boolean;
  status: string;
}

// Unified webhook event that harmonizes all the different property names
export interface UnifiedWebhookEvent extends Partial<WebhookEvent> {
  id: string;
  webhook_id?: string;
  event_type: string; 
  eventType?: string;
  status: WebhookStatus;
  created_at: string;
  targetUrl?: string;
  url?: string;
  webhook_type?: WebhookType;
  webhookType?: WebhookType;
  type?: WebhookType;
  timestamp?: string;
  source?: string;
  payload?: any;
  response?: any;
}

// Re-export key types
export type {
  User,
  WebhookType,
  BusinessEventType,
  WebhookEvent,
  WebhookConfig,
  WebhookResult,
  BusinessEventPayload,
  WebhookStatus,
  ExtendedComplianceContextType,
  ExtendedAccessibilityContextType
};
