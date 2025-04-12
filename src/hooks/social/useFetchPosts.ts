
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { SocialMediaPost, SocialMediaCalendarFilters } from '@/types/socialMedia';
import { fetchSocialMediaPosts } from '@/services/socialMediaService';
import { handleApiError } from '@/utils/api/errorHandling';
import { logger } from '@/utils/loggingService';

/**
 * Hook for fetching social media posts
 */
export function useFetchPosts(filters: SocialMediaCalendarFilters) {
  const { profile } = useAuth();
  const [posts, setPosts] = useState<SocialMediaPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const companyId = profile?.company_id;
  
  /**
   * Fetch social media posts
   */
  const fetchPosts = useCallback(async () => {
    if (!companyId) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      logger.info('Fetching social media posts', { companyId, filters });
      const startTime = logger.time('fetchSocialMediaPosts');
      
      const fetchedPosts = await fetchSocialMediaPosts(companyId, filters);
      
      startTime(); // End timer
      setPosts(fetchedPosts);
      logger.info('Successfully fetched posts', { count: fetchedPosts.length });
    } catch (err: any) {
      handleApiError(err, {
        customMessage: 'Failed to fetch social media posts',
        showToast: true,
        logError: true
      });
      setError(err.message || 'Failed to fetch social media posts');
    } finally {
      setIsLoading(false);
    }
  }, [companyId, filters]);
  
  // Refresh posts function (can be called from other hooks)
  const refreshPosts = useCallback(() => {
    fetchPosts();
  }, [fetchPosts]);
  
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
