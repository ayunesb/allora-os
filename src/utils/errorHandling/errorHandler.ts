
import { ErrorType, AppError } from '@/utils/errorHandling/errorTypes';
import { logger } from '@/utils/loggingService';
import { toast } from 'sonner';

interface ErrorHandlingOptions {
  showToast?: boolean;
  logError?: boolean;
  context?: Record<string, unknown>;
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
    context = {}
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
    toast.error(processedError.message);
  }
  
  return processedError;
}

// Re-export ErrorType for convenience
export { ErrorType };
