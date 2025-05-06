"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupErrorLogging = setupErrorLogging;
exports.logError = logError;
var loggingService_1 = require("@/utils/loggingService");
/**
 * Setup global error logging
 */
function setupErrorLogging() {
  // Handle uncaught exceptions
  window.addEventListener("error", function (event) {
    logError(event.error || new Error(event.message), {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      type: "uncaught",
    });
  });
  // Handle unhandled promise rejections
  window.addEventListener("unhandledrejection", function (event) {
    logError(event.reason, { type: "unhandled-promise" });
  });
  loggingService_1.logger.info("Global error logging initialized");
}
/**
 * Log an error to our error tracking system
 */
function logError(error, metadata) {
  if (metadata === void 0) {
    metadata = {};
  }
  try {
    var errorObject = error instanceof Error ? error : new Error(String(error));
    var errorInfo = __assign(
      __assign(
        {
          name: errorObject.name,
          message: errorObject.message,
          stack: errorObject.stack,
        },
        metadata,
      ),
      {
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
      },
    );
    // Log to console in development
    loggingService_1.logger.error("Error logged:", errorObject, errorInfo);
    // In production, you would send this to your error tracking service
    if (process.env.NODE_ENV === "production") {
      // Example: Sentry.captureException(errorObject, { extra: errorInfo });
    }
  } catch (loggingError) {
    // Fallback if our error logger itself fails
    console.error("Error logging failed:", loggingError);
    console.error("Original error:", error);
  }
}
