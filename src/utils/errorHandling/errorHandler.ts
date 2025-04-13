
import { ErrorType, AppError } from '@/utils/errorHandling/errorTypes';
import { logger } from '@/utils/loggingService';
import { toast } from 'sonner';

interface ErrorHandlingOptions {
  showToast?: boolean;
  logError?: boolean;
  context?: Record<string, unknown>;
  a11yContext?: string; // For improved accessibility
  toastDuration?: number;
}

/**
 * Centralized error handler for consistent error handling
 */
export function handleError(
  error: unknown, 
  options: ErrorHandlingOptions = {}
): AppError {
  const { 
    showToast = true, 
    logError = true,
    context = {},
    a11yContext,
    toastDuration = 5000
  } = options;
  
  // Default values for unknown errors
  let processedError: AppError = {
    type: ErrorType.UNKNOWN_ERROR,
    message: 'An unexpected error occurred',
    timestamp: Date.now(),
    isCritical: false,
    context
  };
  
  // Process known error types
  if (error instanceof Error) {
    processedError = {
      ...processedError,
      message: error.message,
      originalError: error
    };
    
    // Determine error type based on error name
    if (error.name === 'TimeoutError') {
      processedError.type = ErrorType.TIMEOUT_ERROR;
    } else if (error.name === 'NetworkError') {
      processedError.type = ErrorType.NETWORK_ERROR;
    } else if (error.name === 'ValidationError') {
      processedError.type = ErrorType.VALIDATION_ERROR;
    } else if (error.name === 'AuthenticationError') {
      processedError.type = ErrorType.AUTHENTICATION_ERROR;
    } else if (error.name === 'AuthorizationError') {
      processedError.type = ErrorType.AUTHORIZATION_ERROR;
    }
  } else if (typeof error === 'string') {
    processedError.message = error;
  } else if (error && typeof error === 'object') {
    const errorObject = error as Record<string, any>;
    
    if ('type' in errorObject && Object.values(ErrorType).includes(errorObject.type)) {
      processedError.type = errorObject.type as ErrorType;
    }
    
    if ('message' in errorObject) {
      processedError.message = String(errorObject.message);
    }
    
    if ('code' in errorObject) {
      processedError.code = errorObject.code;
    }
    
    processedError.originalError = errorObject;
  }
  
  // Log the error
  if (logError) {
    logger.error(`${processedError.type}: ${processedError.message}`, {
      errorDetails: processedError,
      context
    });
  }
  
  // Show toast notification
  if (showToast) {
    toast.error(processedError.message, {
      id: `error-${processedError.type}-${Date.now()}`,
      duration: toastDuration
    });
    
    // Add ARIA live region for accessibility
    const ariaLiveRegion = document.getElementById('aria-live-polite');
    if (ariaLiveRegion && a11yContext) {
      ariaLiveRegion.textContent = `${processedError.message}. ${a11yContext}`;
    }
  }
  
  return processedError;
}

// Setup ARIA live regions for accessibility
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

// Re-export ErrorType for convenience
export { ErrorType };

// Automatically set up accessible error handling when this module is imported
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', setupAccessibleErrorHandling);
}
