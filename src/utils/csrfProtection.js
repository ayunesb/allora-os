/**
 * Generate a CSRF token and store it in localStorage
 */
export const generateCsrfToken = () => {
    const token = Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
    localStorage.setItem('csrf_token', token);
    return token;
};
/**
 * Validate CSRF token
 */
export const validateCsrfToken = () => {
    const token = localStorage.getItem('csrf_token');
    // In a real implementation, you would validate against a token from the server
    // This is a simplified version for demo purposes
    return !!token;
};
/**
 * Get the current CSRF token
 */
export const getCsrfToken = () => {
    return localStorage.getItem('csrf_token');
};
/**
 * Clear the CSRF token
 */
export const clearCsrfToken = () => {
    localStorage.removeItem('csrf_token');
};
/**
 * Add CSRF token to form data
 */
export const addCsrfToFormData = (formData) => {
    const token = getCsrfToken();
    if (token) {
        formData.append('csrf_token', token);
    }
    return formData;
};
