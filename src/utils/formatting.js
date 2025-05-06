"use strict";
/**
 * Utility functions for formatting values
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.truncateUrl = truncateUrl;
exports.formatCurrency = formatCurrency;
exports.formatPercentage = formatPercentage;
/**
 * Truncates a URL to a reasonable length for display
 * @param url The URL to truncate
 * @param maxLength The maximum length of the truncated URL
 * @returns Truncated URL string
 */
function truncateUrl(url, maxLength) {
  if (maxLength === void 0) {
    maxLength = 40;
  }
  if (!url) return "";
  try {
    // Extract domain from URL
    var urlObj = new URL(url);
    var domain = urlObj.hostname;
    // Include path, but truncate if too long
    var path = urlObj.pathname;
    var query = urlObj.search;
    // If URL is already short enough, return it as is
    if (url.length <= maxLength) {
      return url;
    }
    // If just domain and path are short enough, use them
    var domainAndPath = "".concat(domain).concat(path);
    if (domainAndPath.length <= maxLength - 3) {
      return "".concat(domainAndPath).concat(query ? "..." : "");
    }
    // Truncate path
    var availableLength = maxLength - domain.length - 6; // 6 for "..." and some padding
    var truncatedPath = path.substring(0, availableLength) + "...";
    return "".concat(domain).concat(truncatedPath);
  } catch (error) {
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
function formatCurrency(value, currency) {
  if (currency === void 0) {
    currency = "USD";
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
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
function formatPercentage(value, digits) {
  if (digits === void 0) {
    digits = 1;
  }
  return "".concat((value * 100).toFixed(digits), "%");
}
