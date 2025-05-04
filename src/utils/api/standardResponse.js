/**
 * Creates a success response with the given data and message
 */
export function successResponse(data, message = 'Operation successful') {
    return {
        success: true,
        data,
        message
    };
}
/**
 * Creates an error response with the given message and optional error details
 */
export function errorResponse(message, error, errorCode) {
    // Simpler error logging without depending on a logger
    if (error) {
        console.error(`API Error: ${message}`, { error, errorCode });
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
 */
export async function safeExecute(fn, successMessage = 'Operation successful', errorMessage = 'Operation failed') {
    try {
        const result = await fn();
        return successResponse(result, successMessage);
    }
    catch (error) {
        const errorDetail = error instanceof Error ? error.message : 'Unknown error';
        return errorResponse(errorMessage, errorDetail);
    }
}
