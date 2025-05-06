/**
 * Basic error interface for application errors
 */
export interface AppError {
  message: string;
  code?: string;
  isCritical?: boolean; // Added this property to fix the GlobalErrorModal error
  data?: any;
  timestamp?: Date;
  source?: string;
}

/**
 * Error types that can occur in the application
 */
export enum ErrorType {
  // API related errors
  API_CONNECTION = "api_connection",
  API_RESPONSE = "api_response",
  API_TIMEOUT = "api_timeout",
  API_VALIDATION = "api_validation",

  // Authentication errors
  AUTH_EXPIRED = "auth_expired",
  AUTH_INVALID = "auth_invalid",
  AUTH_MISSING = "auth_missing",
  AUTH_REQUIRED = "auth_required",

  // Data errors
  DATA_CORRUPT = "data_corrupt",
  DATA_MISSING = "data_missing",
  DATA_VALIDATION = "data_validation",

  // Network errors
  NETWORK_ERROR = "network_error",
  SERVER_ERROR = "server_error",

  // User input errors
  USER_INPUT = "user_input",

  // Permission errors
  PERMISSION_DENIED = "permission_denied",

  // Unknown/unexpected errors
  UNKNOWN = "unknown",
}
