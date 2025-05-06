"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorType = void 0;
/**
 * Error types that can occur in the application
 */
var ErrorType;
(function (ErrorType) {
  // API related errors
  ErrorType["API_CONNECTION"] = "api_connection";
  ErrorType["API_RESPONSE"] = "api_response";
  ErrorType["API_TIMEOUT"] = "api_timeout";
  ErrorType["API_VALIDATION"] = "api_validation";
  // Authentication errors
  ErrorType["AUTH_EXPIRED"] = "auth_expired";
  ErrorType["AUTH_INVALID"] = "auth_invalid";
  ErrorType["AUTH_MISSING"] = "auth_missing";
  ErrorType["AUTH_REQUIRED"] = "auth_required";
  // Data errors
  ErrorType["DATA_CORRUPT"] = "data_corrupt";
  ErrorType["DATA_MISSING"] = "data_missing";
  ErrorType["DATA_VALIDATION"] = "data_validation";
  // Network errors
  ErrorType["NETWORK_ERROR"] = "network_error";
  ErrorType["SERVER_ERROR"] = "server_error";
  // User input errors
  ErrorType["USER_INPUT"] = "user_input";
  // Permission errors
  ErrorType["PERMISSION_DENIED"] = "permission_denied";
  // Unknown/unexpected errors
  ErrorType["UNKNOWN"] = "unknown";
})(ErrorType || (exports.ErrorType = ErrorType = {}));
