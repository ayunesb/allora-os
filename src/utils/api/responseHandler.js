"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.standardizeApiResponse = standardizeApiResponse;
exports.extractErrorMessage = extractErrorMessage;
/**
 * Standardizes API responses to ensure a consistent format
 * @param result The result from the API call
 * @param successMessage Default success message
 * @param error Optional error object
 */
function standardizeApiResponse(result, successMessage, error) {
  // If we have a direct result with success property, use that
  if (result && typeof result.success === "boolean") {
    return {
      success: result.success,
      message:
        result.message ||
        (result.success ? successMessage : "Operation failed"),
      data: result.data || null,
      error: result.error || null,
    };
  }
  // If we have an error, return an error response
  if (error) {
    var errorMessage =
      typeof error === "object" && error !== null && "message" in error
        ? error.message
        : typeof error === "string"
          ? error
          : "An unexpected error occurred";
    return {
      success: false,
      message: errorMessage,
      data: null,
      error: error,
    };
  }
  // Default success response
  return {
    success: true,
    message: successMessage,
    data: result || null,
    error: null,
  };
}
/**
 * Safely extracts error messages from various error object formats
 * @param error Error object from API or exception
 */
function extractErrorMessage(error) {
  if (!error) return "Unknown error occurred";
  if (typeof error === "string") return error;
  if (error instanceof Error) return error.message;
  if (typeof error === "object") {
    // Handle Supabase error format
    if (error.message) return error.message;
    // Handle API response error format
    if (error.error)
      return typeof error.error === "string"
        ? error.error
        : extractErrorMessage(error.error);
    // Handle error object with details
    if (error.details)
      return typeof error.details === "string"
        ? error.details
        : JSON.stringify(error.details);
  }
  return "An unexpected error occurred";
}
