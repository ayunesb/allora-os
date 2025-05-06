"use strict";
/**
 * Date formatting and calculation utilities
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDateTime =
  exports.formatDate =
  exports.getRelativeTime =
  exports.formatRelativeTime =
    void 0;
/**
 * Format a date in relative time (e.g. "2 days ago", "just now")
 * @param dateString ISO date string or Date object
 * @returns Formatted relative time string
 */
var formatRelativeTime = function (dateString) {
  var date = typeof dateString === "string" ? new Date(dateString) : dateString;
  var now = new Date();
  var diffMs = now.getTime() - date.getTime();
  var diffSecs = Math.floor(diffMs / 1000);
  var diffMins = Math.floor(diffSecs / 60);
  var diffHours = Math.floor(diffMins / 60);
  var diffDays = Math.floor(diffHours / 24);
  if (diffSecs < 60) {
    return "just now";
  } else if (diffMins < 60) {
    return ""
      .concat(diffMins, " minute")
      .concat(diffMins > 1 ? "s" : "", " ago");
  } else if (diffHours < 24) {
    return ""
      .concat(diffHours, " hour")
      .concat(diffHours > 1 ? "s" : "", " ago");
  } else if (diffDays < 30) {
    return "".concat(diffDays, " day").concat(diffDays > 1 ? "s" : "", " ago");
  } else {
    // Format as a standard date for older dates
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
};
exports.formatRelativeTime = formatRelativeTime;
/**
 * Get relative time (for backward compatibility)
 * @param dateString ISO date string or Date object
 * @returns Formatted relative time string
 */
exports.getRelativeTime = exports.formatRelativeTime;
/**
 * Format a date as a standard date string
 * @param date ISO date string or Date object
 * @returns Formatted date string (e.g. "Jan 1, 2023")
 */
var formatDate = function (date) {
  var dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
exports.formatDate = formatDate;
/**
 * Format a date as a standard date and time string
 * @param date ISO date string or Date object
 * @returns Formatted date and time string (e.g. "Jan 1, 2023, 12:00 PM")
 */
var formatDateTime = function (date) {
  var dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};
exports.formatDateTime = formatDateTime;
