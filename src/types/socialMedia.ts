
export interface SocialMediaPost {
  id: string;
  company_id: string;
  title: string;
  content: string;
  platform: string;
  scheduled_date: string;
  publish_time: string;
  status: 'draft' | 'approved' | 'scheduled' | 'published' | 'failed';
  content_type: string;
  media_urls?: string[];
  campaign_id?: string;
  is_approved: boolean;
  approval_notes?: string;
  tags?: string[];
  mentions?: string[];
  hashtags?: string[];
  location?: string;
  link_url?: string;
  created_at: string;
  updated_at: string;
  author_id?: string;
}

export interface CreatePostInput {
  title: string;
  content: string;
  platform: string;
  scheduled_date: string;
  publish_time: string;
  content_type: string;
  media_urls?: string[];
  campaign_id?: string;
  is_approved?: boolean;
  tags?: string[];
  mentions?: string[];
  hashtags?: string[];
  location?: string;
  link_url?: string;
}

export interface UpdatePostInput {
  id: string;
  title?: string;
  content?: string;
  platform?: string;
  scheduled_date?: string;
  publish_time?: string;
  status?: string;
  content_type?: string;
  media_urls?: string[];
  campaign_id?: string;
  is_approved?: boolean;
  approval_notes?: string;
  tags?: string[];
  mentions?: string[];
  hashtags?: string[];
  location?: string;
  link_url?: string;
}

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

export interface BatchPostResponse {
  success: boolean;
  processed: number;
  failed: number;
  error_details?: Array<{ post_id: string; error: string }>;
}
