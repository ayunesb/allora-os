/**
 * Sanitizes user input to prevent XSS attacks
 * @param input The user input to sanitize
 * @returns Sanitized string
 */
export declare function sanitizeInput(input: string): string;
/**
 * Sanitizes HTML content for safe display
 * @param html HTML content to sanitize
 * @returns Sanitized HTML string
 */
export declare function sanitizeHtml(html: string): string;
/**
 * Validates an email address format
 * @param email Email to validate
 * @returns Boolean indicating if the email is valid
 */
export declare function isValidEmail(email: string): boolean;
/**
 * Trims and normalizes whitespace in user input
 * @param input User input to normalize
 * @returns Normalized string
 */
export declare function normalizeInput(input: string): string;
/**
 * Safely parses a numeric input
 * @param input Numeric input as string
 * @param defaultValue Default value if parsing fails
 * @returns Parsed number or default value
 */
export declare function parseNumericInput(input: string, defaultValue?: number): number;
/**
 * Helper function to safely sanitize form data
 * @param formData Object containing form data to sanitize
 * @returns Sanitized form data object
 */
export declare function sanitizeFormData<T extends Record<string, any>>(formData: T): T;
/**
 * Sanitizes a URL to prevent open redirect vulnerabilities
 * @param url URL to sanitize
 * @param allowedDomains Array of allowed domains (optional)
 * @returns Sanitized URL or empty string if invalid
 */
export declare function sanitizeUrl(url: string, allowedDomains?: string[]): string;
/**
 * Generates a nonce for CSP headers
 * @returns Random nonce string
 */
export declare function generateNonce(): string;
/**
 * Checks if a password meets security requirements
 * @param password Password to check
 * @returns Boolean indicating if password is secure
 */
export declare function isSecurePassword(password: string): boolean;
/**
 * Content Security Policy helper
 * @returns CSP directives as a string
 */
export declare function getCSPDirectives(): string;
