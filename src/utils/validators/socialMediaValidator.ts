
import { z } from 'zod';
import { sanitizeInput, sanitizeUrl } from '@/utils/sanitizers';
import { ValidationResult } from './types';
import { SocialPlatform, PostContentType } from '@/types/socialMedia';

/**
 * URL regex pattern for validating URLs in social media content
 * Matches standard URLs with http/https protocol
 */
const URL_PATTERN = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

/**
 * Platform-specific character limits for post content
 * Based on current platform limitations as of 2025
 */
const PLATFORM_CHARACTER_LIMITS: Record<SocialPlatform, number> = {
  'Facebook': 5000,
  'Instagram': 2200,
  'LinkedIn': 3000,
  'Twitter': 280,
  'TikTok': 2200
};

/**
 * Hashtag pattern for validation
 * Must start with # followed by alphanumeric characters
 */
const HASHTAG_PATTERN = /^#[a-zA-Z0-9_]+$/;

/**
 * Validates if hashtags follow the correct pattern
 * @param hashtags Array of hashtag strings to validate
 * @returns Boolean indicating if all hashtags are valid
 */
export function validateHashtags(hashtags: string[]): boolean {
  if (!Array.isArray(hashtags)) return false;
  return hashtags.every(tag => HASHTAG_PATTERN.test(tag));
}

/**
 * Validates if content length is appropriate for the selected platform
 * @param content Post content to validate
 * @param platform Social media platform
 * @returns Boolean indicating if content length is valid
 */
export function validateContentLength(content: string, platform: SocialPlatform): boolean {
  const limit = PLATFORM_CHARACTER_LIMITS[platform];
  return content.length <= limit;
}

/**
 * Validates URLs provided in media_urls array
 * @param urls Array of URLs to validate
 * @returns Boolean indicating if all URLs are valid
 */
export function validateMediaUrls(urls: string[]): boolean {
  if (!Array.isArray(urls)) return false;
  return urls.every(url => URL_PATTERN.test(url) && sanitizeUrl(url) === url);
}

/**
 * Validates a single media URL
 * @param url URL to validate
 * @returns Boolean indicating if the URL is valid
 */
export function validateMediaUrl(url: string): boolean {
  return URL_PATTERN.test(url) && sanitizeUrl(url) === url;
}

/**
 * Zod schema for validating social media post data
 * Includes comprehensive validation rules for all post properties
 */
export const socialMediaPostSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters')
    .transform(sanitizeInput),
    
  content: z.string()
    .min(1, 'Content is required')
    .max(2000, 'Content must be less than 2000 characters')
    .transform(sanitizeInput),
    
  platform: z.enum(['Facebook', 'Instagram', 'LinkedIn', 'Twitter', 'TikTok'] as const),
  
  content_type: z.enum(['text', 'image', 'video', 'link', 'carousel', 'poll'] as const),
  
  scheduled_date: z.string()
    .min(1, 'Scheduled date is required')
    .refine(date => !isNaN(Date.parse(date)), {
      message: 'Invalid date format'
    }),
    
  publish_time: z.string().optional(),
  
  media_urls: z.array(z.string().url('Invalid URL format'))
    .optional()
    .transform(urls => urls?.map(url => sanitizeUrl(url))),
    
  campaign_id: z.string().uuid('Invalid campaign ID format').optional(),
  
  tags: z.array(z.string()).optional()
    .transform(tags => tags?.map(tag => sanitizeInput(tag))),
    
  link_url: z.string().url('Invalid URL format').optional()
    .transform(url => url ? sanitizeUrl(url) : undefined),
});

/**
 * Validate a social media post for security and data integrity
 * Performs deep validation of all post properties
 * 
 * @param postData Social media post data to validate
 * @returns Validation result with success status and message
 * 
 * @example
 * // Validate post data before submission
 * const validation = validateSocialMediaPost(postFormData);
 * if (!validation.valid) {
 *   showError(validation.message);
 *   return;
 * }
 */
export async function validateSocialMediaPost(postData: any): Promise<ValidationResult> {
  try {
    // Basic schema validation
    const result = socialMediaPostSchema.safeParse(postData);
    
    if (!result.success) {
      const errorMessage = result.error.errors[0]?.message || 'Invalid post data';
      return {
        valid: false,
        message: errorMessage
      };
    }
    
    const data = result.data;
    
    // Platform-specific validations
    if (!validateContentLength(data.content, data.platform)) {
      return {
        valid: false,
        message: `Content exceeds maximum length for ${data.platform} (${PLATFORM_CHARACTER_LIMITS[data.platform]} characters)`
      };
    }
    
    // Media validations based on content type
    if (data.content_type !== 'text' && (!data.media_urls || data.media_urls.length === 0)) {
      return {
        valid: false,
        message: `${data.content_type} posts require at least one media URL`
      };
    }
    
    // Link validation for link type posts
    if (data.content_type === 'link' && !data.link_url) {
      return {
        valid: false,
        message: 'Link posts require a valid link URL'
      };
    }
    
    // Hashtag validation
    if (data.tags && data.tags.length > 0 && !validateHashtags(data.tags)) {
      return {
        valid: false,
        message: 'One or more hashtags are invalid'
      };
    }
    
    // All validations passed
    return {
      valid: true,
      message: "Social media post validation successful"
    };
  } catch (error) {
    return {
      valid: false,
      message: "Error validating social media post: " + 
        (error instanceof Error ? error.message : String(error))
    };
  }
}

/**
 * Validate data for creating a social media post
 * Includes sanitization and security checks
 * 
 * @param postData Post data for creation
 * @returns Validated data or error details
 */
export function validateCreatePost(postData: any): { valid: boolean; data?: any; errors?: Record<string, string> } {
  try {
    // Basic schema validation
    const result = socialMediaPostSchema.safeParse(postData);
    
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        if (err.path.length > 0) {
          errors[err.path.join('.')] = err.message;
        }
      });
      
      return {
        valid: false,
        errors
      };
    }
    
    // Additional validation logic could be added here
    
    return {
      valid: true,
      data: result.data
    };
  } catch (error) {
    return {
      valid: false,
      errors: {
        general: error instanceof Error ? error.message : String(error)
      }
    };
  }
}

/**
 * Validate data for updating a social media post
 * Includes sanitization and security checks
 * 
 * @param postData Post data for update
 * @returns Validated data or error details
 */
export function validateUpdatePost(postData: any): { valid: boolean; data?: any; errors?: Record<string, string> } {
  try {
    // Ensure ID exists
    if (!postData.id) {
      return {
        valid: false,
        errors: {
          id: 'Post ID is required for updates'
        }
      };
    }
    
    // For updates, create a partial schema
    const updateSchema = socialMediaPostSchema.partial().extend({
      id: z.string().min(1, 'Post ID is required')
    });
    
    const result = updateSchema.safeParse(postData);
    
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        if (err.path.length > 0) {
          errors[err.path.join('.')] = err.message;
        }
      });
      
      return {
        valid: false,
        errors
      };
    }
    
    // Additional validation logic could be added here
    
    return {
      valid: true,
      data: result.data
    };
  } catch (error) {
    return {
      valid: false,
      errors: {
        general: error instanceof Error ? error.message : String(error)
      }
    };
  }
}
