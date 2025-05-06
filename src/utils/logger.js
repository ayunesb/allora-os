"use strict";
/**
 * Enhanced logging utility for development and debugging
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.logDiagnosticInfo = logDiagnosticInfo;
exports.logError = logError;
exports.logWarning = logWarning;
exports.logPerformance = logPerformance;
exports.startPerformanceTimer = startPerformanceTimer;
// Set to true to enable verbose logging
var VERBOSE_LOGGING = true;
/**
 * Log diagnostic information with structured format
 */
function logDiagnosticInfo(title, data) {
  if (!VERBOSE_LOGGING) return;
  console.group("\uD83D\uDD0D ".concat(title));
  if (typeof data === "object" && data !== null) {
    Object.entries(data).forEach(function (_a) {
      var key = _a[0],
        value = _a[1];
      console.log("".concat(key, ":"), value);
    });
  } else {
    console.log(data);
  }
  console.groupEnd();
}
/**
 * Log application errors with context information
 */
function logError(error, context, additionalData) {
  console.error("\u274C Error in ".concat(context, ":"), error);
  if (additionalData && VERBOSE_LOGGING) {
    console.error("Additional context:", additionalData);
  }
  // In a production app, we could send this to an error tracking service
}
/**
 * Log application warnings
 */
function logWarning(message, context, data) {
  console.warn(
    "\u26A0\uFE0F Warning in ".concat(context, ": ").concat(message),
  );
  if (data && VERBOSE_LOGGING) {
    console.warn("Details:", data);
  }
}
/**
 * Log performance information
 */
function logPerformance(operation, timeInMs) {
  if (!VERBOSE_LOGGING) return;
  console.log(
    "\u23F1\uFE0F Performance: "
      .concat(operation, " took ")
      .concat(timeInMs.toFixed(2), "ms"),
  );
}
/**
 * Start a timer for performance logging
 */
function startPerformanceTimer(operation) {
  if (!VERBOSE_LOGGING) return function () {};
  var startTime = performance.now();
  return function () {
    var endTime = performance.now();
    logPerformance(operation, endTime - startTime);
  };
}
