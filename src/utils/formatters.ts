
/**
 * Formatting utility functions for displaying data in a readable format
 */

/**
 * Format a number as a percentage
 * @param value - The number to format
 * @param decimals - Number of decimal places (default: 1)
 * @returns Formatted percentage string
 */
export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Format a metric with appropriate units
 * @param value - The value to format
 * @param units - Optional units to append (default: '')
 * @returns Formatted metric string
 */
export function formatMetric(value: number, units = ''): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M${units}`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K${units}`;
  }
  return `${value}${units}`;
}

/**
 * Format a percentage change with appropriate indicators
 * @param value - The change value
 * @param showPlus - Whether to show + for positive values (default: true)
 * @returns Formatted percentage change string
 */
export function formatPercentChange(value: number, showPlus = true): string {
  const prefix = value > 0 && showPlus ? '+' : '';
  return `${prefix}${value.toFixed(1)}%`;
}

/**
 * Format a currency value
 * @param value - The value to format
 * @param currency - Currency code (default: 'USD')
 * @returns Formatted currency string
 */
export function formatCurrency(value: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Format a date value
 * @param date - Date to format
 * @param format - Format style (default: 'medium')
 * @returns Formatted date string
 */
export function formatDate(date: Date | string, format: 'short' | 'medium' | 'long' = 'medium'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: format === 'short' ? 'numeric' : 'long', 
    day: 'numeric' 
  };
  
  return new Intl.DateTimeFormat('en-US', options).format(dateObj);
}

/**
 * Format a number with thousands separators
 * @param value - Number to format
 * @returns Formatted number string
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}
