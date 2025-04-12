
import { supabase } from '@/backend/supabase';
import { toast } from 'sonner';
import { SocialMediaPost, CreatePostInput, UpdatePostInput, SocialMediaCalendarFilters } from '@/types/socialMedia';

/**
 * Fetch all social media posts for a company
 * @param companyId - The ID of the company
 * @param filters - Optional filters to apply to the query
 * @returns Promise with array of social media posts
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
      
      if (filters.content_type) {
        query = query.eq('content_type', filters.content_type);
      }
      
      if (filters.campaign_id) {
        query = query.eq('campaign_id', filters.campaign_id);
      }
      
      if (filters.startDate && filters.endDate) {
        query = query.gte('scheduled_date', filters.startDate)
                     .lte('scheduled_date', filters.endDate);
      } else if (filters.startDate) {
        query = query.gte('scheduled_date', filters.startDate);
      } else if (filters.endDate) {
        query = query.lte('scheduled_date', filters.endDate);
      }
      
      if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%,content.ilike.%${filters.search}%`);
      }
    }
    
    // Order by scheduled date
    query = query.order('scheduled_date', { ascending: true });
    
    const { data, error } = await query;
    
    if (error) throw error;
    
    return data as SocialMediaPost[];
  } catch (error: any) {
    console.error('Error fetching social media posts:', error.message);
    return [];
  }
}

/**
 * Fetch a single social media post by ID
 * @param postId - The ID of the post
 * @returns Promise with the post or null if not found
 */
export async function fetchSocialMediaPost(postId: string): Promise<SocialMediaPost | null> {
  try {
    const { data, error } = await supabase
      .from('social_media_posts')
      .select('*')
      .eq('id', postId)
      .single();
    
    if (error) throw error;
    
    return data as SocialMediaPost;
  } catch (error: any) {
    console.error(`Error fetching social media post ${postId}:`, error.message);
    return null;
  }
}

/**
 * Create a new social media post
 * @param companyId - The ID of the company
 * @param postData - Data for the new post
 * @returns Promise with success status and post ID
 */
export async function createSocialMediaPost(
  companyId: string,
  postData: CreatePostInput
): Promise<{ success: boolean; postId?: string; error?: string }> {
  try {
    // Validate the input data
    if (!postData.title || !postData.content || !postData.platform || !postData.scheduled_date) {
      throw new Error('Missing required fields for social media post');
    }
    
    // Insert post into database
    const { data, error } = await supabase
      .from('social_media_posts')
      .insert({
        company_id: companyId,
        title: postData.title,
        content: postData.content,
        platform: postData.platform,
        scheduled_date: postData.scheduled_date,
        publish_time: postData.publish_time,
        status: 'draft', // Default status
        content_type: postData.content_type,
        media_urls: postData.media_urls,
        campaign_id: postData.campaign_id,
        is_approved: postData.is_approved || false,
        tags: postData.tags || []
      })
      .select('id')
      .single();
    
    if (error) throw error;
    
    toast.success('Social media post created successfully');
    return { success: true, postId: data.id };
  } catch (error: any) {
    toast.error(`Failed to create social media post: ${error.message}`);
    return { success: false, error: error.message };
  }
}

/**
 * Update an existing social media post
 * @param postData - Updated post data
 * @returns Promise with success status
 */
export async function updateSocialMediaPost(
  postData: UpdatePostInput
): Promise<{ success: boolean; error?: string }> {
  try {
    // Validate the input data
    if (!postData.id) {
      throw new Error('Post ID is required for update');
    }
    
    // Update post in database
    const { error } = await supabase
      .from('social_media_posts')
      .update({
        title: postData.title,
        content: postData.content,
        platform: postData.platform,
        scheduled_date: postData.scheduled_date,
        publish_time: postData.publish_time,
        status: postData.status,
        content_type: postData.content_type,
        media_urls: postData.media_urls,
        campaign_id: postData.campaign_id,
        is_approved: postData.is_approved,
        approval_notes: postData.approval_notes,
        tags: postData.tags,
        updated_at: new Date().toISOString()
      })
      .eq('id', postData.id);
    
    if (error) throw error;
    
    toast.success('Social media post updated successfully');
    return { success: true };
  } catch (error: any) {
    toast.error(`Failed to update social media post: ${error.message}`);
    return { success: false, error: error.message };
  }
}

/**
 * Delete a social media post
 * @param postId - The ID of the post to delete
 * @returns Promise with success status
 */
export async function deleteSocialMediaPost(
  postId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('social_media_posts')
      .delete()
      .eq('id', postId);
    
    if (error) throw error;
    
    toast.success('Social media post deleted successfully');
    return { success: true };
  } catch (error: any) {
    toast.error(`Failed to delete social media post: ${error.message}`);
    return { success: false, error: error.message };
  }
}

/**
 * Schedule a post for publication
 * @param postId - The ID of the post to schedule
 * @returns Promise with success status
 */
export async function schedulePost(
  postId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('social_media_posts')
      .update({
        status: 'scheduled',
        updated_at: new Date().toISOString()
      })
      .eq('id', postId);
    
    if (error) throw error;
    
    toast.success('Post scheduled successfully');
    return { success: true };
  } catch (error: any) {
    toast.error(`Failed to schedule post: ${error.message}`);
    return { success: false, error: error.message };
  }
}

/**
 * Approve a social media post
 * @param postId - The ID of the post to approve
 * @param notes - Optional approval notes
 * @returns Promise with success status
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
    
    if (error) throw error;
    
    toast.success('Post approved successfully');
    return { success: true };
  } catch (error: any) {
    toast.error(`Failed to approve post: ${error.message}`);
    return { success: false, error: error.message };
  }
}
