/**
 * Format a date to a readable string
 * @param dateString Date string to format
 * @returns Formatted date string
 */
export function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}
/**
 * Export data to CSV file
 * @param data Array of objects to export
 * @param filename Name of the file to download
 */
export function exportToCSV(data, filename) {
    if (!data || data.length === 0) {
        console.warn("No data to export");
        return;
    }
    // Get headers from the first object
    const headers = Object.keys(data[0]);
    // Create CSV header row
    const csvRows = [headers.join(",")];
    // Add data rows
    for (const row of data) {
        const values = headers.map((header) => {
            var _a;
            const value = ((_a = row[header]) === null || _a === void 0 ? void 0 : _a.toString()) || "";
            // Escape quotes and wrap in quotes if needed
            return value.includes(",") ? `"${value.replace(/"/g, '""')}"` : value;
        });
        csvRows.push(values.join(","));
    }
    // Create blob and download link
    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}-${new Date().toISOString().split("T")[0]}.csv`);
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
