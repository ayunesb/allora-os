
/**
 * CSRF Protection Utilities
 * 
 * This file contains utilities for implementing CSRF protection
 * throughout the application.
 */

/**
 * Get the current CSRF token
 * @returns The current CSRF token or null if not present
 */
export function getCsrfToken(): string | null {
  return sessionStorage.getItem('csrfToken');
}

/**
 * Generate a new CSRF token
 * @returns A new CSRF token
 */
export function generateCsrfToken(): string {
  const token = Math.random().toString(36).substring(2, 15) + 
               Math.random().toString(36).substring(2, 15);
  sessionStorage.setItem('csrfToken', token);
  return token;
}

/**
 * Add a CSRF token to form data
 * @param formData Form data to add CSRF token to
 * @returns Form data with CSRF token
 */
export function addCsrfToFormData<T extends Record<string, any>>(formData: T): T & { csrfToken: string } {
  let token = getCsrfToken();
  
  // Generate a token if one doesn't exist
  if (!token) {
    token = generateCsrfToken();
  }
  
  return {
    ...formData,
    csrfToken: token
  };
}

/**
 * Verify a CSRF token against the stored token
 * @param token Token to verify
 * @returns Whether the token is valid
 */
export function verifyCsrfToken(token: string): boolean {
  const storedToken = getCsrfToken();
  return storedToken === token;
}

/**
 * Add CSRF protection headers to a fetch request
 * @param headers Headers object to add CSRF protection to
 * @returns Headers with CSRF protection
 */
export function addCsrfHeaders(headers: Record<string, string> = {}): Record<string, string> {
  const token = getCsrfToken();
  
  if (token) {
    return {
      ...headers,
      'X-CSRF-Token': token
    };
  }
  
  return headers;
}

/**
 * Create a CSRF protected fetch function
 * @returns A fetch function with CSRF protection
 */
export function createProtectedFetch() {
  return async (url: string, options: RequestInit = {}) => {
    const token = getCsrfToken();
    
    if (!token) {
      // Generate a new token if one doesn't exist
      generateCsrfToken();
    }
    
    // Add CSRF token to headers
    const headers = new Headers(options.headers || {});
    headers.set('X-CSRF-Token', getCsrfToken() || '');
    
    // Return modified fetch
    return fetch(url, {
      ...options,
      headers
    });
  };
}
