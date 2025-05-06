"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateHashtags = validateHashtags;
exports.validateContentLength = validateContentLength;
/**
 * Platform-specific character limits
 */
var PLATFORM_CHARACTER_LIMITS = {
  Twitter: 280,
  Facebook: 63206,
  Instagram: 2200,
  LinkedIn: 3000,
};
/**
 * Validates hashtags to ensure they follow the correct format
 */
function validateHashtags(hashtags) {
  if (!Array.isArray(hashtags)) {
    return false;
  }
  // Valid hashtag pattern: # followed by letters, numbers, or underscores
  var hashtagPattern = /^#[a-zA-Z0-9_]+$/;
  return hashtags.every(function (tag) {
    return hashtagPattern.test(tag);
  });
}
/**
 * Validates content length based on platform-specific limits
 */
function validateContentLength(content, platform) {
  var limit = PLATFORM_CHARACTER_LIMITS[platform] || 1000; // Default to 1000 if platform not found
  return content.length <= limit;
}
