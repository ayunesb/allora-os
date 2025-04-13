
import React, { createContext, useContext, ReactNode, useState, useCallback, useEffect } from 'react';
import { SocialMediaPost, SocialPlatform, PostStatus, SocialMediaCalendarFilters } from '@/types/socialMedia';
import { useSocialMedia } from '@/hooks/social/useSocialMedia';
import { toast } from 'sonner';

interface SocialMediaContextType {
  // Data
  posts: SocialMediaPost[];
  isLoading: boolean;
  error: Error | string | null;
  
  // Filters
  filters: SocialMediaCalendarFilters;
  setPostFilters: (filters: SocialMediaCalendarFilters) => void;
  clearFilters: () => void;
  
  // View state
  view: 'calendar' | 'list';
  setView: (view: 'calendar' | 'list') => void;
  currentMonth: Date;
  setCurrentMonth: (date: Date) => void;
  
  // Post operations
  createPost: (data: any) => Promise<{ success: boolean; postId?: string; error?: string }>;
  deletePost: (id: string) => Promise<{ success: boolean; error?: string }>;
  schedule: (id: string) => Promise<{ success: boolean; error?: string }>;
  approve: (id: string) => Promise<{ success: boolean; error?: string }>;
  refreshPosts: () => Promise<void>;
  
  // Dialog state
  isCreateDialogOpen: boolean;
  openCreateDialog: () => void;
  closeCreateDialog: () => void;
  
  // Search state
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedPlatform: string;
  setSelectedPlatform: (platform: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
}

const SocialMediaContext = createContext<SocialMediaContextType | undefined>(undefined);

export function SocialMediaProvider({ children }: { children: ReactNode }) {
  // Social media data from hook
  const {
    posts,
    isLoading,
    error,
    filters,
    setPostFilters,
    clearFilters,
    createPost,
    deletePost,
    schedule,
    approve,
    refreshPosts
  } = useSocialMedia();
  
  // Local UI state
  const [view, setView] = useState<'calendar' | 'list'>('calendar');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  
  // Dialog handlers
  const openCreateDialog = useCallback(() => setIsCreateDialogOpen(true), []);
  const closeCreateDialog = useCallback(() => setIsCreateDialogOpen(false), []);
  
  // Create post wrapper
  const handleCreatePost = useCallback(async (data: any) => {
    const result = await createPost({
      title: data.title,
      content: data.content,
      platform: data.platform,
      scheduled_date: data.scheduled_date,
      publish_time: data.publish_time,
      content_type: data.content_type,
      media_urls: data.media_urls,
      campaign_id: data.campaign_id,
      tags: data.tags
    });
    
    if (result.success) {
      toast.success('Post created successfully');
      closeCreateDialog();
    } else {
      toast.error(result.error || 'Failed to create post');
    }
    
    return result;
  }, [createPost, closeCreateDialog]);
  
  const value: SocialMediaContextType = {
    posts,
    isLoading,
    error,
    filters,
    setPostFilters,
    clearFilters,
    view,
    setView,
    currentMonth,
    setCurrentMonth,
    createPost: handleCreatePost,
    deletePost,
    schedule,
    approve,
    refreshPosts,
    isCreateDialogOpen,
    openCreateDialog,
    closeCreateDialog,
    searchQuery,
    setSearchQuery,
    selectedPlatform,
    setSelectedPlatform,
    selectedStatus,
    setSelectedStatus
  };
  
  return (
    <SocialMediaContext.Provider value={value}>
      {children}
    </SocialMediaContext.Provider>
  );
}

export function useSocialMediaContext() {
  const context = useContext(SocialMediaContext);
  if (context === undefined) {
    throw new Error('useSocialMediaContext must be used within a SocialMediaProvider');
  }
  return context;
}
