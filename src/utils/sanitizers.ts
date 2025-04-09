
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
    .replace(/\//g, '&#x2F;')
    .replace(/`/g, '&#x60;') // Added backtick sanitization
    .replace(/{/g, '&#x7B;') // Added curly braces sanitization 
    .replace(/}/g, '&#x7D;'); // Added curly braces sanitization
}

/**
 * Sanitizes HTML content for safe display
 * @param html HTML content to sanitize
 * @returns Sanitized HTML string
 */
export function sanitizeHtml(html: string): string {
  if (!html) return '';
  
  // In a production app, you should use a library like DOMPurify
  // This is a simple implementation that handles common attack vectors
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '') // Also remove iframes
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '') // And objects
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '') // And embeds
    .replace(/javascript:/gi, '') // Remove javascript: URLs
    .replace(/data:/gi, '') // Remove data: URLs 
    .replace(/on\w+="[^"]*"/g, '')
    .replace(/on\w+='[^']*'/g, '')
    .replace(/on\w+=\S+/g, ''); // Handle event handlers without quotes
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

/**
 * Helper function to safely sanitize form data
 * @param formData Object containing form data to sanitize
 * @returns Sanitized form data object
 */
export function sanitizeFormData<T extends Record<string, any>>(formData: T): T {
  const sanitized = { ...formData };
  
  Object.keys(sanitized).forEach(key => {
    const value = sanitized[key];
    if (typeof value === 'string') {
      sanitized[key] = sanitizeInput(value) as any;
    }
  });
  
  return sanitized;
}

/**
 * Sanitizes a URL to prevent open redirect vulnerabilities
 * @param url URL to sanitize
 * @param allowedDomains Array of allowed domains (optional)
 * @returns Sanitized URL or empty string if invalid
 */
export function sanitizeUrl(url: string, allowedDomains?: string[]): string {
  if (!url) return '';
  
  try {
    const urlObj = new URL(url);
    
    // If allowedDomains is provided, check if the URL's domain is in the list
    if (allowedDomains && allowedDomains.length > 0) {
      if (!allowedDomains.some(domain => urlObj.hostname === domain || urlObj.hostname.endsWith(`.${domain}`))) {
        return '';
      }
    }
    
    // Only allow http and https protocols
    if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
      return '';
    }
    
    return url;
  } catch (e) {
    // If the URL is invalid, return an empty string
    return '';
  }
}
