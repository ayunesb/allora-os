/**
 * Social Media Validation Constants
 *
 * This file contains constants used in social media validation
 */
import { SocialPlatform } from "@/types/socialMedia";
/**
 * URL regex pattern for validating URLs in social media content
 * Matches standard URLs with http/https protocol
 */
export declare const URL_PATTERN: RegExp;
/**
 * Platform-specific character limits for post content
 * Based on current platform limitations as of 2025
 */
export declare const PLATFORM_CHARACTER_LIMITS: Record<SocialPlatform, number>;
/**
 * Hashtag pattern for validation
 * Must start with # followed by alphanumeric characters
 */
export declare const HASHTAG_PATTERN: RegExp;
