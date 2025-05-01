
// Social media post types

export type SocialPlatform = 'LinkedIn' | 'Facebook' | 'Instagram' | 'TikTok' | 'Twitter';

export type PostStatus = 'Draft' | 'Scheduled' | 'Pending Approval' | 'Published' | 'Failed';

export type ContentType = 'text' | 'image' | 'video' | 'link' | 'carousel' | 'poll';

export interface SocialMediaPost {
  id?: string;
  title: string;
  content: string;
  platform: SocialPlatform;
  scheduled_date: string;
  publish_time: string;
  content_type: ContentType;
  media_urls?: string[];
  link_url?: string;
  campaign_id?: string;
  tags?: string[];
  status?: PostStatus;
  created_at?: string;
  updated_at?: string;
  is_approved?: boolean; // Added to support components using this field
}

export interface EngagementMetrics {
  likes: number;
  comments: number;
  shares: number;
  clicks?: number;
  impressions?: number;
}

export interface CalendarViewProps {
  posts: SocialMediaPost[];
  currentMonth: Date;
  onEditPost: (post: SocialMediaPost) => void;
  onDeletePost: (postId: string) => Promise<{ success: boolean, error?: string }>;
  onSchedulePost: (postId: string) => Promise<{ success: boolean, error?: string }>;
  onApprovePost: (postId: string) => Promise<{ success: boolean, error?: string }>;
  onCreatePost: () => void;
}

export interface ListViewProps {
  posts: SocialMediaPost[];
  onEditPost: (post: SocialMediaPost) => void;
  onDeletePost: (postId: string) => Promise<{ success: boolean, error?: string }>;
  onSchedulePost: (postId: string) => Promise<{ success: boolean, error?: string }>;
  onApprovePost: (postId: string) => Promise<{ success: boolean, error?: string }>;
  onCreatePost: () => void;
}
