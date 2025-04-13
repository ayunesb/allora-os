
/**
 * Calculate percentage change between two numbers
 * @param current Current value
 * @param previous Previous value
 * @returns Percentage change as a number
 */
export const calculatePercentChange = (current: number, previous: number): number => {
  if (previous === 0) {
    return current > 0 ? 100 : 0;
  }
  return ((current - previous) / Math.abs(previous)) * 100;
};

/**
 * Format a number as currency
 * @param value Number to format
 * @param currency Currency code
 * @returns Formatted currency string
 */
export const formatCurrency = (value: number, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(value);
};

/**
 * Format a percentage value
 * @param value Percentage as decimal
 * @param includeSign Whether to include + sign for positive values
 * @returns Formatted percentage string
 */
export const formatPercentage = (value: number, includeSign = true): string => {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(Math.abs(value) / 100);
  
  if (includeSign && value > 0) {
    return `+${formatted}`;
  } else if (value < 0) {
    return `-${formatted}`;
  }
  return formatted;
};
