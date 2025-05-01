
export type SocialPlatform =
  | 'Facebook'
  | 'Twitter'
  | 'Instagram'
  | 'LinkedIn'
  | 'TikTok'
  | 'YouTube';

export type ContentType =
  | 'text'
  | 'image'
  | 'video'
  | 'link'
  | 'carousel'
  | 'poll';

export type PostStatus = 
  | 'draft'
  | 'scheduled'
  | 'published'
  | 'failed';

export interface SocialMediaPost {
  id: string;
  title: string;
  content: string;
  platform: SocialPlatform;
  content_type: ContentType;
  scheduled_date: string;
  publish_time: string;
  media_urls: string[];
  link_url: string;
  tags: string[];
  is_approved?: boolean;
  status?: PostStatus;
  company_id?: string;
  created_at?: string;
  updated_at?: string;
  published_at?: string; // Added for backward compatibility
}

export interface SocialMediaCalendarFilters {
  searchQuery?: string;
  platform?: string;
  status?: string;
  dateRange?: {
    from: Date | null;
    to: Date | null;
  };
}
