export type SocialPlatform = "Facebook" | "Twitter" | "Instagram" | "LinkedIn";
export type ContentType = "text" | "image" | "video" | "link";
export type PostStatus = "draft" | "scheduled" | "published";
export type PostContentType = "text" | "image" | "video" | "link";

export interface SocialMediaPost {
  id: string;
  title: string;
  content: string;
  platform: string;
  status: string;
  scheduled_date?: string;
  publish_time?: string;
  is_approved?: boolean;
  published_at?: string;
  content_type?: string;
  tags?: string[];
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
  hashtags?: string[];
  mentions?: string[];
  location?: string;
  campaign_id?: string;
  is_approved?: boolean;
  author_id?: string;
}

export interface SocialMediaCalendarFilters {
  platform?: SocialPlatform | 'all';
  status?: PostStatus | 'all';
  dateRange?: [Date | null, Date | null];
  search?: string;
  content_type?: string;
  campaign_id?: string;
  author_id?: string;
  startDate?: string;
  endDate?: string;
  tags?: string[];
}
