/**
 * Utility functions for formatting values
 */
/**
 * Truncates a URL to a reasonable length for display
 * @param url The URL to truncate
 * @param maxLength The maximum length of the truncated URL
 * @returns Truncated URL string
 */
export function truncateUrl(url, maxLength = 40) {
    if (!url)
        return "";
    try {
        // Extract domain from URL
        const urlObj = new URL(url);
        const domain = urlObj.hostname;
        // Include path, but truncate if too long
        const path = urlObj.pathname;
        const query = urlObj.search;
        // If URL is already short enough, return it as is
        if (url.length <= maxLength) {
            return url;
        }
        // If just domain and path are short enough, use them
        const domainAndPath = `${domain}${path}`;
        if (domainAndPath.length <= maxLength - 3) {
            return `${domainAndPath}${query ? "..." : ""}`;
        }
        // Truncate path
        const availableLength = maxLength - domain.length - 6; // 6 for "..." and some padding
        const truncatedPath = path.substring(0, availableLength) + "...";
        return `${domain}${truncatedPath}`;
    }
    catch (error) {
        // If URL parsing fails, just truncate the string directly
        return url.length > maxLength
            ? url.substring(0, maxLength - 3) + "..."
            : url;
    }
}
/**
 * Formats a number as currency
 * @param value Number to format
 * @param currency Currency code (default: USD)
 * @returns Formatted currency string
 */
export function formatCurrency(value, currency = "USD") {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
}
/**
 * Formats a number as a percentage
 * @param value Decimal value (e.g., 0.25 for 25%)
 * @param digits Number of decimal places
 * @returns Formatted percentage string
 */
export function formatPercentage(value, digits = 1) {
    return `${(value * 100).toFixed(digits)}%`;
}
