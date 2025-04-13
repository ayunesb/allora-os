
export type SocialMediaPlatform = 'Facebook' | 'Twitter' | 'LinkedIn' | 'Instagram' | 'Other';
export type PostStatus = 'draft' | 'scheduled' | 'published' | 'approved';

// Adding missing types
export type SocialPlatform = 'Facebook' | 'Twitter' | 'LinkedIn' | 'Instagram' | 'TikTok';
export type ContentType = 'text' | 'image' | 'video' | 'link' | 'carousel' | 'poll';
export type PostContentType = ContentType;

export interface SocialMediaCalendarFilters {
  platform?: string;
  status?: string;
  content_type?: string;
  campaign_id?: string;
  author_id?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
  tags?: string[];
}

export interface CreatePostInput {
  title: string;
  content: string;
  platform: SocialPlatform;
  scheduled_date: string;
  publish_time?: string;
  content_type: ContentType;
  media_urls?: string[];
  campaign_id?: string;
  tags?: string[];
  is_approved?: boolean;
  mentions?: string[];
  hashtags?: string[];
  location?: string;
  link_url?: string;
}

export interface UpdatePostInput extends Partial<CreatePostInput> {
  id: string;
  status?: PostStatus;
  approval_notes?: string;
}

export interface BatchPostResponse {
  success: boolean;
  processed: number;
  failed: number;
  error_details?: Array<{ post_id: string; error: string }>;
}

export interface SocialMediaPost {
  id: string;
  title: string;
  content: string;
  platform: SocialMediaPlatform | string;
  status?: string;
  scheduled_date?: string;
  published_date?: string;
  author_id?: string;
  company_id?: string;
  media_urls?: string[];
  engagement?: {
    likes?: number;
    shares?: number;
    comments?: number;
    views?: number;
  };
  approver?: string;
  created_at?: string;
  updated_at?: string;
  tags?: string[];
  aiGenerated?: boolean;
  aiSuggestions?: string[];
  
  // Adding missing properties
  publish_time?: string;
  content_type?: ContentType;
  is_approved?: boolean;
  link_url?: string;
  campaign_id?: string;
  approval_notes?: string;
  mentions?: string[];
  hashtags?: string[];
  location?: string;
}
