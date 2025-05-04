import { SocialMediaPost, CreatePostInput, SocialMediaCalendarFilters } from '@/types/socialMedia';
/**
 * Fetch all social media posts for a company with optional filters
 */
export declare function fetchSocialMediaPosts(companyId: string, filters?: SocialMediaCalendarFilters): Promise<SocialMediaPost[]>;
/**
 * Create a new social media post
 */
export declare function createSocialMediaPost(companyId: string, postData: CreatePostInput): Promise<{
    success: boolean;
    postId?: string;
    error?: string;
}>;
/**
 * Delete a social media post
 */
export declare function deleteSocialMediaPost(postId: string): Promise<{
    success: boolean;
    error?: string;
}>;
/**
 * Schedule a post for publication
 */
export declare function schedulePost(postId: string): Promise<{
    success: boolean;
    error?: string;
}>;
/**
 * Approve a social media post
 */
export declare function approvePost(postId: string, notes?: string): Promise<{
    success: boolean;
    error?: string;
}>;
