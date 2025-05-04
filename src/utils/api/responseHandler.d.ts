/**
 * Standardizes API responses to ensure a consistent format
 * @param result The result from the API call
 * @param successMessage Default success message
 * @param error Optional error object
 */
export declare function standardizeApiResponse(result: any, successMessage: string, error?: any): {
    success: any;
    message: any;
    data: any;
    error: any;
};
/**
 * Safely extracts error messages from various error object formats
 * @param error Error object from API or exception
 */
export declare function extractErrorMessage(error: any): string;
