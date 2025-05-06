/**
 * Common validation utilities
 *
 * This module provides reusable validation functions that can be used
 * across different parts of the application.
 */
/**
 * Validates if an email is in the correct format
 * @example
 * // Check if email is valid
 * if (!isValidEmail(userEmail)) {
 *   return errorResponse("Invalid email format");
 * }
 *
 * @param email Email to validate
 * @returns Boolean indicating if the email is valid
 */
export declare function isValidEmail(email: string): boolean;
/**
 * Validates if a string is not empty or undefined
 * @example
 * // Check if name is provided
 * if (!isNonEmptyString(name)) {
 *   return errorResponse("Name is required");
 * }
 *
 * @param value String to validate
 * @returns Boolean indicating if the string is valid
 */
export declare function isNonEmptyString(value: unknown): boolean;
/**
 * Validates if a value is a valid UUID
 * @example
 * // Check if ID is a valid UUID
 * if (!isValidUuid(userId)) {
 *   return errorResponse("Invalid user ID format");
 * }
 *
 * @param value Value to validate
 * @returns Boolean indicating if the value is a valid UUID
 */
export declare function isValidUuid(value: unknown): boolean;
/**
 * Validates that a value meets all provided validation functions
 * @example
 * // Validate multiple conditions
 * if (!validateAll(
 *   userId,
 *   [isNonEmptyString, isValidUuid],
 *   "Invalid user ID"
 * )) {
 *   return errorResponse("Invalid user ID format");
 * }
 *
 * @param value Value to validate
 * @param validationFns Array of validation functions to apply
 * @returns Boolean indicating if the value passes all validations
 */
export declare function validateAll(
  value: unknown,
  validationFns: Array<(value: unknown) => boolean>,
): boolean;
/**
 * Validates if a value is a valid URL
 * @param url URL to validate
 * @returns Boolean indicating if the URL is valid
 */
export declare function isValidUrl(url: unknown): boolean;
/**
 * Validates if a date string is in ISO format
 * @param date Date string to validate
 * @returns Boolean indicating if the date string is valid
 */
export declare function isValidIsoDate(date: unknown): boolean;
/**
 * Validates if a value is a positive number
 * @param value Value to validate
 * @returns Boolean indicating if the value is a positive number
 */
export declare function isPositiveNumber(value: unknown): boolean;
/**
 * Validates if a value is within a specified range
 * @param value Value to validate
 * @param min Minimum allowed value
 * @param max Maximum allowed value
 * @returns Boolean indicating if the value is within range
 */
export declare function isWithinRange(
  value: number,
  min: number,
  max: number,
): boolean;
/**
 * Validates if a value is a valid phone number
 * Uses a basic regex that accepts common formats
 * @param phone Phone number to validate
 * @returns Boolean indicating if the phone number is valid
 */
export declare function isValidPhoneNumber(phone: unknown): boolean;
/**
 * Validates a strong password
 * @param password Password to validate
 * @returns Boolean indicating if the password meets security requirements
 */
export declare function isStrongPassword(password: string): boolean;
