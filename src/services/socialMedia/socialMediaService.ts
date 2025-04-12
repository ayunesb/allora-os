
import { supabase } from '@/backend/supabase';
import { SocialMediaPost, CreatePostInput, SocialMediaCalendarFilters } from '@/types/socialMedia';
import { api } from '@/services/api/apiClient';

/**
 * Fetch all social media posts for a company with optional filters
 */
export async function fetchSocialMediaPosts(
  companyId: string, 
  filters?: SocialMediaCalendarFilters
): Promise<SocialMediaPost[]> {
  try {
    let query = supabase
      .from('social_media_posts')
      .select('*')
      .eq('company_id', companyId);
    
    // Apply filters if provided
    if (filters) {
      if (filters.platform) {
        query = query.eq('platform', filters.platform);
      }
      
      if (filters.status) {
        query = query.eq('status', filters.status);
      }
      
      if (filters.startDate && filters.endDate) {
        query = query.gte('scheduled_date', filters.startDate)
                     .lte('scheduled_date', filters.endDate);
      }
      
      if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%,content.ilike.%${filters.search}%`);
      }
    }
    
    // Order by scheduled date
    query = query.order('scheduled_date', { ascending: true });
    
    const { data, error } = await query;
    
    if (error) {
      throw error;
    }
    
    return data || [];
    
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}

/**
 * Create a new social media post
 */
export async function createSocialMediaPost(
  companyId: string,
  postData: CreatePostInput
): Promise<{ success: boolean; postId?: string; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('social_media_posts')
      .insert({
        company_id: companyId,
        title: postData.title,
        content: postData.content,
        platform: postData.platform,
        scheduled_date: postData.scheduled_date,
        publish_time: postData.publish_time,
        content_type: postData.content_type,
        media_urls: postData.media_urls || [],
        campaign_id: postData.campaign_id,
        status: 'Draft',
        is_approved: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select('id')
      .single();
      
    if (error) {
      throw error;
    }
    
    return { 
      success: true, 
      postId: data.id 
    };
  } catch (error: any) {
    return { 
      success: false, 
      error: error.message || 'Failed to create post' 
    };
  }
}

/**
 * Delete a social media post
 */
export async function deleteSocialMediaPost(
  postId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('social_media_posts')
      .delete()
      .eq('id', postId);
      
    if (error) {
      throw error;
    }
    
    return { success: true };
  } catch (error: any) {
    return { 
      success: false, 
      error: error.message || 'Failed to delete post' 
    };
  }
}

/**
 * Schedule a post for publication
 */
export async function schedulePost(
  postId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('social_media_posts')
      .update({
        status: 'Scheduled',
        updated_at: new Date().toISOString()
      })
      .eq('id', postId);
      
    if (error) {
      throw error;
    }
    
    return { success: true };
  } catch (error: any) {
    return { 
      success: false, 
      error: error.message || 'Failed to schedule post' 
    };
  }
}

/**
 * Approve a social media post
 */
export async function approvePost(
  postId: string,
  notes?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('social_media_posts')
      .update({
        is_approved: true,
        approval_notes: notes,
        updated_at: new Date().toISOString()
      })
      .eq('id', postId);
      
    if (error) {
      throw error;
    }
    
    return { success: true };
  } catch (error: any) {
    return { 
      success: false, 
      error: error.message || 'Failed to approve post' 
    };
  }
}
