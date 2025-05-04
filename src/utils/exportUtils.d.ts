/**
 * Format a date to a readable string
 * @param dateString Date string to format
 * @returns Formatted date string
 */
export declare function formatDate(dateString: string): string;
/**
 * Export data to CSV file
 * @param data Array of objects to export
 * @param filename Name of the file to download
 */
export declare function exportToCSV(data: Record<string, any>[], filename: string): void;
