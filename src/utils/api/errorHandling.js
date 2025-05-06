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
exports.mapHttpStatusToErrorCode = mapHttpStatusToErrorCode;
exports.generateUserFriendlyMessage = generateUserFriendlyMessage;
exports.handleApiError = handleApiError;
exports.setupAccessibleErrorHandling = setupAccessibleErrorHandling;
var sonner_1 = require("sonner");
var loggingService_1 = require("@/utils/loggingService");
/**
 * Maps HTTP status codes to standardized error types
 */
function mapHttpStatusToErrorCode(status) {
  if (status >= 500) return "SERVER_ERROR";
  if (status === 404) return "NOT_FOUND";
  if (status === 401) return "AUTHENTICATION_ERROR";
  if (status === 403) return "AUTHORIZATION_ERROR";
  if (status === 422 || status === 400) return "VALIDATION_ERROR";
  return "UNKNOWN_ERROR";
}
/**
 * Generate a user-friendly error message based on error details
 */
function generateUserFriendlyMessage(error) {
  switch (error.code) {
    case "NETWORK_ERROR":
      return "Unable to connect to the server. Please check your internet connection and try again.";
    case "TIMEOUT":
      return "The request timed out. Please try again later.";
    case "AUTHENTICATION_ERROR":
      return "Your session has expired. Please log in again.";
    case "AUTHORIZATION_ERROR":
      return "You don't have permission to perform this action.";
    case "NOT_FOUND":
      return "The requested resource was not found.";
    case "VALIDATION_ERROR":
      return error.message || "Please check your input and try again.";
    case "SERVER_ERROR":
      return "Something went wrong on our end. We're working to fix it.";
    case "ACCESSIBILITY_ERROR":
      return "An accessibility issue was encountered. We're working to improve this.";
    default:
      return error.message || "An unexpected error occurred. Please try again.";
  }
}
/**
 * Handle API errors with consistent logging and user feedback
 */
function handleApiError(error, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.showToast,
    showToast = _a === void 0 ? true : _a,
    customMessage = options.customMessage,
    _b = options.logError,
    logError = _b === void 0 ? true : _b,
    _c = options.rethrow,
    rethrow = _c === void 0 ? false : _c,
    _d = options.toastDuration,
    toastDuration = _d === void 0 ? 5000 : _d,
    a11yContext = options.a11yContext;
  // Determine error type
  var errorDetails = {
    code: "UNKNOWN_ERROR",
    message: "An unknown error occurred",
    timestamp: Date.now(),
    path: window.location.pathname,
  };
  // Type narrowing to determine the error structure
  if (error instanceof Error) {
    // Standard JavaScript Error
    var name_1 = error.name,
      message = error.message,
      stack = error.stack;
    if (name_1 === "AbortError") {
      errorDetails = __assign(__assign({}, errorDetails), {
        code: "TIMEOUT",
        message: "Request timed out",
        a11yContext: a11yContext,
      });
    } else if (message === "Network Error" || !navigator.onLine) {
      errorDetails = __assign(__assign({}, errorDetails), {
        code: "NETWORK_ERROR",
        message: "Network connection error",
        a11yContext: a11yContext,
      });
    } else {
      errorDetails = __assign(__assign({}, errorDetails), {
        message: message,
        context: { stack: stack },
      });
    }
  } else if (typeof error === "object" && error !== null) {
    // Try to extract useful information from error object
    var errorObj = error;
    if ("status" in errorObj || "statusCode" in errorObj) {
      var status_1 = errorObj.status || errorObj.statusCode;
      errorDetails = __assign(__assign({}, errorDetails), {
        code: mapHttpStatusToErrorCode(status_1),
        message:
          typeof errorObj.message === "string"
            ? errorObj.message
            : typeof errorObj.error === "string"
              ? errorObj.error
              : "An error occurred",
        statusCode: status_1,
        context: errorObj.details || errorObj.context,
        a11yContext: a11yContext,
      });
    } else if ("message" in errorObj && typeof errorObj.message === "string") {
      errorDetails = __assign(__assign({}, errorDetails), {
        message: errorObj.message,
        context: errorObj,
      });
    }
  } else if (typeof error === "string") {
    errorDetails = __assign(__assign({}, errorDetails), { message: error });
  }
  // For auth errors, we can automatically redirect to login
  if (
    errorDetails.code === "AUTHENTICATION_ERROR" &&
    !window.location.pathname.includes("/auth/")
  ) {
    // Add a small delay to allow the error message to be seen
    setTimeout(function () {
      window.location.href = "/auth/login?session_expired=true";
    }, 2000);
  }
  // Log error
  if (logError) {
    loggingService_1.logger.error("API Error:", {
      errorCode: errorDetails.code,
      message: errorDetails.message,
      status: errorDetails.statusCode,
      context: errorDetails.context,
      a11yContext: errorDetails.a11yContext,
      url: window.location.href,
      timestamp: new Date().toISOString(),
    });
  }
  // Show toast notification
  if (showToast) {
    var toastMessage =
      customMessage || generateUserFriendlyMessage(errorDetails);
    var toastContext =
      errorDetails.context && Object.keys(errorDetails.context).length > 0
        ? {
            description: JSON.stringify(errorDetails.context).substring(0, 100),
          }
        : { description: errorDetails.a11yContext || undefined };
    sonner_1.toast.error(
      toastMessage,
      __assign(
        {
          id: "error-".concat(errorDetails.code, "-").concat(Date.now()),
          duration: toastDuration,
        },
        toastContext,
      ),
    );
    // Add ARIA live region for screen readers
    var ariaLiveRegion = document.getElementById("aria-live-polite");
    if (ariaLiveRegion) {
      ariaLiveRegion.textContent = toastMessage;
    }
  }
  // Rethrow if needed
  if (rethrow) {
    throw errorDetails;
  }
  return errorDetails;
}
/**
 * Create an accessible ARIA live region in the document if it doesn't exist
 */
function setupAccessibleErrorHandling() {
  if (!document.getElementById("aria-live-polite")) {
    var ariaLivePolite = document.createElement("div");
    ariaLivePolite.id = "aria-live-polite";
    ariaLivePolite.setAttribute("aria-live", "polite");
    ariaLivePolite.className = "sr-only";
    document.body.appendChild(ariaLivePolite);
  }
  if (!document.getElementById("aria-live-assertive")) {
    var ariaLiveAssertive = document.createElement("div");
    ariaLiveAssertive.id = "aria-live-assertive";
    ariaLiveAssertive.setAttribute("aria-live", "assertive");
    ariaLiveAssertive.className = "sr-only";
    document.body.appendChild(ariaLiveAssertive);
  }
}
// Set up accessible error handling
if (typeof window !== "undefined") {
  window.addEventListener("DOMContentLoaded", setupAccessibleErrorHandling);
}
