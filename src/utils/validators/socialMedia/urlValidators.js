"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMediaUrl = validateMediaUrl;
exports.validateMediaUrls = validateMediaUrls;
/**
 * Validates a URL string
 */
function validateMediaUrl(url) {
  try {
    var parsedUrl = new URL(url);
    // Only allow http and https protocols
    return ["http:", "https:"].includes(parsedUrl.protocol);
  } catch (e) {
    return false;
  }
}
/**
 * Validates an array of media URLs
 */
function validateMediaUrls(urls) {
  if (!Array.isArray(urls)) {
    return false;
  }
  // If the array is empty, consider it valid
  if (urls.length === 0) {
    return true;
  }
  // Check if all URLs in the array are valid
  return urls.every(function (url) {
    return validateMediaUrl(url);
  });
}
