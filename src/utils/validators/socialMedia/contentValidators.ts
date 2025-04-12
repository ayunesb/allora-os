
/**
 * Content Validators for Social Media
 * 
 * This file contains utility functions for validating social media content
 */

import { SocialPlatform } from '@/types/socialMedia';
import { PLATFORM_CHARACTER_LIMITS, HASHTAG_PATTERN } from './constants';

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
