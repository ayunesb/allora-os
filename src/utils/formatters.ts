
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
