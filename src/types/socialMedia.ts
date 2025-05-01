
import { 
  SocialPlatform, 
  ContentType, 
  PostStatus, 
  SocialMediaPost, 
  SocialMediaCalendarFilters 
} from './unified-types';

export type { 
  SocialPlatform, 
  ContentType, 
  PostStatus, 
  SocialMediaPost, 
  SocialMediaCalendarFilters 
};

// For backward compatibility
export type PostContentType = ContentType;

export interface SocialMediaContextType {
  posts: SocialMediaPost[];
  loading: boolean;
  error: string | null;
  createPost: (post: Partial<SocialMediaPost>) => Promise<void>;
  updatePost: (postId: string, post: Partial<SocialMediaPost>) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
  approvePost: (postId: string) => Promise<void>;
  schedulePost: (postId: string, scheduledDate: string) => Promise<void>;
  publishPost: (postId: string) => Promise<void>;
  fetchPosts: (filters?: SocialMediaCalendarFilters) => Promise<void>;
}

export interface PostFormData {
  title?: string;
  content?: string;
  platform?: SocialPlatform;
  scheduled_date?: string;
  publish_time?: string;
  content_type?: ContentType;
  media_urls?: string[];
  link_url?: string;
  campaign_id?: string;
  tags?: string[];
  is_approved?: boolean;
}
