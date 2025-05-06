/**
 * Social Media Validation Constants
 *
 * This file contains constants used in social media validation
 */

type SocialPlatform =
  | "Facebook"
  | "Instagram"
  | "Twitter"
  | "TikTok"
  | "LinkedIn"; // Added LinkedIn to the type

const SocialPlatform: Record<string, number> = {
  Facebook: 1,
  Twitter: 2,
  TikTok: 3,
  LinkedIn: 4,
};

/**
 * URL regex pattern for validating URLs in social media content
 * Matches standard URLs with http/https protocol
 */
export const URL_PATTERN =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

/**
 * Platform-specific character limits for post content
 * Based on current platform limitations as of 2025
 */
export const PLATFORM_CHARACTER_LIMITS: Record<SocialPlatform, number> = {
  Facebook: 5000,
  Instagram: 2200,
  LinkedIn: 3000,
  Twitter: 280,
  TikTok: 2200,
};

/**
 * Hashtag pattern for validation
 * Must start with # followed by alphanumeric characters
 */
export const HASHTAG_PATTERN = /^#[a-zA-Z0-9_]+$/;
