
/**
 * Format a number with commas as thousands separators
 */
export const formatNumber = (value: number | undefined | null): string => {
  if (value === undefined || value === null) return '0';
  return new Intl.NumberFormat('en-US').format(value);
};

/**
 * Format a number as currency (USD)
 */
export const formatCurrency = (value: number | undefined | null): string => {
  if (value === undefined || value === null) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

/**
 * Calculate the percentage change between two values
 */
export const calculatePercentChange = (
  oldValue: number | undefined | null, 
  newValue: number | undefined | null
): number => {
  // Convert undefined/null to 0
  const oldVal = Number(oldValue || 0);
  const newVal = Number(newValue || 0);
  
  // If both values are 0, return 0 (no change)
  if (oldVal === 0 && newVal === 0) return 0;
  
  // If old value is 0, but new value is not, it's a "new" metric (100% increase)
  if (oldVal === 0) return 100;
  
  // Calculate percentage change
  return ((newVal - oldVal) / oldVal) * 100;
};

/**
 * Format a percentage value with % sign
 */
export const formatPercent = (value: number | undefined | null): string => {
  if (value === undefined || value === null) return '0%';
  return `${(value * 100).toFixed(1)}%`;
};

/**
 * Format a percent change value with % sign and +/- prefix
 */
export const formatPercentChange = (
  oldValue: number | undefined | null, 
  newValue: number | undefined | null
): string => {
  const change = calculatePercentChange(oldValue, newValue);
  const prefix = change > 0 ? '+' : '';
  return `${prefix}${change.toFixed(1)}%`;
};

/**
 * Format a number with appropriate unit (K, M, B)
 */
export const formatMetric = (value: number | undefined | null): string => {
  if (value === undefined || value === null) return '0';
  
  const num = Number(value);
  if (num === 0) return '0';
  
  if (Math.abs(num) >= 1000000000) {
    return `${(num / 1000000000).toFixed(1)}B`;
  }
  
  if (Math.abs(num) >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  
  if (Math.abs(num) >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  
  return num.toString();
};

/**
 * Format a date to a readable string
 */
export const formatDate = (date: string | Date): string => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
