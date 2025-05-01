
import { 
  SocialPlatform, 
  ContentType, 
  PostStatus, 
  SocialMediaPost, 
  SocialMediaCalendarFilters,
  CreatePostInput 
} from './unified-types';

export type { 
  SocialPlatform, 
  ContentType, 
  PostStatus, 
  SocialMediaPost, 
  SocialMediaCalendarFilters,
  CreatePostInput
};

// For backward compatibility
export type PostContentType = ContentType;

export interface SocialMediaContextType {
  posts: SocialMediaPost[];
  loading: boolean;
  isLoading: boolean;
  error: string | null;
  view: 'calendar' | 'list';
  currentMonth: Date;
  searchQuery: string;
  selectedPlatform: string;
  selectedStatus: string;
  setView: (view: 'calendar' | 'list') => void;
  setCurrentMonth: (date: Date) => void;
  setSearchQuery: (query: string) => void;
  setSelectedPlatform: (platform: string) => void;
  setSelectedStatus: (status: string) => void;
  setPostFilters: (filters: SocialMediaCalendarFilters) => void;
  clearFilters: () => void;
  isCreateDialogOpen: boolean;
  openCreateDialog: () => void;
  closeCreateDialog: () => void;
  createPost: (post: Partial<SocialMediaPost>) => Promise<void>;
  updatePost: (postId: string, post: Partial<SocialMediaPost>) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
  approve: (postId: string) => Promise<void>;
  schedule: (postId: string, scheduledDate?: string) => Promise<void>;
  fetchPosts: (filters?: SocialMediaCalendarFilters) => Promise<void>;
  refreshPosts?: () => Promise<void>;
}

export interface PostFormData {
  title?: string;
  content?: string;
  platform?: SocialPlatform;
  scheduled_date?: string | Date;
  publish_time?: string;
  content_type?: ContentType;
  media_urls?: string[];
  link_url?: string;
  campaign_id?: string;
  tags?: string[];
  is_approved?: boolean;
}
