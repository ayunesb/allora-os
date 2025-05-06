/**
 * Represents a standardized API response structure
 */
export interface StandardResponse<T> {
  success: boolean;
  data: T | null;
  message: string;
  error?: string;
  errorCode?: string;
}

/**
 * Creates a success response with the given data and message
 */
export function successResponse<T>(
  data: T,
  message = "Operation successful",
): StandardResponse<T> {
  return {
    success: true,
    data,
    message,
  };
}

/**
 * Creates an error response with the given message and optional error details
 */
export function errorResponse<T>(
  message: string,
  error?: string,
  errorCode?: string,
): StandardResponse<T> {
  // Simpler error logging without depending on a logger
  if (error) {
    console.error(`API Error: ${message}`, { error, errorCode });
  }

  return {
    success: false,
    data: null,
    message,
    error,
    errorCode,
  };
}

/**
 * Safely executes a function and returns a standardized response
 */
export async function safeExecute<T>(
  fn: () => Promise<T>,
  successMessage = "Operation successful",
  errorMessage = "Operation failed",
): Promise<StandardResponse<T>> {
  try {
    const result = await fn();
    return successResponse(result, successMessage);
  } catch (error) {
    const errorDetail =
      error instanceof Error ? error.message : "Unknown error";
    return errorResponse(errorMessage, errorDetail);
  }
}
