
/**
 * Social Media Data Validation
 * 
 * This module provides functions for validating social media post data
 * to ensure data integrity and security.
 */

import { z } from "zod";
import { isValidUrl } from "../validation";
import { sanitizeInput } from "../sanitizers";
import { 
  SocialPlatform, 
  PostStatus, 
  PostContentType,
  CreatePostInput,
  UpdatePostInput
} from "@/types/socialMedia";

/**
 * Maximum content length by platform to prevent API errors
 */
const PLATFORM_CHARACTER_LIMITS: Record<SocialPlatform, number> = {
  'Facebook': 63206,
  'Instagram': 2200,
  'LinkedIn': 3000,
  'Twitter': 280,
  'TikTok': 2200
};

/**
 * Zod schema for post platform
 */
const platformSchema = z.enum(['Facebook', 'Instagram', 'LinkedIn', 'Twitter', 'TikTok']);

/**
 * Zod schema for post status
 */
const statusSchema = z.enum(['draft', 'scheduled', 'published', 'failed', 'approved', 'rejected']);

/**
 * Zod schema for post content type
 */
const contentTypeSchema = z.enum(['text', 'image', 'video', 'link', 'carousel', 'poll']);

/**
 * Zod schema for media URLs
 */
const mediaUrlSchema = z.array(z.string().url()).optional();

/**
 * Zod schema for tags
 */
const tagsSchema = z.array(z.string().trim().min(1).max(50)).optional();

/**
 * Zod schema for location
 */
const locationSchema = z.object({
  name: z.string().max(100).optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional()
}).optional();

/**
 * Zod schema for link preview
 */
const linkPreviewSchema = z.object({
  title: z.string().max(200).optional(),
  description: z.string().max(500).optional(),
  image: z.string().url().optional()
}).optional();

/**
 * Zod schema for creating a post
 */
export const createPostSchema = z.object({
  title: z.string().trim().min(1).max(100),
  content: z.string().min(1).max(10000),
  platform: platformSchema,
  scheduled_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  publish_time: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/).optional(),
  content_type: contentTypeSchema,
  media_urls: mediaUrlSchema,
  campaign_id: z.string().uuid().optional(),
  is_approved: z.boolean().optional().default(false),
  tags: tagsSchema,
  mentions: tagsSchema,
  hashtags: tagsSchema,
  location: locationSchema,
  link_url: z.string().url().optional(),
}).refine(data => {
  // Check platform-specific character limits
  if (data.platform && data.content) {
    return data.content.length <= PLATFORM_CHARACTER_LIMITS[data.platform];
  }
  return true;
}, {
  message: "Content exceeds the maximum length for the selected platform",
  path: ["content"]
});

/**
 * Zod schema for updating a post
 */
export const updatePostSchema = z.object({
  id: z.string().uuid(),
  title: z.string().trim().min(1).max(100).optional(),
  content: z.string().min(1).max(10000).optional(),
  platform: platformSchema.optional(),
  scheduled_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  publish_time: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/).optional().nullable(),
  content_type: contentTypeSchema.optional(),
  media_urls: mediaUrlSchema,
  campaign_id: z.string().uuid().optional().nullable(),
  status: statusSchema.optional(),
  is_approved: z.boolean().optional(),
  approval_notes: z.string().max(1000).optional().nullable(),
  tags: tagsSchema,
  mentions: tagsSchema,
  hashtags: tagsSchema,
  location: locationSchema,
  link_url: z.string().url().optional().nullable(),
}).refine((data) => {
  // Check platform-specific character limits if both platform and content are provided
  if (data.platform && data.content) {
    return data.content.length <= PLATFORM_CHARACTER_LIMITS[data.platform];
  }
  return true;
}, {
  message: "Content exceeds the maximum length for the selected platform",
  path: ["content"]
});

/**
 * Validates a social media post creation input
 * @param input - The post creation data to validate
 * @returns Validation result with sanitized data or errors
 */
export function validateCreatePost(input: CreatePostInput): { 
  valid: boolean; 
  data?: CreatePostInput; 
  errors?: Record<string, string>;
} {
  try {
    // Sanitize text inputs to prevent XSS
    const sanitizedInput = {
      ...input,
      title: sanitizeInput(input.title),
      content: sanitizeInput(input.content),
      tags: input.tags?.map(tag => sanitizeInput(tag)),
      mentions: input.mentions?.map(mention => sanitizeInput(mention)),
      hashtags: input.hashtags?.map(hashtag => sanitizeInput(hashtag)),
      location: input.location ? {
        ...input.location,
        name: input.location.name ? sanitizeInput(input.location.name) : undefined
      } : undefined
    };

    // Validate with Zod schema
    const validatedData = createPostSchema.parse(sanitizedInput);
    
    return { 
      valid: true, 
      data: validatedData as CreatePostInput 
    };
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      const errorMap: Record<string, string> = {};
      error.errors.forEach(err => {
        const path = err.path.join('.');
        errorMap[path] = err.message;
      });
      
      return { 
        valid: false, 
        errors: errorMap 
      };
    }
    
    // Handle other errors
    return { 
      valid: false, 
      errors: { 
        _general: 'Invalid post data provided' 
      } 
    };
  }
}

/**
 * Validates a social media post update input
 * @param input - The post update data to validate
 * @returns Validation result with sanitized data or errors
 */
export function validateUpdatePost(input: UpdatePostInput): { 
  valid: boolean; 
  data?: UpdatePostInput; 
  errors?: Record<string, string>;
} {
  try {
    // Sanitize text inputs to prevent XSS
    const sanitizedInput = {
      ...input,
      title: input.title ? sanitizeInput(input.title) : undefined,
      content: input.content ? sanitizeInput(input.content) : undefined,
      tags: input.tags?.map(tag => sanitizeInput(tag)),
      mentions: input.mentions?.map(mention => sanitizeInput(mention)),
      hashtags: input.hashtags?.map(hashtag => sanitizeInput(hashtag)),
      approval_notes: input.approval_notes ? sanitizeInput(input.approval_notes) : undefined,
      location: input.location ? {
        ...input.location,
        name: input.location.name ? sanitizeInput(input.location.name) : undefined
      } : undefined
    };

    // Validate with Zod schema
    const validatedData = updatePostSchema.parse(sanitizedInput);
    
    return { 
      valid: true, 
      data: validatedData as UpdatePostInput 
    };
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      const errorMap: Record<string, string> = {};
      error.errors.forEach(err => {
        const path = err.path.join('.');
        errorMap[path] = err.message;
      });
      
      return { 
        valid: false, 
        errors: errorMap 
      };
    }
    
    // Handle other errors
    return { 
      valid: false, 
      errors: { 
        _general: 'Invalid post update data provided' 
      } 
    };
  }
}

/**
 * Validates a media URL for security and format
 * @param url - The URL to validate
 * @returns Whether the URL is valid and safe
 */
export function validateMediaUrl(url: string): boolean {
  // Check if it's a valid URL format
  if (!isValidUrl(url)) {
    return false;
  }
  
  // Ensure it's an image or video URL from trusted domains
  const trustedDomains = [
    'cloudinary.com',
    'amazonaws.com',
    'storage.googleapis.com',
    'fb.com',
    'fbcdn.net',
    'instagram.com',
    'cdninstagram.com',
    'twimg.com',
    'linkedin.com',
    'youtu.be',
    'youtube.com',
    'vimeo.com'
  ];
  
  try {
    const urlObj = new URL(url);
    const domain = urlObj.hostname;
    
    return trustedDomains.some(trusted => 
      domain === trusted || domain.endsWith(`.${trusted}`)
    );
  } catch {
    return false;
  }
}
