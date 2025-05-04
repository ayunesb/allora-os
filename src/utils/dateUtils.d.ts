/**
 * Date formatting and calculation utilities
 */
/**
 * Format a date in relative time (e.g. "2 days ago", "just now")
 * @param dateString ISO date string or Date object
 * @returns Formatted relative time string
 */
export declare const formatRelativeTime: (dateString: string | Date) => string;
/**
 * Get relative time (for backward compatibility)
 * @param dateString ISO date string or Date object
 * @returns Formatted relative time string
 */
export declare const getRelativeTime: (dateString: string | Date) => string;
/**
 * Format a date as a standard date string
 * @param date ISO date string or Date object
 * @returns Formatted date string (e.g. "Jan 1, 2023")
 */
export declare const formatDate: (date: string | Date) => string;
/**
 * Format a date as a standard date and time string
 * @param date ISO date string or Date object
 * @returns Formatted date and time string (e.g. "Jan 1, 2023, 12:00 PM")
 */
export declare const formatDateTime: (date: string | Date) => string;
