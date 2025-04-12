
/**
 * Schema Definition for Social Media Posts
 * 
 * This file contains the Zod schema for validating social media post data
 */

import { z } from 'zod';
import { sanitizeInput, sanitizeUrl } from '@/utils/sanitizers';

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
 * Type definition for a social media post from the schema
 */
export type SocialMediaPostInput = z.infer<typeof socialMediaPostSchema>;
