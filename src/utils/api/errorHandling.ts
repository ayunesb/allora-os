
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
  | 'UNKNOWN_ERROR'
  | 'ACCESSIBILITY_ERROR';

export interface ApiErrorDetails {
  code: ApiErrorCode;
  message: string;
  statusCode?: number;
  context?: Record<string, any>;
  a11yContext?: string; // Additional context for screen readers
  timestamp?: number;
  path?: string;
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
    case 'ACCESSIBILITY_ERROR':
      return 'An accessibility issue was encountered. We\'re working to improve this.';
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
  toastDuration?: number;
  a11yContext?: string;
} = {}): ApiErrorDetails {
  const { 
    showToast = true, 
    customMessage,
    logError = true,
    rethrow = false,
    toastDuration = 5000,
    a11yContext
  } = options;
  
  // Determine error type
  let errorDetails: ApiErrorDetails = {
    code: 'UNKNOWN_ERROR',
    message: 'An unknown error occurred',
    timestamp: Date.now(),
    path: window.location.pathname
  };
  
  if (error.name === 'AbortError') {
    errorDetails = {
      ...errorDetails,
      code: 'TIMEOUT',
      message: 'Request timed out',
      a11yContext
    };
  } else if (error.message === 'Network Error' || !navigator.onLine) {
    errorDetails = {
      ...errorDetails,
      code: 'NETWORK_ERROR',
      message: 'Network connection error',
      a11yContext
    };
  } else if (error.status || error.statusCode) {
    const status = error.status || error.statusCode;
    errorDetails = {
      ...errorDetails,
      code: mapHttpStatusToErrorCode(status),
      message: error.message || error.error || 'An error occurred',
      statusCode: status,
      context: error.details || error.context || {},
      a11yContext
    };
  } else {
    errorDetails = {
      ...errorDetails,
      code: 'UNKNOWN_ERROR',
      message: error.message || 'Unknown error occurred',
      context: error,
      a11yContext
    };
  }
  
  // For auth errors, we can automatically redirect to login
  if (errorDetails.code === 'AUTHENTICATION_ERROR' && !window.location.pathname.includes('/auth/')) {
    // Add a small delay to allow the error message to be seen
    setTimeout(() => {
      window.location.href = '/auth/login?session_expired=true';
    }, 2000);
  }
  
  // Log error
  if (logError) {
    logger.error('API Error:', {
      errorCode: errorDetails.code,
      message: errorDetails.message,
      status: errorDetails.statusCode,
      context: errorDetails.context,
      a11yContext: errorDetails.a11yContext,
      url: window.location.href,
      timestamp: new Date().toISOString()
    });
  }
  
  // Show toast notification
  if (showToast) {
    const toastMessage = customMessage || generateUserFriendlyMessage(errorDetails);
    const toastContext = errorDetails.context && Object.keys(errorDetails.context).length > 0
      ? { description: JSON.stringify(errorDetails.context).substring(0, 100) }
      : { description: errorDetails.a11yContext || undefined };
      
    toast.error(toastMessage, { 
      id: `error-${errorDetails.code}-${Date.now()}`,
      duration: toastDuration,
      ...toastContext
    });
    
    // Add ARIA live region for screen readers
    const ariaLiveRegion = document.getElementById('aria-live-polite');
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
export function setupAccessibleErrorHandling() {
  if (!document.getElementById('aria-live-polite')) {
    const ariaLivePolite = document.createElement('div');
    ariaLivePolite.id = 'aria-live-polite';
    ariaLivePolite.setAttribute('aria-live', 'polite');
    ariaLivePolite.className = 'sr-only';
    document.body.appendChild(ariaLivePolite);
  }
  
  if (!document.getElementById('aria-live-assertive')) {
    const ariaLiveAssertive = document.createElement('div');
    ariaLiveAssertive.id = 'aria-live-assertive';
    ariaLiveAssertive.setAttribute('aria-live', 'assertive');
    ariaLiveAssertive.className = 'sr-only';
    document.body.appendChild(ariaLiveAssertive);
  }
}

// Set up accessible error handling
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', setupAccessibleErrorHandling);
}
