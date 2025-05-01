
export type SocialPlatform = 'Facebook' | 'Twitter' | 'Instagram' | 'LinkedIn';

export type PostContentType = 'text' | 'image' | 'video' | 'link';

export type PostStatus = 'Draft' | 'Scheduled' | 'Published' | 'Failed' | 'Approved';

export interface SocialMediaPost {
  id: string;
  title: string;
  content: string;
  platform: SocialPlatform;
  content_type: PostContentType;
  scheduled_date: string;
  publish_time?: string;
  status: PostStatus;
  is_approved: boolean;
  media_urls?: string[];
  link_url?: string;
  campaign_id?: string;
  tags?: string[];
  created_at: string;
  updated_at: string;
  company_id: string;
}

export interface NewSocialMediaPost {
  title: string;
  content: string;
  platform: SocialPlatform;
  content_type: PostContentType;
  scheduled_date: string;
  publish_time?: string;
  media_urls?: string[];
  link_url?: string;
  campaign_id?: string;
  tags?: string[];
}
