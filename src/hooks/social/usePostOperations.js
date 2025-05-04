import { useState } from 'react';
import { useApiClient } from '@/utils/api/enhancedApiClient';
import { toast } from 'sonner';
export function usePostOperations() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { execute } = useApiClient();
    const createPost = async (postData) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await execute('/api/social-posts', 'POST', postData);
            toast.success('Post created successfully');
            return result;
        }
        catch (err) {
            const errorMessage = err.message || 'Failed to create post';
            setError(errorMessage);
            toast.error(errorMessage);
            throw err;
        }
        finally {
            setIsLoading(false);
        }
    };
    const updatePost = async (id, postData) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await execute(`/api/social-posts/${id}`, 'PUT', postData);
            toast.success('Post updated successfully');
            return result;
        }
        catch (err) {
            const errorMessage = err.message || 'Failed to update post';
            setError(errorMessage);
            toast.error(errorMessage);
            throw err;
        }
        finally {
            setIsLoading(false);
        }
    };
    const deletePost = async (id) => {
        setIsLoading(true);
        setError(null);
        try {
            await execute(`/api/social-posts/${id}`, 'DELETE');
            toast.success('Post deleted successfully');
        }
        catch (err) {
            const errorMessage = err.message || 'Failed to delete post';
            setError(errorMessage);
            toast.error(errorMessage);
            throw err;
        }
        finally {
            setIsLoading(false);
        }
    };
    const uploadMedia = async (file) => {
        setIsLoading(true);
        setError(null);
        try {
            const formData = new FormData();
            formData.append('file', file);
            const result = await execute('/api/upload/social-media', 'POST', formData, {
                'Content-Type': 'multipart/form-data'
            });
            return result.url;
        }
        catch (err) {
            const errorMessage = err.message || 'Failed to upload media';
            setError(errorMessage);
            toast.error(errorMessage);
            throw err;
        }
        finally {
            setIsLoading(false);
        }
    };
    const schedulePost = async (id, scheduledDate) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await execute(`/api/social-posts/${id}/schedule`, 'POST', {
                scheduled_date: scheduledDate
            });
            toast.success('Post scheduled successfully');
            return result;
        }
        catch (err) {
            const errorMessage = err.message || 'Failed to schedule post';
            setError(errorMessage);
            toast.error(errorMessage);
            throw err;
        }
        finally {
            setIsLoading(false);
        }
    };
    const publishPost = async (id) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await execute(`/api/social-posts/${id}/publish`, 'POST');
            toast.success('Post published successfully');
            return result;
        }
        catch (err) {
            const errorMessage = err.message || 'Failed to publish post';
            setError(errorMessage);
            toast.error(errorMessage);
            throw err;
        }
        finally {
            setIsLoading(false);
        }
    };
    const getPresignedUrl = async (filename, contentType) => {
        try {
            const result = await execute('/api/upload/presigned-url', 'POST', {
                filename,
                contentType
            });
            return result.url;
        }
        catch (err) {
            const errorMessage = err.message || 'Failed to get upload URL';
            setError(errorMessage);
            toast.error(errorMessage);
            throw err;
        }
    };
    return {
        isLoading,
        error,
        createPost,
        updatePost,
        deletePost,
        uploadMedia,
        schedulePost,
        publishPost,
        getPresignedUrl
    };
}
