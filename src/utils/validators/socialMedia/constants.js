"use strict";
/**
 * Social Media Validation Constants
 *
 * This file contains constants used in social media validation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.HASHTAG_PATTERN =
  exports.PLATFORM_CHARACTER_LIMITS =
  exports.URL_PATTERN =
    void 0;
var SocialPlatform = {
  Facebook: 1,
  Twitter: 2,
  TikTok: 3,
  LinkedIn: 4,
};
/**
 * URL regex pattern for validating URLs in social media content
 * Matches standard URLs with http/https protocol
 */
exports.URL_PATTERN =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
/**
 * Platform-specific character limits for post content
 * Based on current platform limitations as of 2025
 */
exports.PLATFORM_CHARACTER_LIMITS = {
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
exports.HASHTAG_PATTERN = /^#[a-zA-Z0-9_]+$/;
