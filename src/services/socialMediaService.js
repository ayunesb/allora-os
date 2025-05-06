/**
 * Social Media Service
 *
 * This service handles interactions with the social media posts database table.
 * It includes comprehensive validation and security checks for all operations.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { supabase } from "@/backend/supabase";
import { toast } from "sonner";
import { apiRequest, clearApiCache } from "@/utils/api/apiClient";
import { wrapSupabaseQuery } from "@/utils/api/supabaseWrapper";
import { logger } from "@/utils/loggingService";
import { validateCreatePost as validateCreatePostExternal, validateUpdatePost as validateUpdatePostExternal, } from "@/types/fixed/SocialMediaPost"; // Rename conflicting imports
import { validateMediaUrl } from "@/utils/validators/mediaValidator"; // Ensure this is the correct path
/**
 * Cache key for social media posts
 * @param companyId - Company ID to include in the cache key
 * @returns - Formatted cache key
 */
const getSocialMediaCacheKey = (companyId) => `social_media_posts_${companyId}`;
/**
 * Fetch all social media posts for a company with optional filters
 *
 * @param companyId - The ID of the company
 * @param filters - Optional filters to apply to the query
 * @returns Promise with array of social media posts
 */
export function fetchSocialMediaPosts(companyId, filters) {
    return __awaiter(this, void 0, void 0, function* () {
        return apiRequest(wrapSupabaseQuery(() => __awaiter(this, void 0, void 0, function* () {
            let query = supabase
                .from("social_media_posts")
                .select("*")
                .eq("company_id", companyId);
            // Apply filters if provided
            if (filters) {
                if (filters.platform) {
                    query = query.eq("platform", filters.platform);
                }
                if (filters.status) {
                    query = query.eq("status", filters.status);
                }
                if (filters.content_type) {
                    query = query.eq("content_type", filters.content_type);
                }
                if (filters.campaign_id) {
                    query = query.eq("campaign_id", filters.campaign_id);
                }
                if (filters.author_id) {
                    query = query.eq("author_id", filters.author_id);
                }
                if (filters.startDate && filters.endDate) {
                    query = query
                        .gte("scheduled_date", filters.startDate)
                        .lte("scheduled_date", filters.endDate);
                }
                else if (filters.startDate) {
                    query = query.gte("scheduled_date", filters.startDate);
                }
                else if (filters.endDate) {
                    query = query.lte("scheduled_date", filters.endDate);
                }
                if (filters.search) {
                    query = query.or(`title.ilike.%${filters.search}%,content.ilike.%${filters.search}%`);
                }
                if (filters.tags && filters.tags.length > 0) {
                    // For array overlap search (posts that have any of the specified tags)
                    query = query.contains("tags", filters.tags);
                }
            }
            // Order by scheduled date
            query = query.order("scheduled_date", { ascending: true });
            const { data, error } = yield query;
            return { data, error };
        })), {
            errorMessage: "Failed to fetch social media posts",
            cacheKey: getSocialMediaCacheKey(companyId),
            cacheTTL: 60000, // 1 minute cache
        }).then((response) => response.data || []);
    });
}
/**
 * Fetch a single social media post by ID
 *
 * @param postId - The ID of the post
 * @returns Promise with the post or null if not found
 */
export function fetchSocialMediaPost(postId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield supabase
            .from("social_media_posts")
            .select("*")
            .eq("id", postId)
            .maybeSingle();
        return result.data;
    });
}
/**
 * Create a new social media post with validation
 *
 * @param companyId - The ID of the company
 * @param postData - Data for the new post
 * @returns Promise with success status and post ID or error details
 */
export function createSocialMediaPost(companyId, postData) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        try {
            // Validate the input data
            const validation = validateCreatePostExternal(postData);
            if (!validation.valid || !validation.data) {
                return {
                    success: false,
                    error: "Invalid post data",
                    validationErrors: validation.errors,
                };
            }
            // Validated and sanitized data
            const validatedData = validation.data; // Ensure all properties exist
            // Additional validation for media URLs
            if ((_a = validatedData.mediaUrls) === null || _a === void 0 ? void 0 : _a.length) {
                const invalidUrls = validatedData.mediaUrls.filter((url) => !validateMediaUrl(url));
                if (invalidUrls.length > 0) {
                    return {
                        success: false,
                        error: "One or more media URLs are invalid or from untrusted sources",
                        validationErrors: {
                            media_urls: "Contains invalid or untrusted URLs",
                        },
                    };
                }
            }
            // Insert post into database
            const result = yield apiRequest(wrapSupabaseQuery(() => __awaiter(this, void 0, void 0, function* () {
                const { data, error } = yield supabase
                    .from("social_media_posts")
                    .insert({
                    company_id: companyId,
                    title: validatedData.title,
                    content: validatedData.content,
                    platform: validatedData.platform,
                    scheduledAt: validatedData.scheduledAt,
                    publishTime: validatedData.publishTime,
                    status: "Draft", // Default status
                    contentType: validatedData.contentType,
                    mediaUrls: validatedData.mediaUrls,
                    campaignId: validatedData.campaignId,
                    isApproved: validatedData.isApproved || false,
                    tags: validatedData.tags || [],
                    mentions: validatedData.mentions || [],
                    hashtags: validatedData.hashtags || [],
                    location: validatedData.location,
                    link_url: validatedData.link_url,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                })
                    .select("id")
                    .single();
                return { data, error };
            })), {
                successMessage: "Social media post created successfully",
                errorMessage: "Failed to create social media post",
            });
            // Clear any cached data to ensure fresh data
            clearApiCache(getSocialMediaCacheKey(companyId));
            // Log the successful creation
            logger.info("Social media post created", {
                companyId,
                postId: (_b = result.data) === null || _b === void 0 ? void 0 : _b.id,
                platform: validatedData.platform,
            });
            return {
                success: true,
                postId: (_c = result.data) === null || _c === void 0 ? void 0 : _c.id,
            };
        }
        catch (error) {
            // Log the error
            logger.error("Error creating social media post", {
                error: error.message,
                companyId,
                postData,
            });
            return {
                success: false,
                error: error.message || "An unexpected error occurred",
            };
        }
    });
}
/**
 * Update an existing social media post with validation
 *
 * @param postData - Updated post data
 * @returns Promise with success status or error details
 */
export function updateSocialMediaPost(postData) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const validation = validateUpdatePostExternal(postData);
            if (!validation.valid || !validation.data) {
                return {
                    success: false,
                    error: "Invalid post update data",
                    validationErrors: validation.errors,
                };
            }
            const validatedData = validation.data; // Ensure all properties exist
            // Additional validation for media URLs if provided
            if ((_a = validatedData.mediaUrls) === null || _a === void 0 ? void 0 : _a.length) {
                const invalidUrls = validatedData.mediaUrls.filter((url) => !validateMediaUrl(url));
                if (invalidUrls.length > 0) {
                    return {
                        success: false,
                        error: "One or more media URLs are invalid or from untrusted sources",
                        validationErrors: {
                            media_urls: "Contains invalid or untrusted URLs",
                        },
                    };
                }
            }
            // Get the current post data to determine company ID for cache invalidation
            const updatedPost = yield fetchSocialMediaPost(validatedData.id);
            if (!updatedPost) {
                return {
                    success: false,
                    error: "Post not found",
                };
            }
            // Update post in database
            const { data, error } = yield supabase
                .from("social_media_posts")
                .update({
                title: validatedData.title,
                content: validatedData.content,
                platform: validatedData.platform,
                scheduledAt: validatedData.scheduledAt,
                publishTime: validatedData.publishTime,
                status: validatedData.status,
                contentType: validatedData.contentType,
                mediaUrls: validatedData.mediaUrls,
                campaignId: validatedData.campaignId,
                isApproved: validatedData.isApproved, // Ensure this property exists
                approval_notes: validatedData.approval_notes, // Ensure this property exists
                tags: validatedData.tags, // Ensure this property exists
                mentions: validatedData.mentions, // Ensure this property exists
                hashtags: validatedData.hashtags, // Ensure this property exists
                location: validatedData.location, // Ensure this property exists
                link_url: validatedData.link_url, // Ensure this property exists
                updated_at: new Date().toISOString(),
            })
                .eq("id", validatedData.id); // Ensure `.eq` is part of the query chain
            if (error) {
                throw new Error(error.message || "Failed to update social media post");
            }
            // Clear the specific post cache and the posts list cache
            clearApiCache(`social_media_post_${validatedData.id}`);
            if (updatedPost.company_id) {
                clearApiCache(getSocialMediaCacheKey(updatedPost.company_id));
            }
            // Log the successful update
            logger.info("Social media post updated", {
                postId: validatedData.id,
                fieldCount: Object.keys(validatedData).length - 1, // Exclude the ID
            });
            return { success: true };
        }
        catch (error) {
            // Log the error
            logger.error("Error updating social media post", {
                error: error.message,
                postId: postData.id,
            });
            return {
                success: false,
                error: error.message || "An unexpected error occurred",
            };
        }
    });
}
/**
 * Delete a social media post
 *
 * @param postId - The ID of the post to delete
 * @returns Promise with success status or error message
 */
export function deleteSocialMediaPost(postId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Get the current post data to determine company ID for cache invalidation
            const postData = yield fetchSocialMediaPost(postId);
            if (!postData) {
                return {
                    success: false,
                    error: "Post not found",
                };
            }
            // Delete the post
            yield apiRequest(wrapSupabaseQuery(() => __awaiter(this, void 0, void 0, function* () {
                const { data, error } = yield supabase
                    .from("social_media_posts")
                    .delete()
                    .eq("id", postId);
                return { data, error }; // Ensure `data` is returned
            })), {
                successMessage: "Social media post deleted successfully",
                errorMessage: "Failed to delete social media post",
            });
            // Clear the specific post cache and the posts list cache
            clearApiCache(`social_media_post_${postId}`);
            clearApiCache(getSocialMediaCacheKey(postData.company_id || ""));
            // Log the successful deletion
            logger.info("Social media post deleted", {
                postId,
                companyId: postData.company_id,
            });
            return { success: true };
        }
        catch (error) {
            // Log the error
            logger.error("Error deleting social media post", {
                error: error.message,
                postId,
            });
            return {
                success: false,
                error: error.message || "An unexpected error occurred",
            };
        }
    });
}
/**
 * Schedule a post for publication
 *
 * @param postId - The ID of the post to schedule
 * @returns Promise with success status or error message
 */
export function schedulePost(postId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Get the current post data to determine company ID for cache invalidation
            const currentPost = yield fetchSocialMediaPost(postId);
            if (!currentPost) {
                return {
                    success: false,
                    error: "Post not found",
                };
            }
            // Check if the post is already scheduled or published
            if (currentPost.status === "Scheduled" ||
                currentPost.status === "Published") {
                return {
                    success: false,
                    error: `Post is already ${currentPost.status}`,
                };
            }
            // Schedule the post
            yield apiRequest(wrapSupabaseQuery(() => __awaiter(this, void 0, void 0, function* () {
                const { data, error } = yield supabase
                    .from("social_media_posts")
                    .update({
                    status: "Scheduled",
                    updated_at: new Date().toISOString(),
                })
                    .eq("id", postId);
                return { data, error };
            })), {
                successMessage: "Post scheduled successfully",
                errorMessage: "Failed to schedule post",
            });
            // Get post information for cache invalidation
            const updatedPost = yield fetchSocialMediaPost(postId);
            if (updatedPost) {
                // Clear the specific post cache and the posts list cache
                clearApiCache(`social_media_post_${postId}`);
                clearApiCache(getSocialMediaCacheKey(updatedPost.company_id || ""));
            }
            // Log the successful scheduling
            logger.info("Social media post scheduled", {
                postId,
                companyId: currentPost.company_id,
                scheduledDate: currentPost.scheduled_date,
                publishTime: currentPost.publish_time,
            });
            return { success: true };
        }
        catch (error) {
            // Log the error
            logger.error("Error scheduling social media post", {
                error: error.message,
                postId,
            });
            return {
                success: false,
                error: error.message || "An unexpected error occurred",
            };
        }
    });
}
/**
 * Approve a social media post
 *
 * @param postId - The ID of the post to approve
 * @param notes - Optional approval notes
 * @returns Promise with success status or error message
 */
export function approvePost(postId, notes) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Get the current post data to determine company ID for cache invalidation
            const currentPost = yield fetchSocialMediaPost(postId);
            if (!currentPost) {
                return {
                    success: false,
                    error: "Post not found",
                };
            }
            // Check if the post is already approved
            if (currentPost.is_approved) {
                return {
                    success: false,
                    error: "Post is already approved",
                };
            }
            // Approve the post
            yield apiRequest(wrapSupabaseQuery(() => __awaiter(this, void 0, void 0, function* () {
                const { data, error } = yield supabase
                    .from("social_media_posts")
                    .update({
                    is_approved: true,
                    approval_notes: notes,
                    status: currentPost.status === "Draft"
                        ? "Approved"
                        : currentPost.status,
                    updated_at: new Date().toISOString(),
                })
                    .eq("id", postId);
                return { data, error };
            })), {
                successMessage: "Post approved successfully",
                errorMessage: "Failed to approve post",
            });
            // Get post information for cache invalidation
            const updatedPost = yield fetchSocialMediaPost(postId);
            if (updatedPost) {
                // Clear the specific post cache and the posts list cache
                clearApiCache(`social_media_post_${postId}`);
                clearApiCache(getSocialMediaCacheKey(updatedPost.company_id || ""));
            }
            // Log the successful approval
            logger.info("Social media post approved", {
                postId,
                companyId: currentPost.company_id,
                withNotes: !!notes,
            });
            return { success: true };
        }
        catch (error) {
            // Log the error
            logger.error("Error approving social media post", {
                error: error.message,
                postId,
            });
            return {
                success: false,
                error: error.message || "An unexpected error occurred",
            };
        }
    });
}
/**
 * Batch schedule multiple posts
 *
 * @param postIds - Array of post IDs to schedule
 * @returns Promise with batch operation results
 */
export function batchSchedulePosts(postIds) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!postIds.length) {
            return {
                success: true,
                processed: 0,
                failed: 0,
                error_details: [],
            };
        }
        let processed = 0;
        let failed = 0;
        const errors = [];
        // Process posts in batches to avoid overwhelming the database
        for (const postId of postIds) {
            try {
                const result = yield schedulePost(postId);
                if (result.success) {
                    processed++;
                }
                else {
                    failed++;
                    errors.push({
                        post_id: postId,
                        error: result.error || "Unknown error",
                    });
                }
            }
            catch (error) {
                failed++;
                errors.push({
                    post_id: postId,
                    error: error.message || "Unknown error",
                });
            }
        }
        // Log batch operation results
        logger.info("Batch schedule posts completed", {
            total: postIds.length,
            processed,
            failed,
        });
        if (processed > 0) {
            toast.success(`Successfully scheduled ${processed} posts`);
        }
        if (failed > 0) {
            toast.error(`Failed to schedule ${failed} posts`);
        }
        return {
            success: failed === 0,
            processed,
            failed,
            error_details: errors,
        };
    });
}
export function postToSocialMedia(platform, content) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Mock implementation: Replace with actual API calls
            if (platform === "twitter") {
                logger.info(`Posting to Twitter: ${content}`);
            }
            else if (platform === "facebook") {
                logger.info(`Posting to Facebook: ${content}`);
            }
            else {
                throw new Error(`Unsupported platform: ${platform}`);
            }
            return { success: true };
        }
        catch (error) {
            return {
                success: false,
                error: error.message || "An unexpected error occurred",
            };
        }
    });
}
// Example of validateCreatePost function return type
function validateCreatePost(input) {
    // ...validation logic...
    return {
        valid: true, // or false based on validation
        data: input, // sanitized data
        errors: {}, // or validation errors
    };
}
// Example of validateUpdatePost function return type
function validateUpdatePost(input) {
    // ...validation logic...
    return {
        valid: true, // or false based on validation
        data: input, // sanitized data
        errors: {}, // or validation errors
    };
}
