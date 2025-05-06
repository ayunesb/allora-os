export type ApiErrorCode =
  | "NETWORK_ERROR"
  | "TIMEOUT"
  | "AUTHENTICATION_ERROR"
  | "AUTHORIZATION_ERROR"
  | "NOT_FOUND"
  | "VALIDATION_ERROR"
  | "SERVER_ERROR"
  | "UNKNOWN_ERROR"
  | "ACCESSIBILITY_ERROR";
export interface ApiErrorDetails {
  code: ApiErrorCode;
  message: string;
  statusCode?: number;
  context?: Record<string, unknown>;
  a11yContext?: string;
  timestamp?: number;
  path?: string;
}
export interface ApiErrorOptions {
  showToast?: boolean;
  customMessage?: string;
  logError?: boolean;
  rethrow?: boolean;
  toastDuration?: number;
  a11yContext?: string;
}
/**
 * Maps HTTP status codes to standardized error types
 */
export declare function mapHttpStatusToErrorCode(status: number): ApiErrorCode;
/**
 * Generate a user-friendly error message based on error details
 */
export declare function generateUserFriendlyMessage(
  error: ApiErrorDetails,
): string;
/**
 * Handle API errors with consistent logging and user feedback
 */
export declare function handleApiError(
  error: unknown,
  options?: ApiErrorOptions,
): ApiErrorDetails;
/**
 * Create an accessible ARIA live region in the document if it doesn't exist
 */
export declare function setupAccessibleErrorHandling(): void;
