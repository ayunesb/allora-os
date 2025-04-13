
import { supabase } from '@/backend/supabase';
import { SocialMediaPost, CreatePostInput, SocialMediaCalendarFilters } from '@/types/socialMedia';
import { api } from '@/services/api/apiClient';

// Mock data for social media posts
const MOCK_POSTS: SocialMediaPost[] = [
  {
    id: "1",
    title: "New Product Launch",
    content: "We're excited to announce our new product line!",
    platform: "Facebook",
    status: "draft",
    scheduled_date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
    media_urls: [],
    content_type: "text",
    author_id: "user1",
    company_id: "company1",
    tags: ["product", "launch"]
  },
  {
    id: "2",
    title: "Summer Sale Promotion",
    content: "Get 30% off all summer items this week!",
    platform: "Instagram",
    status: "scheduled",
    scheduled_date: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString(),
    media_urls: ["https://example.com/summer.jpg"],
    content_type: "image",
    author_id: "user1",
    company_id: "company1",
    tags: ["sale", "summer"]
  },
  {
    id: "3",
    title: "Customer Testimonial",
    content: "Hear what our customers are saying about us!",
    platform: "LinkedIn",
    status: "published",
    scheduled_date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    published_date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    media_urls: ["https://example.com/testimonial.jpg"],
    content_type: "image",
    author_id: "user2",
    company_id: "company1",
    tags: ["testimonial", "customer"]
  },
  {
    id: "4",
    title: "Industry Tips",
    content: "Check out our top 5 industry tips for success!",
    platform: "Twitter",
    status: "draft",
    scheduled_date: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString(),
    media_urls: [],
    content_type: "text",
    author_id: "user2",
    company_id: "company1",
    tags: ["tips", "industry"]
  }
];

/**
 * Fetch all social media posts for a company with optional filters
 */
export async function fetchSocialMediaPosts(
  companyId: string, 
  filters?: SocialMediaCalendarFilters
): Promise<SocialMediaPost[]> {
  try {
    // Instead of querying Supabase, return mock data
    console.log('Using mock data for social media posts');
    
    // Apply filters to mock data
    let filteredPosts = [...MOCK_POSTS];
    
    if (filters) {
      if (filters.platform) {
        filteredPosts = filteredPosts.filter(post => 
          post.platform.toLowerCase() === filters.platform?.toLowerCase()
        );
      }
      
      if (filters.status) {
        filteredPosts = filteredPosts.filter(post => 
          post.status?.toLowerCase() === filters.status?.toLowerCase()
        );
      }
      
      if (filters.startDate && filters.endDate) {
        filteredPosts = filteredPosts.filter(post => {
          const postDate = new Date(post.scheduled_date);
          return postDate >= new Date(filters.startDate as string) && 
                 postDate <= new Date(filters.endDate as string);
        });
      } else if (filters.startDate) {
        filteredPosts = filteredPosts.filter(post => 
          new Date(post.scheduled_date) >= new Date(filters.startDate as string)
        );
      } else if (filters.endDate) {
        filteredPosts = filteredPosts.filter(post => 
          new Date(post.scheduled_date) <= new Date(filters.endDate as string)
        );
      }
      
      if (filters.search) {
        const search = filters.search.toLowerCase();
        filteredPosts = filteredPosts.filter(post => 
          post.title.toLowerCase().includes(search) || 
          post.content.toLowerCase().includes(search)
        );
      }
    }
    
    // Sort posts by scheduled date
    filteredPosts.sort((a, b) => 
      new Date(a.scheduled_date).getTime() - new Date(b.scheduled_date).getTime()
    );
    
    return Promise.resolve(filteredPosts);
    
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
    console.log('Creating mock post:', postData);
    
    // Generate a random ID
    const postId = Math.random().toString(36).substring(2, 15);
    
    // In a real app, we would store this in the database
    return { 
      success: true, 
      postId 
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
    console.log('Deleting mock post:', postId);
    
    // In a real app, we would delete this from the database
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
    console.log('Scheduling mock post:', postId);
    
    // In a real app, we would update this in the database
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
    console.log('Approving mock post:', postId, notes);
    
    // In a real app, we would update this in the database
    return { success: true };
  } catch (error: any) {
    return { 
      success: false, 
      error: error.message || 'Failed to approve post' 
    };
  }
}
