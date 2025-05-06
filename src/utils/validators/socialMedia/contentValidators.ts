import { SocialPlatform } from "@/types/socialMedia";

/**
 * Platform-specific character limits
 */
const PLATFORM_CHARACTER_LIMITS: Record<string, number> = {
  Twitter: 280,
  Facebook: 63206,
  Instagram: 2200,
  LinkedIn: 3000,
};

/**
 * Validates hashtags to ensure they follow the correct format
 */
export function validateHashtags(hashtags: string[]): boolean {
  if (!Array.isArray(hashtags)) {
    return false;
  }

  // Valid hashtag pattern: # followed by letters, numbers, or underscores
  const hashtagPattern = /^#[a-zA-Z0-9_]+$/;

  return hashtags.every((tag) => hashtagPattern.test(tag));
}

/**
 * Validates content length based on platform-specific limits
 */
export function validateContentLength(
  content: string,
  platform: SocialPlatform,
): boolean {
  const limit = PLATFORM_CHARACTER_LIMITS[platform] || 1000; // Default to 1000 if platform not found
  return content.length <= limit;
}
