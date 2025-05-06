/**
 * Enhanced logging utility for development and debugging
 */
/**
 * Log diagnostic information with structured format
 */
export declare function logDiagnosticInfo(title: string, data: any): void;
/**
 * Log application errors with context information
 */
export declare function logError(
  error: unknown,
  context: string,
  additionalData?: any,
): void;
/**
 * Log application warnings
 */
export declare function logWarning(
  message: string,
  context: string,
  data?: any,
): void;
/**
 * Log performance information
 */
export declare function logPerformance(
  operation: string,
  timeInMs: number,
): void;
/**
 * Start a timer for performance logging
 */
export declare function startPerformanceTimer(operation: string): () => void;
