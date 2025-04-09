
import { logger } from '@/utils/loggingService';

/**
 * Represents a standardized API response structure
 * 
 * @template T The type of data being returned
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
 * 
 * @example
 * // Return a success response with user data
 * return successResponse(userData, "User profile retrieved successfully");
 * 
 * @param data The data to include in the response
 * @param message A success message
 * @returns A standardized success response object
 */
export function successResponse<T>(data: T, message = 'Operation successful'): StandardResponse<T> {
  return {
    success: true,
    data,
    message
  };
}

/**
 * Creates an error response with the given message and optional error details
 * 
 * @example
 * // Return an error response when user not found
 * return errorResponse("User not found", "Could not find user with provided email", "USER_NOT_FOUND");
 * 
 * @param message A user-friendly error message
 * @param error Technical error details (optional)
 * @param errorCode A code identifying the type of error (optional)
 * @returns A standardized error response object
 */
export function errorResponse<T>(
  message: string, 
  error?: string,
  errorCode?: string
): StandardResponse<T> {
  // Log error for monitoring and debugging
  if (error) {
    logger.error(`API Error: ${message}`, { error, errorCode });
  }
  
  return {
    success: false,
    data: null,
    message,
    error,
    errorCode
  };
}

/**
 * Safely executes a function and returns a standardized response
 * 
 * @example
 * // Wrap a database operation in safeExecute
 * return safeExecute(
 *   async () => await fetchUserData(userId),
 *   "User data retrieved successfully",
 *   "Failed to retrieve user data"
 * );
 * 
 * @param fn The function to execute
 * @param successMessage The message to return on success
 * @param errorMessage The message to return on error
 * @returns A promise resolving to a standardized response
 */
export async function safeExecute<T>(
  fn: () => Promise<T>,
  successMessage = 'Operation successful',
  errorMessage = 'Operation failed'
): Promise<StandardResponse<T>> {
  try {
    const result = await fn();
    return successResponse(result, successMessage);
  } catch (error) {
    const errorDetail = error instanceof Error ? error.message : 'Unknown error';
    return errorResponse(errorMessage, errorDetail);
  }
}
