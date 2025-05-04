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
export declare function successResponse<T>(data: T, message?: string): StandardResponse<T>;
/**
 * Creates an error response with the given message and optional error details
 */
export declare function errorResponse<T>(message: string, error?: string, errorCode?: string): StandardResponse<T>;
/**
 * Safely executes a function and returns a standardized response
 */
export declare function safeExecute<T>(fn: () => Promise<T>, successMessage?: string, errorMessage?: string): Promise<StandardResponse<T>>;
