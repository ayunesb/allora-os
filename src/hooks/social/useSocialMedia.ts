
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { SocialMediaPost, CreatePostInput, SocialMediaCalendarFilters } from '@/types/socialMedia';
import { useFilters } from './useFilters';
import { usePostOperations } from './usePostOperations';
import {
  fetchSocialMediaPosts,
  fetchSocialMediaPost,
  updateSocialMediaPost,
  deleteSocialMediaPost,
  schedulePost,
  approvePost
} from '@/services/socialMediaService';

export function useSocialMedia() {
  const { profile } = useAuth();
  const [posts, setPosts] = useState<SocialMediaPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<SocialMediaPost | null>(null);
  
  const { filters, setPostFilters, clearFilters } = useFilters();
  const { createPost, updatePost, deletePost } = usePostOperations();
  
  const companyId = profile?.company_id;
  
  /**
   * Fetch social media posts
   */
  const fetchPosts = useCallback(async () => {
    if (!companyId) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const fetchedPosts = await fetchSocialMediaPosts(companyId, filters);
      setPosts(fetchedPosts);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch social media posts');
      console.error('Error fetching social media posts:', err);
    } finally {
      setIsLoading(false);
    }
  }, [companyId, filters]);
  
  // Initial fetch
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Schedule a post
  const schedule = useCallback(async (postId: string) => {
    try {
      const result = await schedulePost(postId);
      if (result.success) {
        fetchPosts(); // Refresh posts after scheduling
      }
      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to schedule post');
      return { success: false, error: err.message };
    }
  }, [fetchPosts]);

  // Approve a post
  const approve = useCallback(async (postId: string, notes?: string) => {
    try {
      const result = await approvePost(postId, notes);
      if (result.success) {
        fetchPosts(); // Refresh posts after approval
      }
      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to approve post');
      return { success: false, error: err.message };
    }
  }, [fetchPosts]);

  return {
    posts,
    isLoading,
    error,
    filters,
    setPostFilters,
    clearFilters,
    createPost,
    updatePost,
    deletePost,
    schedule,
    approve
  };
}
