import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SocialMediaPost, SocialPlatform, ContentType, PostStatus, SocialMediaCalendarFilters } from '@/types/unified-types';
import { toast } from 'sonner';

export interface SocialMediaContextType {
  posts: SocialMediaPost[];
  loading: boolean;
  isLoading: boolean;
  error: string | null;
  view: 'calendar' | 'list';
  setView: (view: 'calendar' | 'list') => void;
  currentMonth: Date;
  setCurrentMonth: (date: Date) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedPlatform: string;
  setSelectedPlatform: (platform: string) => void;
  selectedStatus: string;
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

const SocialMediaContext = createContext<SocialMediaContextType | undefined>(undefined);

export function SocialMediaProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<SocialMediaPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<'calendar' | 'list'>('calendar');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Filter handlers
  const setPostFilters = (filters: SocialMediaCalendarFilters) => {
    console.log('Applying filters:', filters);
    fetchPosts(filters);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedPlatform('');
    setSelectedStatus('');
    fetchPosts();
  };

  // Dialog handlers
  const openCreateDialog = () => {
    setIsCreateDialogOpen(true);
  };

  const closeCreateDialog = () => {
    setIsCreateDialogOpen(false);
  };

  // API handlers
  const fetchPosts = async (filters?: SocialMediaCalendarFilters) => {
    setLoading(true);
    try {
      // This would be an actual API call in a real implementation
      const mockPosts: SocialMediaPost[] = [
        {
          id: '1',
          platform: 'LinkedIn',
          content: 'Check out our new product launch!',
          content_type: 'text',
          status: 'published',
          is_approved: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '2',
          platform: 'Twitter',
          content: 'Exciting news coming soon!',
          content_type: 'text',
          status: 'scheduled',
          scheduled_at: new Date(Date.now() + 86400000).toISOString(),
          is_approved: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
      
      setPosts(mockPosts);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to load posts');
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (post: Partial<SocialMediaPost>) => {
    setLoading(true);
    try {
      // Mock API call
      const newPost: SocialMediaPost = {
        id: Date.now().toString(),
        ...post,
        status: post.status || 'draft',
        is_approved: post.is_approved || false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        platform: post.platform || 'LinkedIn',
        content: post.content || '',
        content_type: post.content_type || 'text'
      };
      
      setPosts([...posts, newPost]);
      toast.success('Post created successfully');
      closeCreateDialog();
    } catch (err: any) {
      setError(err.message || 'Failed to create post');
      toast.error('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  const updatePost = async (postId: string, updatedPost: Partial<SocialMediaPost>) => {
    setLoading(true);
    try {
      // Mock API call
      const updatedPosts = posts.map(post => 
        post.id === postId ? { ...post, ...updatedPost, updated_at: new Date().toISOString() } : post
      );
      
      setPosts(updatedPosts);
      toast.success('Post updated successfully');
    } catch (err: any) {
      setError(err.message || 'Failed to update post');
      toast.error('Failed to update post');
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (postId: string) => {
    setLoading(true);
    try {
      // Mock API call
      const filteredPosts = posts.filter(post => post.id !== postId);
      setPosts(filteredPosts);
      toast.success('Post deleted successfully');
    } catch (err: any) {
      setError(err.message || 'Failed to delete post');
      toast.error('Failed to delete post');
    } finally {
      setLoading(false);
    }
  };

  const schedule = async (postId: string, scheduledDate?: string) => {
    setLoading(true);
    try {
      // Mock API call
      const updatedPosts = posts.map(post => 
        post.id === postId ? { 
          ...post, 
          status: 'scheduled' as PostStatus, 
          scheduled_at: scheduledDate || new Date().toISOString(),
          updated_at: new Date().toISOString() 
        } : post
      );
      
      setPosts(updatedPosts);
      toast.success('Post scheduled successfully');
    } catch (err: any) {
      setError(err.message || 'Failed to schedule post');
      toast.error('Failed to schedule post');
    } finally {
      setLoading(false);
    }
  };

  const approve = async (postId: string) => {
    setLoading(true);
    try {
      // Mock API call
      const updatedPosts = posts.map(post => 
        post.id === postId ? { 
          ...post, 
          is_approved: true,
          updated_at: new Date().toISOString() 
        } : post
      );
      
      setPosts(updatedPosts);
      toast.success('Post approved successfully');
    } catch (err: any) {
      setError(err.message || 'Failed to approve post');
      toast.error('Failed to approve post');
    } finally {
      setLoading(false);
    }
  };

  // Add an alias to ensure isLoading is available
  const isLoading = loading;

  // Define refreshPosts
  const refreshPosts = async () => {
    return fetchPosts();
  };

  const value = {
    posts,
    loading,
    isLoading,
    error,
    view,
    setView,
    currentMonth,
    setCurrentMonth,
    searchQuery,
    setSearchQuery,
    selectedPlatform,
    setSelectedPlatform,
    selectedStatus,
    setSelectedStatus,
    setPostFilters,
    clearFilters,
    isCreateDialogOpen,
    openCreateDialog,
    closeCreateDialog,
    createPost,
    updatePost,
    deletePost,
    schedule,
    approve,
    fetchPosts,
    refreshPosts
  };

  return (
    <SocialMediaContext.Provider value={value}>
      {children}
    </SocialMediaContext.Provider>
  );
}

export const useSocialMediaContext = () => {
  const context = useContext(SocialMediaContext);
  if (!context) {
    throw new Error('useSocialMediaContext must be used within a SocialMediaProvider');
  }
  return context;
};
