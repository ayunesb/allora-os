/**
 * Social Media Service
 *
 * This service handles interactions with the social media posts database table.
 * It includes comprehensive validation and security checks for all operations.
 */
import { SocialMediaPost, CreatePostInput, UpdatePostInput, SocialMediaCalendarFilters, BatchPostResponse } from '@/types/socialMedia';
/**
 * Fetch all social media posts for a company with optional filters
 *
 * @param companyId - The ID of the company
 * @param filters - Optional filters to apply to the query
 * @returns Promise with array of social media posts
 */
export declare function fetchSocialMediaPosts(companyId: string, filters?: SocialMediaCalendarFilters): Promise<SocialMediaPost[]>;
/**
 * Fetch a single social media post by ID
 *
 * @param postId - The ID of the post
 * @returns Promise with the post or null if not found
 */
export declare function fetchSocialMediaPost(postId: string): Promise<SocialMediaPost | null>;
/**
 * Create a new social media post with validation
 *
 * @param companyId - The ID of the company
 * @param postData - Data for the new post
 * @returns Promise with success status and post ID or error details
 */
export declare function createSocialMediaPost(companyId: string, postData: CreatePostInput): Promise<{
    success: boolean;
    postId?: string;
    error?: string;
    validationErrors?: Record<string, string>;
}>;
/**
 * Update an existing social media post with validation
 *
 * @param postData - Updated post data
 * @returns Promise with success status or error details
 */
export declare function updateSocialMediaPost(postData: UpdatePostInput): Promise<{
    success: boolean;
    error?: string;
    validationErrors?: Record<string, string>;
}>;
/**
 * Delete a social media post
 *
 * @param postId - The ID of the post to delete
 * @returns Promise with success status or error message
 */
export declare function deleteSocialMediaPost(postId: string): Promise<{
    success: boolean;
    error?: string;
}>;
/**
 * Schedule a post for publication
 *
 * @param postId - The ID of the post to schedule
 * @returns Promise with success status or error message
 */
export declare function schedulePost(postId: string): Promise<{
    success: boolean;
    error?: string;
}>;
/**
 * Approve a social media post
 *
 * @param postId - The ID of the post to approve
 * @param notes - Optional approval notes
 * @returns Promise with success status or error message
 */
export declare function approvePost(postId: string, notes?: string): Promise<{
    success: boolean;
    error?: string;
}>;
/**
 * Batch schedule multiple posts
 *
 * @param postIds - Array of post IDs to schedule
 * @returns Promise with batch operation results
 */
export declare function batchSchedulePosts(postIds: string[]): Promise<BatchPostResponse>;
