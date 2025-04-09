
/**
 * Sanitizes user input to prevent XSS attacks
 * @param input The user input to sanitize
 * @returns Sanitized string
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Sanitizes HTML content for safe display
 * @param html HTML content to sanitize
 * @returns Sanitized HTML string
 */
export function sanitizeHtml(html: string): string {
  if (!html) return '';
  
  // In a production app, you might use a library like DOMPurify here
  // This is a simple implementation for demonstration
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/g, '')
    .replace(/on\w+='[^']*'/g, '');
}

/**
 * Validates an email address format
 * @param email Email to validate
 * @returns Boolean indicating if the email is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Trims and normalizes whitespace in user input
 * @param input User input to normalize
 * @returns Normalized string
 */
export function normalizeInput(input: string): string {
  if (!input) return '';
  return input.trim().replace(/\s+/g, ' ');
}

/**
 * Safely parses a numeric input
 * @param input Numeric input as string
 * @param defaultValue Default value if parsing fails
 * @returns Parsed number or default value
 */
export function parseNumericInput(input: string, defaultValue: number = 0): number {
  const parsed = parseFloat(input);
  return isNaN(parsed) ? defaultValue : parsed;
}
