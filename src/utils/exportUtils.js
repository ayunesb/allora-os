"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = formatDate;
exports.exportToCSV = exportToCSV;
/**
 * Format a date to a readable string
 * @param dateString Date string to format
 * @returns Formatted date string
 */
function formatDate(dateString) {
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
function exportToCSV(data, filename) {
  if (!data || data.length === 0) {
    console.warn("No data to export");
    return;
  }
  // Get headers from the first object
  var headers = Object.keys(data[0]);
  // Create CSV header row
  var csvRows = [headers.join(",")];
  var _loop_1 = function (row) {
    var values = headers.map(function (header) {
      var _a;
      var value =
        ((_a = row[header]) === null || _a === void 0
          ? void 0
          : _a.toString()) || "";
      // Escape quotes and wrap in quotes if needed
      return value.includes(",")
        ? '"'.concat(value.replace(/"/g, '""'), '"')
        : value;
    });
    csvRows.push(values.join(","));
  };
  // Add data rows
  for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
    var row = data_1[_i];
    _loop_1(row);
  }
  // Create blob and download link
  var csvContent = csvRows.join("\n");
  var blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  var url = URL.createObjectURL(blob);
  var link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    ""
      .concat(filename, "-")
      .concat(new Date().toISOString().split("T")[0], ".csv"),
  );
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
