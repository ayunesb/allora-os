
/**
 * Enhanced logging utility for development and debugging
 */

// Set to true to enable verbose logging
const VERBOSE_LOGGING = true;

/**
 * Log diagnostic information with structured format
 */
export function logDiagnosticInfo(title: string, data: any) {
  if (!VERBOSE_LOGGING) return;
  
  console.group(`🔍 ${title}`);
  
  if (typeof data === 'object' && data !== null) {
    Object.entries(data).forEach(([key, value]) => {
      console.log(`${key}:`, value);
    });
  } else {
    console.log(data);
  }
  
  console.groupEnd();
}

/**
 * Log application errors with context information
 */
export function logError(error: unknown, context: string, additionalData?: any) {
  console.error(`❌ Error in ${context}:`, error);
  
  if (additionalData && VERBOSE_LOGGING) {
    console.error('Additional context:', additionalData);
  }
  
  // In a production app, we could send this to an error tracking service
}

/**
 * Log application warnings
 */
export function logWarning(message: string, context: string, data?: any) {
  console.warn(`⚠️ Warning in ${context}: ${message}`);
  
  if (data && VERBOSE_LOGGING) {
    console.warn('Details:', data);
  }
}

/**
 * Log performance information
 */
export function logPerformance(operation: string, timeInMs: number) {
  if (!VERBOSE_LOGGING) return;
  
  console.log(`⏱️ Performance: ${operation} took ${timeInMs.toFixed(2)}ms`);
}

/**
 * Start a timer for performance logging
 */
export function startPerformanceTimer(operation: string): () => void {
  if (!VERBOSE_LOGGING) return () => {};
  
  const startTime = performance.now();
  
  return () => {
    const endTime = performance.now();
    logPerformance(operation, endTime - startTime);
  };
}
