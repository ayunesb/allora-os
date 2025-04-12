
/**
 * Social Media Calendar Types
 * 
 * This module contains comprehensive type definitions for the social media management feature.
 * These types ensure type safety across the application when working with social media data.
 */

/**
 * Supported social media platforms
 */
export type SocialPlatform = 'Facebook' | 'Instagram' | 'LinkedIn' | 'Twitter' | 'TikTok';

/**
 * Status of a social media post
 */
export type PostStatus = 'draft' | 'scheduled' | 'published' | 'failed' | 'approved' | 'rejected';

/**
 * Content type of a social media post
 */
export type PostContentType = 'text' | 'image' | 'video' | 'link' | 'carousel' | 'poll';

/**
 * Engagement metrics for published posts
 * @property likes - Number of likes/reactions
 * @property comments - Number of comments
 * @property shares - Number of shares/retweets
 * @property clicks - Number of link clicks
 * @property impressions - Number of impressions/views
 * @property reach - Number of unique users reached
 * @property engagement_rate - Calculated engagement rate (percentage)
 */
export interface EngagementMetrics {
  likes?: number;
  comments?: number;
  shares?: number;
  clicks?: number;
  impressions?: number;
  reach?: number;
  engagement_rate?: number;
}

/**
 * Comprehensive social media post interface
 * 
 * @property id - Unique identifier for the post
 * @property company_id - ID of the company the post belongs to
 * @property title - Post title for internal reference
 * @property content - Post content/copy
 * @property platform - Target social media platform
 * @property scheduled_date - Date the post is scheduled for (ISO string)
 * @property publish_time - Optional specific time for publishing
 * @property status - Current status of the post
 * @property content_type - Type of post content
 * @property media_urls - Optional array of media URLs (images, videos)
 * @property campaign_id - Optional associated campaign ID
 * @property created_at - Creation timestamp (ISO string)
 * @property updated_at - Last update timestamp (ISO string)
 * @property author_id - Optional ID of the post author
 * @property engagement_metrics - Optional metrics for published posts
 * @property is_approved - Whether the post has been approved
 * @property approval_notes - Optional notes related to approval
 * @property tags - Optional array of tags/categories
 * @property mentions - Optional array of user/account mentions
 * @property hashtags - Optional array of hashtags
 * @property location - Optional location data
 * @property link_url - Optional URL for link posts
 * @property link_preview - Optional preview data for link posts
 */
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
  engagement_metrics?: EngagementMetrics;
  is_approved: boolean;
  approval_notes?: string;
  tags?: string[];
  mentions?: string[];
  hashtags?: string[];
  location?: {
    name?: string;
    latitude?: number;
    longitude?: number;
  };
  link_url?: string;
  link_preview?: {
    title?: string;
    description?: string;
    image?: string;
  };
}

/**
 * Input for creating a new social media post
 * Contains only the fields that can be provided by users
 */
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
  mentions?: string[];
  hashtags?: string[];
  location?: {
    name?: string;
    latitude?: number;
    longitude?: number;
  };
  link_url?: string;
}

/**
 * Input for updating an existing social media post
 * Requires ID and all fields are optional
 */
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
  mentions?: string[];
  hashtags?: string[];
  location?: {
    name?: string;
    latitude?: number;
    longitude?: number;
  };
  link_url?: string;
}

/**
 * Filters for the social media calendar
 */
export interface SocialMediaCalendarFilters {
  platform?: SocialPlatform;
  status?: PostStatus;
  startDate?: string;
  endDate?: string;
  campaign_id?: string;
  search?: string;
  content_type?: PostContentType;
  author_id?: string;
  tags?: string[];
}

/**
 * Detailed engagement metrics for a post
 * Used for analytics and reporting
 */
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
  demographic_data?: {
    age_ranges?: Record<string, number>;
    gender_split?: Record<string, number>;
    regions?: Record<string, number>;
  };
}

/**
 * Response from batch post operations
 */
export interface BatchPostResponse {
  success: boolean;
  processed: number;
  failed: number;
  error_details?: Array<{
    post_id?: string;
    error: string;
  }>;
}

/**
 * Platform-specific configuration for post publishing
 */
export interface PlatformPublishConfig {
  platform: SocialPlatform;
  is_enabled: boolean;
  default_posting_time?: string;
  character_limit?: number;
  media_count_limit?: number;
  auto_hashtags?: string[];
  required_approval?: boolean;
}

/**
 * Configuration for the social media calendar
 */
export interface SocialMediaCalendarConfig {
  default_view: 'month' | 'week' | 'list' | 'grid';
  auto_scheduling_enabled: boolean;
  optimal_posting_times: {
    [key in SocialPlatform]?: string[];
  };
  approval_workflow_enabled: boolean;
  platform_configs: PlatformPublishConfig[];
}
