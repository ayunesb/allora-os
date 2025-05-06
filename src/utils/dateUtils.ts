/**
 * Date formatting and calculation utilities
 */

/**
 * Format a date in relative time (e.g. "2 days ago", "just now")
 * @param dateString ISO date string or Date object
 * @returns Formatted relative time string
 */
export const formatRelativeTime = (dateString: string | Date): string => {
  const date =
    typeof dateString === "string" ? new Date(dateString) : dateString;
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) {
    return "just now";
  } else if (diffMins < 60) {
    return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  } else if (diffDays < 30) {
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  } else {
    // Format as a standard date for older dates
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
};

/**
 * Get relative time (for backward compatibility)
 * @param dateString ISO date string or Date object
 * @returns Formatted relative time string
 */
export const getRelativeTime = formatRelativeTime;

/**
 * Format a date as a standard date string
 * @param date ISO date string or Date object
 * @returns Formatted date string (e.g. "Jan 1, 2023")
 */
export const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

/**
 * Format a date as a standard date and time string
 * @param date ISO date string or Date object
 * @returns Formatted date and time string (e.g. "Jan 1, 2023, 12:00 PM")
 */
export const formatDateTime = (date: string | Date): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};
