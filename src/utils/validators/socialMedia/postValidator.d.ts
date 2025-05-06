/**
 * Post Validator for Social Media
 *
 * This file contains the main validation function for entire social media posts
 */
import { ValidationResult } from "../types";
/**
 * Validate a social media post for security and data integrity
 * Performs deep validation of all post properties
 *
 * @param postData Social media post data to validate
 * @returns Validation result with success status and message
 *
 * @example
 * // Validate post data before submission
 * const validation = validateSocialMediaPost(postFormData);
 * if (!validation.valid) {
 *   showError(validation.message);
 *   return;
 * }
 */
export declare function validateSocialMediaPost(
  postData: any,
): Promise<ValidationResult>;
