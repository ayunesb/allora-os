import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { SocialMediaPost, CreatePostInput, UpdatePostInput } from '@/types/socialMedia';
import { logger } from '@/utils/loggingService';
import { validateCreatePost, validateUpdatePost, validateMediaUrl } from '@/utils/validators/socialMediaValidator';
import { clearApiCache } from '@/utils/api/apiClient';

export function usePostOperations() {
  const createPost = useCallback(async (postData: CreatePostInput) => {
    try {
      // Validate the input data
      const validation = validateCreatePost(postData);

      if (!validation.valid || !validation.data) {
        return {
          success: false,
          error: 'Invalid post data',
          validationErrors: validation.errors
        };
      }

      // Validated and sanitized data
      const validatedData = validation.data;

      // Additional validation for media URLs
      if (validatedData.media_urls?.length) {
        const invalidUrls = validatedData.media_urls.filter(url => !validateMediaUrl(url));
        if (invalidUrls.length > 0) {
          return {
            success: false,
            error: 'One or more media URLs are invalid or from untrusted sources',
            validationErrors: {
              media_urls: 'Contains invalid or untrusted URLs'
            }
          };
        }
      }

      // Get the company ID (assuming it's stored in local storage or context)
      const companyId = localStorage.getItem('companyId'); // Replace with your actual method

      if (!companyId) {
        return { success: false, error: 'Company ID not found' };
      }

      // Insert post into database
      const { data, error } = await supabase
        .from('social_media_posts')
        .insert({
          company_id: companyId,
          title: validatedData.title,
          content: validatedData.content,
          platform: validatedData.platform,
          scheduled_date: validatedData.scheduled_date,
          publish_time: validatedData.publish_time,
          status: 'draft', // Default status
          content_type: validatedData.content_type,
          media_urls: validatedData.media_urls,
          campaign_id: validatedData.campaign_id,
          is_approved: validatedData.is_approved || false,
          tags: validatedData.tags || [],
          mentions: validatedData.mentions || [],
          hashtags: validatedData.hashtags || [],
          location: validatedData.location,
          link_url: validatedData.link_url,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select('id')
        .single();

      if (error) throw error;

      // Clear any cached data to ensure fresh data
      // clearApiCache(getSocialMediaCacheKey(companyId));

      // Log the successful creation
      logger.info('Social media post created', {
        companyId,
        postId: data?.id,
        platform: validatedData.platform
      });

      return {
        success: true,
        postId: data?.id
      };
    } catch (error: any) {
      logger.error('Error creating social media post', error);
      return { success: false, error: error.message };
    }
  }, []);

  const updatePost = useCallback(async (postData: UpdatePostInput) => {
    try {
      // Validate the input data
      const validation = validateUpdatePost(postData);

      if (!validation.valid || !validation.data) {
        return {
          success: false,
          error: 'Invalid post update data',
          validationErrors: validation.errors
        };
      }

      // Validated and sanitized data
      const validatedData = validation.data;

      // Additional validation for media URLs if provided
      if (validatedData.media_urls?.length) {
        const invalidUrls = validatedData.media_urls.filter(url => !validateMediaUrl(url));
        if (invalidUrls.length > 0) {
          return {
            success: false,
            error: 'One or more media URLs are invalid or from untrusted sources',
            validationErrors: {
              media_urls: 'Contains invalid or untrusted URLs'
            }
          };
        }
      }

      // Update post in database
      const { error } = await supabase
        .from('social_media_posts')
        .update({
          title: validatedData.title,
          content: validatedData.content,
          platform: validatedData.platform,
          scheduled_date: validatedData.scheduled_date,
          publish_time: validatedData.publish_time,
          status: validatedData.status,
          content_type: validatedData.content_type,
          media_urls: validatedData.media_urls,
          campaign_id: validatedData.campaign_id,
          is_approved: validatedData.is_approved,
          approval_notes: validatedData.approval_notes,
          tags: validatedData.tags,
          mentions: validatedData.mentions,
          hashtags: validatedData.hashtags,
          location: validatedData.location,
          link_url: validatedData.link_url,
          updated_at: new Date().toISOString()
        })
        .eq('id', validatedData.id);

      if (error) throw error;

      // Clear the specific post cache and the posts list cache
      // clearApiCache(`social_media_post_${validatedData.id}`);
      // if (currentPost.company_id) {
      //   clearApiCache(getSocialMediaCacheKey(currentPost.company_id));
      // }

      // Log the successful update
      logger.info('Social media post updated', {
        postId: validatedData.id,
        fieldCount: Object.keys(validatedData).length - 1 // Exclude the ID
      });

      return { success: true };
    } catch (error: any) {
      logger.error('Error updating social media post', error);
      return { success: false, error: error.message };
    }
  }, []);

  const deletePost = useCallback(async (postId: string) => {
    try {
      // Delete the post
      const { error } = await supabase
        .from('social_media_posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;

      // Clear the specific post cache and the posts list cache
      // clearApiCache(`social_media_post_${postId}`);
      // clearApiCache(getSocialMediaCacheKey(post.company_id));

      // Log the successful deletion
      logger.info('Social media post deleted', { postId });

      return { success: true };
    } catch (error: any) {
      logger.error('Error deleting social media post', error);
      return { success: false, error: error.message };
    }
  }, []);

  return {
    createPost,
    updatePost,
    deletePost
  };
}
