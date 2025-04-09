
/**
 * Collection of validation functions for consistent input validation
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
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  
  // Basic email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

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
export function isNonEmptyString(value: unknown): boolean {
  return typeof value === 'string' && value.trim().length > 0;
}

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
export function isValidUuid(value: unknown): boolean {
  if (typeof value !== 'string') return false;
  
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(value);
}

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
export function validateAll(
  value: unknown, 
  validationFns: Array<(value: unknown) => boolean>
): boolean {
  return validationFns.every(fn => fn(value));
}
