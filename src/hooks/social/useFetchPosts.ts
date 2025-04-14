
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { SocialMediaPost, SocialMediaCalendarFilters } from '@/types/socialMedia';
import { fetchSocialMediaPosts } from '@/services/socialMediaService';
import { handleApiError } from '@/utils/api/errorHandling';
import { logger } from '@/utils/loggingService';
import { refreshData } from '@/utils/shared/dataRefresh';

/**
 * Hook for fetching social media posts
 * 
 * Handles loading, error states, and data refreshing for social media posts
 * based on the provided filters.
 */
export function useFetchPosts(filters: SocialMediaCalendarFilters) {
  const { profile } = useAuth();
  const [posts, setPosts] = useState<SocialMediaPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const companyId = profile?.company_id;
  
  /**
   * Fetch social media posts
   * 
   * Retrieves posts from the backend based on the current filters
   * and company ID.
   */
  const fetchPosts = useCallback(async () => {
    if (!companyId) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      logger.info('Fetching social media posts', { companyId, filters });
      
      // Create a timer to measure performance
      const endTimer = logger.time('fetchSocialMediaPosts');
      
      const fetchedPosts = await fetchSocialMediaPosts(companyId, filters);
      
      // End the timer
      endTimer();
      setPosts(fetchedPosts);
      logger.info('Successfully fetched posts', { count: fetchedPosts.length });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch social media posts';
      
      handleApiError(err, {
        customMessage: 'Failed to fetch social media posts',
        showToast: true,
        logError: true
      });
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [companyId, filters]);
  
  /**
   * Refreshes posts data
   * 
   * Can be called from parent components to trigger a refresh
   */
  const refreshPosts = useCallback(async (): Promise<void> => {
    return refreshData({
      fetchFn: async () => {
        const fetchedPosts = await fetchSocialMediaPosts(companyId as string, filters);
        setPosts(fetchedPosts);
      },
      onComplete: async () => { /* No additional actions needed */ },
      setIsRefreshing: setIsLoading,
      successMessage: 'Social media posts refreshed',
      errorMessage: 'Failed to refresh social media posts'
    });
  }, [companyId, filters]);
  
  // Initial fetch
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    posts,
    isLoading,
    error,
    refreshPosts
  };
}
