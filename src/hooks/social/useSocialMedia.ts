
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { SocialMediaPost, CreatePostInput, SocialMediaCalendarFilters } from '@/types/socialMedia';
import { useFilters } from './useFilters';
import { usePostOperations } from './usePostOperations';
import { usePostActions } from './usePostActions';
import { useFetchPosts } from './useFetchPosts';
import { toast } from 'sonner';
import { handleApiError } from '@/utils/api/errorHandling';

/**
 * Main hook for social media functionality
 * Combines multiple specialized hooks into a single API
 */
export function useSocialMedia() {
  // Compose individual specialized hooks
  const { filters, setPostFilters, clearFilters } = useFilters();
  const { isLoading, error, posts, refreshPosts } = useFetchPosts(filters);
  const { createPost, updatePost, deletePost } = usePostOperations(refreshPosts);
  const { schedule, approve } = usePostActions(refreshPosts);

  return {
    // Data state
    posts,
    isLoading,
    error,
    
    // Filter management
    filters,
    setPostFilters,
    clearFilters,
    
    // Post CRUD operations
    createPost,
    updatePost,
    deletePost,
    
    // Post actions
    schedule,
    approve
  };
}
