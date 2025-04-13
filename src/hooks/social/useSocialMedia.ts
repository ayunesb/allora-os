
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { SocialMediaPost, CreatePostInput, SocialMediaCalendarFilters } from '@/types/socialMedia';
import { 
  fetchSocialMediaPosts, 
  createSocialMediaPost, 
  deleteSocialMediaPost,
  schedulePost,
  approvePost
} from '@/services/socialMedia/socialMediaService';
import { logger } from '@/utils/loggingService';
import { toast } from 'sonner';

/**
 * Main hook for social media functionality
 */
export function useSocialMedia() {
  const { profile } = useAuth();
  const companyId = profile?.company_id;
  
  // State
  const [posts, setPosts] = useState<SocialMediaPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | string | null>(null);
  const [filters, setFilters] = useState<SocialMediaCalendarFilters>({});
  
  // Fetch posts whenever filters or company ID changes
  useEffect(() => {
    async function loadPosts() {
      if (!companyId) {
        setError('No company ID available. Please complete your profile setup.');
        return;
      }
      
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await fetchSocialMediaPosts(companyId, filters);
        setPosts(data);
      } catch (err: any) {
        logger.error('Failed to fetch social media posts', err);
        // Provide a more user-friendly error message
        setError(new Error('Unable to load posts. The social media feature might not be fully set up.'));
        // Set empty posts array to prevent undefined errors
        setPosts([]);
        toast.error('Could not load social media posts');
      } finally {
        setIsLoading(false);
      }
    }
    
    loadPosts();
  }, [companyId, filters]);
  
  // Set filters with a clean API
  const setPostFilters = useCallback((newFilters: SocialMediaCalendarFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);
  
  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);
  
  // Refresh posts
  const refreshPosts = useCallback(async () => {
    if (!companyId) {
      toast.error('No company ID available');
      return;
    }
    
    setIsLoading(true);
    try {
      const data = await fetchSocialMediaPosts(companyId, filters);
      setPosts(data);
      toast.success('Posts refreshed successfully');
    } catch (err: any) {
      logger.error('Failed to refresh social media posts', err);
      toast.error('Failed to refresh posts');
      // Don't update the error state during refresh to prevent UI flicker
    } finally {
      setIsLoading(false);
    }
  }, [companyId, filters]);
  
  // Create a new post
  const createPost = useCallback(async (postData: CreatePostInput) => {
    if (!companyId) {
      toast.error('No company ID available');
      return { success: false, error: 'No company ID available' };
    }
    
    const result = await createSocialMediaPost(companyId, postData);
    
    if (result.success) {
      toast.success('Post created successfully');
      refreshPosts();
    } else {
      toast.error(result.error || 'Failed to create post');
    }
    
    return result;
  }, [companyId, refreshPosts]);
  
  // Delete a post
  const deletePost = useCallback(async (postId: string) => {
    const result = await deleteSocialMediaPost(postId);
    
    if (result.success) {
      toast.success('Post deleted successfully');
      refreshPosts();
    } else {
      toast.error(result.error || 'Failed to delete post');
    }
    
    return result;
  }, [refreshPosts]);
  
  // Schedule a post
  const schedulePostAction = useCallback(async (postId: string) => {
    const result = await schedulePost(postId);
    
    if (result.success) {
      toast.success('Post scheduled successfully');
      refreshPosts();
    } else {
      toast.error(result.error || 'Failed to schedule post');
    }
    
    return result;
  }, [refreshPosts]);
  
  // Approve a post
  const approvePostAction = useCallback(async (postId: string) => {
    const result = await approvePost(postId);
    
    if (result.success) {
      toast.success('Post approved successfully');
      refreshPosts();
    } else {
      toast.error(result.error || 'Failed to approve post');
    }
    
    return result;
  }, [refreshPosts]);
  
  return {
    // Data
    posts,
    isLoading,
    error,
    
    // Filters
    filters,
    setPostFilters,
    clearFilters,
    
    // CRUD operations
    createPost,
    deletePost,
    refreshPosts,
    
    // Post actions
    schedule: schedulePostAction,
    approve: approvePostAction
  };
}
