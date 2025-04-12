
import { toast } from 'sonner';
import { logger } from '@/utils/loggingService';

// Error type definitions
export type ApiErrorCode = 
  | 'NETWORK_ERROR'
  | 'TIMEOUT'
  | 'AUTHENTICATION_ERROR'
  | 'AUTHORIZATION_ERROR'
  | 'NOT_FOUND'
  | 'VALIDATION_ERROR'
  | 'SERVER_ERROR'
  | 'UNKNOWN_ERROR';

export interface ApiErrorDetails {
  code: ApiErrorCode;
  message: string;
  statusCode?: number;
  context?: Record<string, any>;
}

/**
 * Maps HTTP status codes to standardized error types
 */
export function mapHttpStatusToErrorCode(status: number): ApiErrorCode {
  if (status >= 500) return 'SERVER_ERROR';
  if (status === 404) return 'NOT_FOUND';
  if (status === 401) return 'AUTHENTICATION_ERROR';
  if (status === 403) return 'AUTHORIZATION_ERROR';
  if (status === 422 || status === 400) return 'VALIDATION_ERROR';
  return 'UNKNOWN_ERROR';
}

/**
 * Generate a user-friendly error message based on error details
 */
export function generateUserFriendlyMessage(error: ApiErrorDetails): string {
  switch (error.code) {
    case 'NETWORK_ERROR':
      return 'Unable to connect to the server. Please check your internet connection and try again.';
    case 'TIMEOUT':
      return 'The request timed out. Please try again later.';
    case 'AUTHENTICATION_ERROR':
      return 'Your session has expired. Please log in again.';
    case 'AUTHORIZATION_ERROR':
      return 'You don\'t have permission to perform this action.';
    case 'NOT_FOUND':
      return 'The requested resource was not found.';
    case 'VALIDATION_ERROR':
      return error.message || 'Please check your input and try again.';
    case 'SERVER_ERROR':
      return 'Something went wrong on our end. We\'re working to fix it.';
    default:
      return error.message || 'An unexpected error occurred. Please try again.';
  }
}

/**
 * Handle API errors with consistent logging and user feedback
 */
export function handleApiError(error: any, options: {
  showToast?: boolean;
  customMessage?: string;
  logError?: boolean;
  rethrow?: boolean;
} = {}): ApiErrorDetails {
  const { 
    showToast = true, 
    customMessage,
    logError = true,
    rethrow = false 
  } = options;
  
  // Determine error type
  let errorDetails: ApiErrorDetails;
  
  if (error.name === 'AbortError') {
    errorDetails = {
      code: 'TIMEOUT',
      message: 'Request timed out'
    };
  } else if (error.message === 'Network Error' || !navigator.onLine) {
    errorDetails = {
      code: 'NETWORK_ERROR',
      message: 'Network connection error'
    };
  } else if (error.status || error.statusCode) {
    const status = error.status || error.statusCode;
    errorDetails = {
      code: mapHttpStatusToErrorCode(status),
      message: error.message || error.error || 'An error occurred',
      statusCode: status,
      context: error.details || error.context || {}
    };
  } else {
    errorDetails = {
      code: 'UNKNOWN_ERROR',
      message: error.message || 'Unknown error occurred',
      context: error
    };
  }
  
  // Log error
  if (logError) {
    logger.error('API Error:', error, {
      errorCode: errorDetails.code,
      message: errorDetails.message,
      status: errorDetails.statusCode,
      context: errorDetails.context
    });
  }
  
  // Show toast notification
  if (showToast) {
    toast.error(
      customMessage || generateUserFriendlyMessage(errorDetails), 
      { id: `error-${errorDetails.code}-${Date.now()}` }
    );
  }
  
  // Rethrow if needed
  if (rethrow) {
    throw errorDetails;
  }
  
  return errorDetails;
}
