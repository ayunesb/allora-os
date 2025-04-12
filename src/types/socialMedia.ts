
/**
 * Social Media Calendar Types
 */

export type SocialPlatform = 'Facebook' | 'Instagram' | 'LinkedIn' | 'Twitter' | 'TikTok';

export type PostStatus = 'draft' | 'scheduled' | 'published' | 'failed';

export type PostContentType = 'text' | 'image' | 'video' | 'link' | 'carousel';

export interface SocialMediaPost {
  id: string;
  company_id: string;
  title: string;
  content: string;
  platform: SocialPlatform;
  scheduled_date: string;
  publish_time?: string;
  status: PostStatus;
  content_type: PostContentType;
  media_urls?: string[];
  campaign_id?: string;
  created_at: string;
  updated_at: string;
  author_id?: string;
  engagement_metrics?: {
    likes?: number;
    comments?: number;
    shares?: number;
    clicks?: number;
    impressions?: number;
  };
  is_approved: boolean;
  approval_notes?: string;
  tags?: string[];
}

export interface CreatePostInput {
  title: string;
  content: string;
  platform: SocialPlatform;
  scheduled_date: string;
  publish_time?: string;
  content_type: PostContentType;
  media_urls?: string[];
  campaign_id?: string;
  is_approved?: boolean;
  tags?: string[];
}

export interface UpdatePostInput {
  id: string;
  title?: string;
  content?: string;
  platform?: SocialPlatform;
  scheduled_date?: string;
  publish_time?: string;
  content_type?: PostContentType;
  media_urls?: string[];
  campaign_id?: string;
  status?: PostStatus;
  is_approved?: boolean;
  approval_notes?: string;
  tags?: string[];
}

export interface SocialMediaCalendarFilters {
  platform?: SocialPlatform;
  status?: PostStatus;
  startDate?: string;
  endDate?: string;
  campaign_id?: string;
  search?: string;
  content_type?: PostContentType;
}

export interface PostEngagementMetrics {
  post_id: string;
  platform: SocialPlatform;
  likes: number;
  comments: number;
  shares: number;
  clicks: number;
  impressions: number;
  reach: number;
  engagement_rate: number;
  updated_at: string;
}
