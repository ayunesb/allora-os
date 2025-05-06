"use strict";
/**
 * Formatting utilities for displaying data consistently across the application
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePercentChange =
  exports.formatMetric =
  exports.formatDate =
  exports.formatNumber =
  exports.formatPercent =
  exports.formatPercentage =
  exports.formatCurrency =
    void 0;
// Format currency values
var formatCurrency = function (amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
exports.formatCurrency = formatCurrency;
// Format percentage values
var formatPercentage = function (value) {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value / 100);
};
exports.formatPercentage = formatPercentage;
// Alias for formatPercentage for backward compatibility
exports.formatPercent = exports.formatPercentage;
// Format number with thousands separators
var formatNumber = function (value) {
  return new Intl.NumberFormat("en-US").format(value);
};
exports.formatNumber = formatNumber;
// Format date strings in standard format
var formatDate = function (dateString) {
  var date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};
exports.formatDate = formatDate;
// Format metrics with appropriate units (k for thousands, M for millions)
var formatMetric = function (value) {
  if (value >= 1000000) {
    return "".concat((value / 1000000).toFixed(1), "M");
  } else if (value >= 1000) {
    return "".concat((value / 1000).toFixed(1), "k");
  }
  return value.toString();
};
exports.formatMetric = formatMetric;
// Calculate percentage change between two values
var calculatePercentChange = function (current, previous) {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
};
exports.calculatePercentChange = calculatePercentChange;
