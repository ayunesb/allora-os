/**
 * Form Validators for Social Media Posts
 *
 * This file contains functions for validating form data for creating and updating social media posts
 */
/**
 * Validate data for creating a social media post
 * Includes sanitization and security checks
 *
 * @param postData Post data for creation
 * @returns Validated data or error details
 */
export declare function validateCreatePost(postData: any): {
    valid: boolean;
    data?: any;
    errors?: Record<string, string>;
};
/**
 * Validate data for updating a social media post
 * Includes sanitization and security checks
 *
 * @param postData Post data for update
 * @returns Validated data or error details
 */
export declare function validateUpdatePost(postData: any): {
    valid: boolean;
    data?: any;
    errors?: Record<string, string>;
};
