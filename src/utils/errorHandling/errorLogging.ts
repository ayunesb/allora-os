import { logger } from "@/utils/loggingService";

/**
 * Setup global error logging
 */
export function setupErrorLogging() {
  // Handle uncaught exceptions
  window.addEventListener("error", (event) => {
    logError(event.error || new Error(event.message), {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      type: "uncaught",
    });
  });

  // Handle unhandled promise rejections
  window.addEventListener("unhandledrejection", (event) => {
    logError(event.reason, { type: "unhandled-promise" });
  });

  logger.info("Global error logging initialized");
}

/**
 * Log an error to our error tracking system
 */
export function logError(
  error: Error | unknown,
  metadata: Record<string, any> = {},
) {
  try {
    const errorObject =
      error instanceof Error ? error : new Error(String(error));

    const errorInfo = {
      name: errorObject.name,
      message: errorObject.message,
      stack: errorObject.stack,
      ...metadata,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
    };

    // Log to console in development
    logger.error("Error logged:", errorObject, errorInfo);

    // In production, you would send this to your error tracking service
    if (process.env.NODE_ENV === "production") {
      // Example: Sentry.captureException(errorObject, { extra: errorInfo });
    }
  } catch (loggingError) {
    // Fallback if our error logger itself fails
    console.error("Error logging failed:", loggingError);
    console.error("Original error:", error);
  }
}
