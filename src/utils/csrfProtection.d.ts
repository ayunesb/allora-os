/**
 * Generate a CSRF token and store it in localStorage
 */
export declare const generateCsrfToken: () => string;
/**
 * Validate CSRF token
 */
export declare const validateCsrfToken: () => boolean;
/**
 * Get the current CSRF token
 */
export declare const getCsrfToken: () => string | null;
/**
 * Clear the CSRF token
 */
export declare const clearCsrfToken: () => void;
/**
 * Add CSRF token to form data
 */
export declare const addCsrfToFormData: (formData: FormData) => FormData;
