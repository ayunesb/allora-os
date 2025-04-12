
/**
 * URL Validators for Social Media
 * 
 * This file contains utility functions for validating URLs in social media content
 */

import { URL_PATTERN } from './constants';
import { sanitizeUrl } from '@/utils/sanitizers';

/**
 * Validates URLs provided in media_urls array
 * @param urls Array of URLs to validate
 * @returns Boolean indicating if all URLs are valid
 */
export function validateMediaUrls(urls: string[]): boolean {
  if (!Array.isArray(urls)) return false;
  return urls.every(url => validateMediaUrl(url));
}

/**
 * Validates a single media URL
 * @param url URL to validate
 * @returns Boolean indicating if the URL is valid
 */
export function validateMediaUrl(url: string): boolean {
  return URL_PATTERN.test(url) && sanitizeUrl(url) === url;
}
