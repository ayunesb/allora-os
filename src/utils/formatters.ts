
/**
 * Formats a number as currency (USD by default)
 * @param value Number to format
 * @param currency Currency code (default: USD)
 * @returns Formatted currency string
 */
export const formatCurrency = (value: number, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

/**
 * Formats a number as a percentage
 * @param value Number to format as percentage (e.g., 0.25 for 25%)
 * @param decimals Number of decimal places (default: 2)
 * @returns Formatted percentage string
 */
export const formatPercent = (value: number, decimals = 2): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
};

/**
 * Formats a date string or timestamp into a human-readable date
 * @param date Date string or timestamp
 * @param includeTime Whether to include the time
 * @param dateStyle Date formatting style ('full', 'long', 'medium', 'short')
 * @returns Formatted date string
 */
export const formatDate = (
  date: string | number | Date, 
  includeTime = false, 
  dateStyle: 'full' | 'long' | 'medium' | 'short' = 'long'
): string => {
  if (!date) return 'N/A';
  
  const dateObj = new Date(date);
  
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: dateStyle === 'short' ? '2-digit' : 'long',
    day: 'numeric',
    ...(includeTime ? { hour: '2-digit', minute: '2-digit' } : {})
  };
  
  return new Intl.DateTimeFormat('en-US', options).format(dateObj);
};

/**
 * Truncates text with ellipsis if it exceeds the specified length
 * @param text Text to truncate
 * @param maxLength Maximum length before truncation
 * @returns Truncated text
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

/**
 * Formats a number with commas and optional decimal places
 * @param value Number to format
 * @param decimals Number of decimal places (default: 0)
 * @returns Formatted number string
 */
export const formatNumber = (value: number, decimals = 0): string => {
  if (value === undefined || value === null) return '0';
  
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
};

/**
 * Calculates and formats the percentage change between two values
 * @param current Current value
 * @param previous Previous value
 * @param decimals Number of decimal places (default: 1)
 * @returns Formatted percentage change with sign
 */
export const formatPercentChange = (current: number, previous: number, decimals = 1): string => {
  if (previous === 0) return '+∞%';
  
  const change = (current - previous) / Math.abs(previous);
  const sign = change >= 0 ? '+' : '';
  
  return `${sign}${(change * 100).toFixed(decimals)}%`;
};

/**
 * Formats a duration in seconds to a human-readable string
 * @param seconds Duration in seconds
 * @returns Formatted duration string (e.g. "1h 30m" or "45s")
 */
export const formatDuration = (seconds: number): string => {
  if (seconds < 60) return `${Math.round(seconds)}s`;
  
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
};

/**
 * Formats a metric value with appropriate units based on its magnitude
 * @param value Metric value
 * @param useAbbreviations Whether to use abbreviated units (K, M, B)
 * @returns Formatted metric string
 */
export const formatMetric = (value: number, useAbbreviations = true): string => {
  if (value === null || value === undefined) return '0';
  
  if (!useAbbreviations || value < 1000) {
    return formatNumber(value);
  }
  
  if (value < 1000000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  
  if (value < 1000000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  
  return `${(value / 1000000000).toFixed(1)}B`;
};

