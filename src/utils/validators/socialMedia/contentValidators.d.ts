import { SocialPlatform } from '@/types/socialMedia';
/**
 * Validates hashtags to ensure they follow the correct format
 */
export declare function validateHashtags(hashtags: string[]): boolean;
/**
 * Validates content length based on platform-specific limits
 */
export declare function validateContentLength(content: string, platform: SocialPlatform): boolean;
