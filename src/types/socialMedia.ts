
export type SocialPlatform = 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'tiktok' | 'youtube';
export type ContentType = 'text' | 'image' | 'video' | 'link' | 'carousel';
export type PostStatus = 'draft' | 'scheduled' | 'published' | 'failed' | 'archived';

export interface SocialMediaPost {
  id: string;
  platform: SocialPlatform;
  content: string;
  content_type: ContentType;
  status: PostStatus;
  scheduled_at?: string;
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
