
/**
 * Social media types used across the application
 */

// Supported social media platforms
export type SocialPlatform = 'Facebook' | 'Twitter' | 'LinkedIn' | 'Instagram' | 'TikTok' | 'YouTube';

// Content types for social posts
export type ContentType = 'text' | 'image' | 'video' | 'link' | 'carousel' | 'poll';

// Post status options
export type PostStatus = 'draft' | 'scheduled' | 'published' | 'failed';

// Standard social media post interface
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

// Create post input interface
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

// Calendar filters interface
export interface SocialMediaCalendarFilters {
  platform?: SocialPlatform;
  content_type?: ContentType;
  status?: PostStatus;
  date_range?: [Date | null, Date | null];
  campaign_id?: string;
  search_query?: string;
}
