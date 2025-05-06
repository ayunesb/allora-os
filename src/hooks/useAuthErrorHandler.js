"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuthErrorHandler = useAuthErrorHandler;
var react_1 = require("react");
var sonner_1 = require("sonner");
var loggingService_1 = require("@/utils/loggingService");
var react_router_dom_1 = require("react-router-dom");
function useAuthErrorHandler() {
  var _a = (0, react_1.useState)(null),
    lastError = _a[0],
    setLastError = _a[1];
  var navigate = (0, react_router_dom_1.useNavigate)();
  /**
   * Map Supabase error message to a standardized error type
   */
  var getErrorTypeFromMessage = (0, react_1.useCallback)(function (error) {
    var _a;
    var message =
      ((_a = error === null || error === void 0 ? void 0 : error.message) ===
        null || _a === void 0
        ? void 0
        : _a.toLowerCase()) || "";
    if (
      message.includes("invalid login") ||
      message.includes("invalid credentials")
    ) {
      return "invalid_credentials";
    } else if (message.includes("email not confirmed")) {
      return "email_not_confirmed";
    } else if (message.includes("user not found")) {
      return "user_not_found";
    } else if (
      message.includes("already registered") ||
      message.includes("already in use")
    ) {
      return "email_already_exists";
    } else if (message.includes("weak password")) {
      return "weak_password";
    } else if (message.includes("rate limit")) {
      return "rate_limit";
    } else if (
      message.includes("unauthorized") ||
      message.includes("not authorized")
    ) {
      return "unauthorized";
    } else if (message.includes("network") || message.includes("connection")) {
      return "network_error";
    } else if (message.includes("expired")) {
      return "session_expired";
    }
    return "unknown";
  }, []);
  /**
   * Format error message to be user-friendly
   */
  var getUserFriendlyMessage = (0, react_1.useCallback)(function (
    errorType,
    originalMessage,
  ) {
    switch (errorType) {
      case "invalid_credentials":
        return "Invalid email or password. Please try again.";
      case "email_not_confirmed":
        return "Please verify your email before logging in.";
      case "user_not_found":
        return "No account found with this email address.";
      case "email_already_exists":
        return "An account with this email already exists.";
      case "weak_password":
        return "Password is too weak. Please use a stronger password.";
      case "session_expired":
        return "Your session has expired. Please log in again.";
      case "network_error":
        return "Unable to connect to the authentication service. Please check your internet connection.";
      case "rate_limit":
        return "Too many attempts. Please try again later.";
      case "password_recovery_failed":
        return "Failed to send password recovery email. Please try again later.";
      case "unauthorized":
        return "You don't have permission to access this resource.";
      default:
        return (
          originalMessage || "An unexpected authentication error occurred."
        );
    }
  }, []);
  /**
   * Handle authentication error
   */
  var handleAuthError = (0, react_1.useCallback)(
    function (error, options) {
      if (options === void 0) {
        options = {};
      }
      var _a = options.showToast,
        showToast = _a === void 0 ? true : _a,
        redirectTo = options.redirectTo,
        _b = options.logError,
        logError = _b === void 0 ? true : _b;
      // Extract error details
      var errorMessage =
        (error === null || error === void 0 ? void 0 : error.message) ||
        (error === null || error === void 0 ? void 0 : error.error) ||
        "Authentication error";
      var errorType = getErrorTypeFromMessage(error);
      var userFriendlyMessage = getUserFriendlyMessage(errorType, errorMessage);
      // Create structured error
      var authError = {
        type: errorType,
        message: userFriendlyMessage,
        originalError: error,
      };
      // Store the error
      setLastError(authError);
      // Log the error
      if (logError) {
        loggingService_1.logger.error("Authentication error:", {
          type: errorType,
          message: errorMessage,
          originalError: error,
        });
      }
      // Show toast notification
      if (showToast) {
        sonner_1.toast.error(userFriendlyMessage);
      }
      // Redirect if specified
      if (redirectTo) {
        if (errorType === "session_expired") {
          navigate(redirectTo, { state: { expired: true } });
        } else {
          navigate(redirectTo);
        }
      }
      return authError;
    },
    [getErrorTypeFromMessage, getUserFriendlyMessage, navigate],
  );
  /**
   * Clear the last error
   */
  var clearError = (0, react_1.useCallback)(function () {
    setLastError(null);
  }, []);
  /**
   * Check if the current error is of a specific type
   */
  var isErrorType = (0, react_1.useCallback)(
    function (type) {
      return (
        (lastError === null || lastError === void 0
          ? void 0
          : lastError.type) === type
      );
    },
    [lastError],
  );
  return {
    lastError: lastError,
    handleAuthError: handleAuthError,
    clearError: clearError,
    isErrorType: isErrorType,
  };
}
