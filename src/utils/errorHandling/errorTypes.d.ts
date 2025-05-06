/**
 * Basic error interface for application errors
 */
export interface AppError {
  message: string;
  code?: string;
  isCritical?: boolean;
  data?: any;
  timestamp?: Date;
  source?: string;
}
/**
 * Error types that can occur in the application
 */
export declare enum ErrorType {
  API_CONNECTION = "api_connection",
  API_RESPONSE = "api_response",
  API_TIMEOUT = "api_timeout",
  API_VALIDATION = "api_validation",
  AUTH_EXPIRED = "auth_expired",
  AUTH_INVALID = "auth_invalid",
  AUTH_MISSING = "auth_missing",
  AUTH_REQUIRED = "auth_required",
  DATA_CORRUPT = "data_corrupt",
  DATA_MISSING = "data_missing",
  DATA_VALIDATION = "data_validation",
  NETWORK_ERROR = "network_error",
  SERVER_ERROR = "server_error",
  USER_INPUT = "user_input",
  PERMISSION_DENIED = "permission_denied",
  UNKNOWN = "unknown",
}
