
import { StandardResponse, successResponse, errorResponse } from './standardResponse';

/**
 * Standardizes API responses throughout the application
 * @param data The data to include in the response
 * @param message A success message when data is present, or an error message when data is null
 * @param error Optional error details
 * @returns A standardized response object
 */
export function standardizeApiResponse<T>(
  data: T | null, 
  message: string,
  error?: any
): StandardResponse<T> {
  if (data === null && error) {
    const errorMessage = error instanceof Error ? error.message : 
      (typeof error === 'string' ? error : 'An unexpected error occurred');
    return errorResponse(message, errorMessage);
  }
  
  return successResponse(data as T, message);
}

/**
 * Typed wrapper for fetch API that standardizes responses
 * @param url The URL to fetch
 * @param options Fetch options
 * @returns A standardized response
 */
export async function typedFetch<T>(
  url: string, 
  options?: RequestInit
): Promise<StandardResponse<T>> {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      return errorResponse<T>(
        `Request failed with status ${response.status}`, 
        await response.text(), 
        response.status.toString()
      );
    }
    
    const data = await response.json();
    return successResponse<T>(data);
  } catch (error) {
    return errorResponse<T>(
      'Network request failed', 
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
}

/**
 * Handles errors consistently across the application
 * @param error The error to handle
 * @param fallbackMessage A fallback message if the error doesn't contain one
 * @returns A standardized error object
 */
export function handleApiError<T>(error: any, fallbackMessage = 'An error occurred'): StandardResponse<T> {
  if (error && 'success' in error && error.success === false) {
    // Already a StandardResponse format
    return error as StandardResponse<T>;
  }
  
  const errorMessage = error instanceof Error ? error.message : 
    (typeof error === 'string' ? error : fallbackMessage);
  
  return errorResponse<T>(
    fallbackMessage,
    errorMessage
  );
}
