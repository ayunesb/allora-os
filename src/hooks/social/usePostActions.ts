
import { useState, useCallback } from 'react';
import { schedulePost, approvePost } from '@/services/socialMediaService';
import { handleApiError } from '@/utils/api/errorHandling';
import { toast } from 'sonner';

/**
 * Hook for social media post actions like scheduling and approving
 */
export function usePostActions(refreshPosts: () => void) {
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  
  // Schedule a post
  const schedule = useCallback(async (postId: string) => {
    setActionLoading(postId);
    
    try {
      const result = await schedulePost(postId);
      
      if (result.success) {
        toast.success('Post scheduled successfully');
        refreshPosts(); // Refresh posts after scheduling
        return result;
      } else {
        toast.error(result.error || 'Failed to schedule post');
        return result;
      }
    } catch (err: any) {
      handleApiError(err, {
        customMessage: 'Failed to schedule post',
        showToast: true,
        logError: true
      });
      return { success: false, error: err.message };
    } finally {
      setActionLoading(null);
    }
  }, [refreshPosts]);

  // Approve a post
  const approve = useCallback(async (postId: string, notes?: string) => {
    setActionLoading(postId);
    
    try {
      const result = await approvePost(postId, notes);
      
      if (result.success) {
        toast.success('Post approved successfully');
        refreshPosts(); // Refresh posts after approval
        return result;
      } else {
        toast.error(result.error || 'Failed to approve post');
        return result;
      }
    } catch (err: any) {
      handleApiError(err, {
        customMessage: 'Failed to approve post',
        showToast: true,
        logError: true
      });
      return { success: false, error: err.message };
    } finally {
      setActionLoading(null);
    }
  }, [refreshPosts]);

  return {
    schedule,
    approve,
    actionLoading
  };
}
