
import { logger } from '@/utils/loggingService';
import { AppError, ErrorType, createAppError } from './errorTypes';
import { errorEventBus } from './errorEventBus';

// Configure Supabase error logging
let isErrorLoggingSetup = false;

/**
 * Set up global error handling and logging
 */
export function setupErrorLogging() {
  if (isErrorLoggingSetup) return;
  
  // Set up global unhandled error handling
  window.addEventListener('error', (event) => {
    const appError = createAppError(
      ErrorType.UNKNOWN_ERROR,
      event.message || 'Unknown error occurred',
      {
        originalError: event.error,
        isCritical: true,
        context: {
          fileName: event.filename,
          lineNumber: event.lineno,
          columnNumber: event.colno,
          stack: event.error?.stack,
        }
      }
    );
    
    logError(appError);
  });
  
  // Set up unhandled promise rejection handling
  window.addEventListener('unhandledrejection', (event) => {
    const appError = createAppError(
      ErrorType.UNKNOWN_ERROR,
      event.reason?.message || 'Unhandled promise rejection',
      {
        originalError: event.reason,
        isCritical: true,
        context: {
          stack: event.reason?.stack,
        }
      }
    );
    
    logError(appError);
  });
  
  isErrorLoggingSetup = true;
  logger.info('Error logging system initialized');
}

/**
 * Log an error to the centralized error logging system
 */
export function logError(error: AppError) {
  // Log to console in development
  console.error('Application error:', error);
  
  // Log to our logging service
  logger.error(`[${error.type}] ${error.message}`, {
    errorDetails: error,
    url: window.location.href,
    timestamp: new Date().toISOString()
  });
  
  // In a real implementation, we would log to Supabase here
  // For example:
  // const { data, error: dbError } = await supabase
  //   .from('error_logs')
  //   .insert([
  //     {
  //       error_type: error.type,
  //       message: error.message,
  //       context: error.context,
  //       user_id: currentUser?.id,
  //       url: window.location.href,
  //       browser: navigator.userAgent,
  //       timestamp: new Date().toISOString()
  //     }
  //   ]);
  
  // Publish the error to the event bus for other components to react
  errorEventBus.publish(error);
  
  return error;
}
