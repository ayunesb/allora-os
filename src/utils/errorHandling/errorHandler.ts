
/**
 * Centralized Error Handler
 * Processes errors consistently throughout the application
 */

import { toast } from 'sonner';
import { logger } from '@/utils/loggingService';
import { AppError, ErrorType, createAppError, HttpError } from './errorTypes';

// Error processing options
export interface ErrorHandlerOptions {
  showToast?: boolean;
  logError?: boolean;
  throwError?: boolean;
  customMessage?: string;
  toastId?: string;
  toastDuration?: number;
  context?: Record<string, unknown>;
}

// Default error messages mapped by error type
const defaultErrorMessages: Record<ErrorType, string> = {
  [ErrorType.NETWORK_ERROR]: 'Network connection issue. Please check your internet connection.',
  [ErrorType.API_ERROR]: 'An error occurred while communicating with the server.',
  [ErrorType.AUTHENTICATION_ERROR]: 'Authentication required. Please log in again.',
  [ErrorType.AUTHORIZATION_ERROR]: 'You don\'t have permission to perform this action.',
  [ErrorType.VALIDATION_ERROR]: 'Please check your input and try again.',
  [ErrorType.TIMEOUT_ERROR]: 'The request timed out. Please try again.',
  [ErrorType.DATA_NOT_FOUND]: 'The requested data could not be found.',
  [ErrorType.DATA_INVALID]: 'Invalid data encountered.',
  [ErrorType.DATA_STALE]: 'The data has been modified. Please refresh and try again.',
  [ErrorType.UI_ERROR]: 'A user interface error occurred.',
  [ErrorType.RENDERING_ERROR]: 'A display error occurred.',
  [ErrorType.UNKNOWN_ERROR]: 'An unexpected error occurred.',
  [ErrorType.INITIALIZATION_ERROR]: 'Application initialization error.'
};

/**
 * Process an error through the centralized error handler
 */
export function handleError(
  error: unknown,
  options: ErrorHandlerOptions = {}
): AppError {
  const {
    showToast = true,
    logError = true,
    throwError = false,
    customMessage,
    toastId,
    toastDuration = 5000,
    context
  } = options;

  // Convert the error to a standardized AppError
  const appError = normalizeError(error, context);
  
  // Log the error
  if (logError) {
    const logContext = {
      errorType: appError.type,
      errorCode: appError.code,
      context: appError.context,
      isCritical: appError.isCritical
    };
    
    if (appError.isCritical) {
      logger.error('Critical error:', appError.originalError || appError, logContext);
    } else {
      logger.error('Error:', appError.originalError || appError, logContext);
    }
  }
  
  // Display toast notification
  if (showToast) {
    const toastMessage = customMessage || appError.message;
    
    if (appError.isCritical) {
      toast.error(toastMessage, { 
        id: toastId || `error-${appError.type}-${Date.now()}`,
        duration: toastDuration,
        action: {
          label: 'Retry',
          onClick: () => window.location.reload()
        }
      });
    } else {
      toast.error(toastMessage, { 
        id: toastId || `error-${appError.type}-${Date.now()}`,
        duration: toastDuration
      });
    }
  }
  
  // Re-throw the error if requested
  if (throwError) {
    throw appError;
  }
  
  return appError;
}

/**
 * Convert any error to a standardized AppError
 */
export function normalizeError(error: unknown, context?: Record<string, unknown>): AppError {
  // If it's already an AppError, just add any new context
  if (isAppError(error)) {
    if (context) {
      return {
        ...error,
        context: { ...(error.context || {}), ...context }
      };
    }
    return error;
  }
  
  // Check for different error types to create appropriate AppError
  if (error instanceof Error) {
    // Handle specific error types
    if (error.name === 'AbortError') {
      return createAppError(
        ErrorType.TIMEOUT_ERROR,
        defaultErrorMessages[ErrorType.TIMEOUT_ERROR],
        { originalError: error, context }
      );
    }
    
    if (error.message.includes('NetworkError') || error.message.includes('network')) {
      return createAppError(
        ErrorType.NETWORK_ERROR,
        defaultErrorMessages[ErrorType.NETWORK_ERROR],
        { originalError: error, context }
      );
    }
    
    // Default Error handling
    return createAppError(
      ErrorType.UNKNOWN_ERROR,
      error.message || defaultErrorMessages[ErrorType.UNKNOWN_ERROR],
      { originalError: error, context }
    );
  }
  
  // Handle HTTP responses with error status
  if (isHttpResponse(error)) {
    const status = error.status || 500;
    
    // Create an HttpError based on the status code
    const httpError: HttpError = {
      type: getErrorTypeFromStatus(status),
      message: error.statusText || getMessageFromStatus(status),
      status,
      url: error.url,
      method: error.method,
      originalError: error,
      context,
      timestamp: Date.now(),
      isCritical: status >= 500
    };
    
    return httpError;
  }
  
  // For non-Error objects (e.g., string, number, etc.)
  const errorMessage = typeof error === 'string' 
    ? error 
    : defaultErrorMessages[ErrorType.UNKNOWN_ERROR];
  
  return createAppError(
    ErrorType.UNKNOWN_ERROR,
    errorMessage,
    { originalError: error, context }
  );
}

/**
 * Map HTTP status code to error type
 */
function getErrorTypeFromStatus(status: number): ErrorType {
  if (status === 401) return ErrorType.AUTHENTICATION_ERROR;
  if (status === 403) return ErrorType.AUTHORIZATION_ERROR;
  if (status === 404) return ErrorType.DATA_NOT_FOUND;
  if (status === 422 || status === 400) return ErrorType.VALIDATION_ERROR;
  if (status === 408 || status === 504) return ErrorType.TIMEOUT_ERROR;
  if (status >= 500) return ErrorType.API_ERROR;
  return ErrorType.UNKNOWN_ERROR;
}

/**
 * Get error message from HTTP status
 */
function getMessageFromStatus(status: number): string {
  const type = getErrorTypeFromStatus(status);
  return defaultErrorMessages[type];
}

/**
 * Type guard for AppError
 */
function isAppError(error: unknown): error is AppError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'type' in error &&
    'message' in error &&
    'timestamp' in error
  );
}

/**
 * Type guard for HTTP response
 */
function isHttpResponse(value: unknown): value is { 
  status: number; 
  statusText?: string;
  url?: string;
  method?: string;
} {
  return (
    typeof value === 'object' &&
    value !== null &&
    'status' in value
  );
}
