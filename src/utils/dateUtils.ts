
import { formatDistanceToNow, formatDistance, parseISO } from 'date-fns';

/**
 * Formats a date as relative time (e.g., "5 minutes ago")
 * @param dateInput Date string or Date object
 * @returns Formatted relative time string
 */
export function formatRelativeTime(dateInput: string | Date | null): string {
  if (!dateInput) return 'Unknown time';
  
  try {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    return formatDistanceToNow(date, { addSuffix: true });
  } catch (error) {
    console.error('Error formatting relative time:', error);
    return 'Invalid date';
  }
}

/**
 * Formats the duration between two dates
 * @param startDate Start date
 * @param endDate End date (defaults to now)
 * @returns Formatted duration string
 */
export function formatDuration(startDate: Date | string, endDate: Date | string | null = null): string {
  try {
    const start = typeof startDate === 'string' ? parseISO(startDate) : startDate;
    const end = endDate 
      ? (typeof endDate === 'string' ? parseISO(endDate) : endDate)
      : new Date();
    
    return formatDistance(start, end, { includeSeconds: true });
  } catch (error) {
    console.error('Error formatting duration:', error);
    return 'Invalid duration';
  }
}

/**
 * Formats a date in a consistent format
 * @param dateInput Date string or Date object
 * @param includeTime Whether to include time
 * @returns Formatted date string
 */
export function formatDate(dateInput: Date | string | null, includeTime: boolean = false): string {
  if (!dateInput) return '';
  
  try {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      ...(includeTime ? { hour: '2-digit', minute: '2-digit' } : {})
    };
    
    return new Intl.DateTimeFormat('en-US', options).format(date);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
}
