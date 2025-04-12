
/**
 * Export utilities for data export to various formats
 */

/**
 * Export data to CSV
 * @param data - The data to export
 * @param filename - The filename to use
 */
export function exportToCSV(data: any[], filename: string): void {
  if (!data || !data.length) {
    console.error('No data to export');
    return;
  }

  // Get headers from the first object
  const headers = Object.keys(data[0]);
  
  // Convert data to CSV string
  const csvRows = [];
  
  // Add headers
  csvRows.push(headers.join(','));
  
  // Add rows
  for (const row of data) {
    const values = headers.map(header => {
      const value = row[header];
      // Handle null, undefined or empty values
      if (value === null || value === undefined || value === '') {
        return '';
      }
      // Handle objects and arrays by converting to JSON
      if (typeof value === 'object') {
        return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
      }
      // Handle strings with quotes or commas
      if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    });
    csvRows.push(values.join(','));
  }
  
  // Create a blob and download
  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Export data to PDF
 * @param data - The data to export
 * @param filename - The filename to use
 * @param title - Optional title for the PDF
 */
export function exportToPDF(data: any[], filename: string, title?: string): void {
  // For now, just export as CSV since we haven't implemented PDF export yet
  console.log('PDF export not implemented yet, exporting as CSV');
  exportToCSV(data, filename);
}

/**
 * Format for export
 * @param format - The format to export to ('csv' or 'pdf')
 * @param data - The data to export
 * @param filename - The filename to use
 */
export const format = {
  csv: (data: any[], filename: string) => exportToCSV(data, filename),
  pdf: (data: any[], filename: string) => exportToPDF(data, filename)
};
