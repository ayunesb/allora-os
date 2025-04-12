import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { 
  SocialMediaPost, 
  CreatePostInput, 
  UpdatePostInput, 
  SocialMediaCalendarFilters 
} from '@/types/socialMedia';
import {
  fetchSocialMediaPosts,
  fetchSocialMediaPost,
  createSocialMediaPost,
  updateSocialMediaPost,
  deleteSocialMediaPost,
  schedulePost,
  approvePost
} from '@/services/socialMediaService';

/**
 * Hook for managing social media posts
 * @returns Object containing social media posts and related functions
 */
export function useSocialMedia() {
  const { profile } = useAuth();
  const [posts, setPosts] = useState<SocialMediaPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<SocialMediaCalendarFilters>({});
  const [selectedPost, setSelectedPost] = useState<SocialMediaPost | null>(null);
  
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
  
  /**
   * Create a new social media post
   */
  const createPost = useCallback(async (postData: CreatePostInput) => {
    if (!companyId) return { success: false, error: 'No company ID available' };
    
    setIsLoading(true);
    
    try {
      const result = await createSocialMediaPost(companyId, postData);
      
      if (result.success && result.postId) {
        // Fetch updated posts list
        fetchPosts();
      }
      
      return result;
    } catch (err: any) {
      console.error('Error creating social media post:', err);
      return { success: false, error: err.message || 'Failed to create post' };
    } finally {
      setIsLoading(false);
    }
  }, [companyId, fetchPosts]);
  
  /**
   * Update an existing social media post
   */
  const updatePost = useCallback(async (postData: UpdatePostInput) => {
    setIsLoading(true);
    
    try {
      const result = await updateSocialMediaPost(postData);
      
      if (result.success) {
        // Update the local state
        setPosts(currentPosts => 
          currentPosts.map(post => 
            post.id === postData.id 
              ? { ...post, ...postData, updated_at: new Date().toISOString() } 
              : post
          )
        );
        
        // If the selected post is being updated, update that too
        if (selectedPost && selectedPost.id === postData.id) {
          setSelectedPost(prevPost => prevPost ? { ...prevPost, ...postData, updated_at: new Date().toISOString() } : null);
        }
      }
      
      return result;
    } catch (err: any) {
      console.error('Error updating social media post:', err);
      return { success: false, error: err.message || 'Failed to update post' };
    } finally {
      setIsLoading(false);
    }
  }, [selectedPost]);
  
  /**
   * Delete a social media post
   */
  const deletePost = useCallback(async (postId: string) => {
    setIsLoading(true);
    
    try {
      const result = await deleteSocialMediaPost(postId);
      
      if (result.success) {
        // Remove the post from local state
        setPosts(currentPosts => currentPosts.filter(post => post.id !== postId));
        
        // If the selected post is being deleted, clear it
        if (selectedPost && selectedPost.id === postId) {
          setSelectedPost(null);
        }
      }
      
      return result;
    } catch (err: any) {
      console.error('Error deleting social media post:', err);
      return { success: false, error: err.message || 'Failed to delete post' };
    } finally {
      setIsLoading(false);
    }
  }, [selectedPost]);
  
  /**
   * Schedule a post for publication
   */
  const schedule = useCallback(async (postId: string) => {
    setIsLoading(true);
    
    try {
      const result = await schedulePost(postId);
      
      if (result.success) {
        // Update the post status in local state
        setPosts(currentPosts => 
          currentPosts.map(post => 
            post.id === postId 
              ? { ...post, status: 'scheduled', updated_at: new Date().toISOString() } 
              : post
          )
        );
        
        // Update selected post if needed
        if (selectedPost && selectedPost.id === postId) {
          setSelectedPost(prevPost => 
            prevPost ? { ...prevPost, status: 'scheduled', updated_at: new Date().toISOString() } : null
          );
        }
      }
      
      return result;
    } catch (err: any) {
      console.error('Error scheduling post:', err);
      return { success: false, error: err.message || 'Failed to schedule post' };
    } finally {
      setIsLoading(false);
    }
  }, [selectedPost]);
  
  /**
   * Approve a post
   */
  const approve = useCallback(async (postId: string, notes?: string) => {
    setIsLoading(true);
    
    try {
      const result = await approvePost(postId, notes);
      
      if (result.success) {
        // Update the post approval status in local state
        setPosts(currentPosts => 
          currentPosts.map(post => 
            post.id === postId 
              ? { ...post, is_approved: true, approval_notes: notes, updated_at: new Date().toISOString() } 
              : post
          )
        );
        
        // Update selected post if needed
        if (selectedPost && selectedPost.id === postId) {
          setSelectedPost(prevPost => 
            prevPost ? { ...prevPost, is_approved: true, approval_notes: notes, updated_at: new Date().toISOString() } : null
          );
        }
      }
      
      return result;
    } catch (err: any) {
      console.error('Error approving post:', err);
      return { success: false, error: err.message || 'Failed to approve post' };
    } finally {
      setIsLoading(false);
    }
  }, [selectedPost]);
  
  /**
   * Get a post by ID
   */
  const getPost = useCallback(async (postId: string) => {
    setIsLoading(true);
    
    try {
      // First check if we already have it in our state
      const existingPost = posts.find(post => post.id === postId);
      if (existingPost) {
        setSelectedPost(existingPost);
        return existingPost;
      }
      
      // Otherwise fetch it
      const post = await fetchSocialMediaPost(postId);
      if (post) {
        setSelectedPost(post);
      }
      return post;
    } catch (err: any) {
      console.error(`Error fetching post ${postId}:`, err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [posts]);
  
  /**
   * Set filters for fetching posts
   */
  const setPostFilters = useCallback((newFilters: SocialMediaCalendarFilters) => {
    setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
  }, []);
  
  /**
   * Clear all filters
   */
  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);
  
  return {
    posts,
    isLoading,
    error,
    filters,
    selectedPost,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
    schedule,
    approve,
    getPost,
    setSelectedPost,
    setPostFilters,
    clearFilters
  };
}
