import { useState, useCallback } from 'react';
import { schedulePost, approvePost } from '@/services/socialMediaService';
import { handleApiError } from '@/utils/api/errorHandling';
import { toast } from 'sonner';
import { logger } from '@/utils/loggingService';
/**
 * Hook for social media post actions like scheduling and approving
 */
export function usePostActions(refreshPosts) {
    const [actionLoading, setActionLoading] = useState(null);
    // Schedule a post
    const schedule = useCallback(async (postId) => {
        setActionLoading(postId);
        logger.info('Scheduling post', { postId });
        try {
            const result = await schedulePost(postId);
            if (result.success) {
                toast.success('Post scheduled successfully');
                logger.info('Post scheduled successfully', { postId });
                refreshPosts(); // Refresh posts after scheduling
                return result;
            }
            else {
                toast.error(result.error || 'Failed to schedule post');
                logger.warn('Failed to schedule post', { postId, error: result.error });
                return result;
            }
        }
        catch (err) {
            handleApiError(err, {
                customMessage: 'Failed to schedule post',
                showToast: true,
                logError: true
            });
            return { success: false, error: err.message };
        }
        finally {
            setActionLoading(null);
        }
    }, [refreshPosts]);
    // Approve a post
    const approve = useCallback(async (postId, notes) => {
        setActionLoading(postId);
        logger.info('Approving post', { postId, notes });
        try {
            const result = await approvePost(postId, notes);
            if (result.success) {
                toast.success('Post approved successfully');
                logger.info('Post approved successfully', { postId });
                refreshPosts(); // Refresh posts after approval
                return result;
            }
            else {
                toast.error(result.error || 'Failed to approve post');
                logger.warn('Failed to approve post', { postId, error: result.error });
                return result;
            }
        }
        catch (err) {
            handleApiError(err, {
                customMessage: 'Failed to approve post',
                showToast: true,
                logError: true
            });
            return { success: false, error: err.message };
        }
        finally {
            setActionLoading(null);
        }
    }, [refreshPosts]);
    return {
        schedule,
        approve,
        actionLoading
    };
}
