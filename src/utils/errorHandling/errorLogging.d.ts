/**
 * Setup global error logging
 */
export declare function setupErrorLogging(): void;
/**
 * Log an error to our error tracking system
 */
export declare function logError(
  error: Error | unknown,
  metadata?: Record<string, any>,
): void;
