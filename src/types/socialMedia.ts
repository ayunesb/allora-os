
export type SocialMediaPlatform = 'Facebook' | 'Twitter' | 'LinkedIn' | 'Instagram' | 'Other';
export type PostStatus = 'draft' | 'scheduled' | 'published' | 'approved';

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
}
