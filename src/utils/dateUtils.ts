
/**
 * Date utility functions for formatting and manipulating dates
 */

/**
 * Format a date string to a localized date-time string
 */
export function formatDateTimeString(dateString: string): string {
  if (!dateString) return 'Unknown';
  try {
    const date = new Date(dateString);
    return date.toLocaleString();
  } catch (error) {
    return 'Invalid Date';
  }
}

/**
 * Format a date string to a localized date string
 */
export function formatDateString(dateString: string): string {
  if (!dateString) return 'Unknown';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  } catch (error) {
    return 'Invalid Date';
  }
}

/**
 * Format a date string to a localized time string
 */
export function formatTimeString(dateString: string): string {
  if (!dateString) return 'Unknown';
  try {
    const date = new Date(dateString);
    return date.toLocaleTimeString();
  } catch (error) {
    return 'Invalid Date';
  }
}

/**
 * Get the relative time from now (e.g. "5 minutes ago")
 */
export function getRelativeTime(dateString: string): string {
  if (!dateString) return 'Unknown';
  
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return `${diffInSeconds} second${diffInSeconds !== 1 ? 's' : ''} ago`;
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
      return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    }
    
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return `${diffInMonths} month${diffInMonths !== 1 ? 's' : ''} ago`;
    }
    
    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears} year${diffInYears !== 1 ? 's' : ''} ago`;
  } catch (error) {
    return 'Unknown';
  }
}
