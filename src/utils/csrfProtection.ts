
/**
 * Generate a CSRF token and store it in localStorage
 */
export const generateCsrfToken = (): string => {
  const token = Math.random().toString(36).substring(2, 15) + 
               Math.random().toString(36).substring(2, 15);
  
  localStorage.setItem('csrf_token', token);
  return token;
};

/**
 * Validate CSRF token
 */
export const validateCsrfToken = (): boolean => {
  const token = localStorage.getItem('csrf_token');
  // In a real implementation, you would validate against a token from the server
  // This is a simplified version for demo purposes
  return !!token;
};

/**
 * Get the current CSRF token
 */
export const getCsrfToken = (): string | null => {
  return localStorage.getItem('csrf_token');
};

/**
 * Clear the CSRF token
 */
export const clearCsrfToken = (): void => {
  localStorage.removeItem('csrf_token');
};

/**
 * Add CSRF token to form data
 */
export const addCsrfToFormData = (formData: FormData): FormData => {
  const token = getCsrfToken();
  if (token) {
    formData.append('csrf_token', token);
  }
  return formData;
};
