
export interface SocialMediaPost {
  id: string;
  name: string;
  platform: Platform;
  budget?: number;
  status?: PostStatus;
  executiveBot?: string | { name: string };
  justification?: string;
  roi?: string;
  healthScore?: 'good' | 'warning' | 'critical';
  impressions?: number;
  clicks?: number;
  leads?: number;
  company_id?: string;
  created_at?: string;
  updated_at?: string;
  is_archived?: boolean;
  aiGenerated?: boolean;
  collaborators?: string[];
  description?: string;
  
  // Social media specific fields
  title: string;
  content: string;
  scheduled_date: string;
  publish_time: string;
  content_type: ContentType;
  media_urls?: string[];
  campaign_id?: string;
  is_approved: boolean;
  approval_notes?: string;
  tags?: string[];
  mentions?: string[];
  hashtags?: string[];
  location?: string;
  link_url?: string;
  author_id?: string;
}

export type Platform = "Google" | "LinkedIn" | "Facebook" | "Instagram" | "TikTok" | "Email" | "Twitter";
export type ExecutiveBot = string;

// Harmonized type definitions to avoid inconsistencies
export type SocialPlatform = "LinkedIn" | "Facebook" | "Instagram" | "TikTok" | "Twitter";
export type PostStatus = "Draft" | "Active" | "Paused" | "Completed"; 
export type ContentType = "text" | "image" | "video" | "link" | "carousel" | "poll";
export type PostContentType = ContentType;

export interface CreatePostInput {
  title: string;
  content: string;
  platform: SocialPlatform;
  scheduled_date: string;
  publish_time: string;
  content_type: PostContentType;
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
  platform?: SocialPlatform;
  scheduled_date?: string;
  publish_time?: string;
  status?: PostStatus;
  content_type?: PostContentType;
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
  platform?: SocialPlatform;
  status?: PostStatus;
  content_type?: PostContentType;
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
