
export type SocialPlatform = 'Facebook' | 'Twitter' | 'Instagram' | 'LinkedIn' | 'TikTok' | 'YouTube';
export type ContentType = 'text' | 'image' | 'video' | 'link' | 'carousel' | 'poll';
export type PostStatus = 'draft' | 'scheduled' | 'published' | 'failed' | 'archived';

export interface SocialMediaPost {
  id: string;
  platform: SocialPlatform;
  content: string;
  content_type: ContentType;
  status: PostStatus;
  scheduled_at?: string;
  scheduled_date?: string; // For form compatibility
  publish_time?: string; // For form compatibility
  published_at?: string;
  media_urls?: string[];
  link_url?: string;
  engagement?: {
    likes?: number;
    comments?: number;
    shares?: number;
    views?: number;
  };
  tags?: string[];
  title?: string; // For form compatibility
  campaign_id?: string; // For form compatibility
  created_at: string;
  updated_at: string;
}

export interface PostFilter {
  platform?: SocialPlatform;
  status?: PostStatus;
  search?: string;
  startDate?: string;
  endDate?: string;
  tags?: string[];
}

export interface CalendarViewProps {
  posts: SocialMediaPost[];
  currentMonth: Date;
  isLoading?: boolean;
  error?: Error | null;
  onCreatePost: () => void;
  onDeletePost: (postId: string) => Promise<any>;
  onSchedulePost: (postId: string) => Promise<any>;
  onApprovePost: (postId: string) => Promise<any>;
  onEditPost?: (post: SocialMediaPost) => void;
  onRefresh?: () => void;
}
