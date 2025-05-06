/**
 * Utility functions for formatting values
 */
/**
 * Truncates a URL to a reasonable length for display
 * @param url The URL to truncate
 * @param maxLength The maximum length of the truncated URL
 * @returns Truncated URL string
 */
export declare function truncateUrl(url: string, maxLength?: number): string;
/**
 * Formats a number as currency
 * @param value Number to format
 * @param currency Currency code (default: USD)
 * @returns Formatted currency string
 */
export declare function formatCurrency(
  value: number,
  currency?: string,
): string;
/**
 * Formats a number as a percentage
 * @param value Decimal value (e.g., 0.25 for 25%)
 * @param digits Number of decimal places
 * @returns Formatted percentage string
 */
export declare function formatPercentage(
  value: number,
  digits?: number,
): string;
