/**
 * Validates a URL string
 */
export function validateMediaUrl(url) {
    try {
        const parsedUrl = new URL(url);
        // Only allow http and https protocols
        return ['http:', 'https:'].includes(parsedUrl.protocol);
    }
    catch (e) {
        return false;
    }
}
/**
 * Validates an array of media URLs
 */
export function validateMediaUrls(urls) {
    if (!Array.isArray(urls)) {
        return false;
    }
    // If the array is empty, consider it valid
    if (urls.length === 0) {
        return true;
    }
    // Check if all URLs in the array are valid
    return urls.every(url => validateMediaUrl(url));
}
