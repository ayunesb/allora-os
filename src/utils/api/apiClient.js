/**
 * Core API request function
 */
export const apiRequest = async (fetchFunction, options = {}) => {
    try {
        const response = await fetchFunction();
        // Handle both standard fetch responses and Supabase responses
        if ('ok' in response) {
            // Standard fetch response
            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }
            const data = await response.json();
            return { data, error: null, status: 'success' };
        }
        else {
            // Supabase response
            if (response.error) {
                throw new Error(response.error.message || 'Unknown Supabase error');
            }
            return { data: response.data, error: null, status: 'success' };
        }
    }
    catch (error) {
        return {
            data: null,
            error: error instanceof Error ? error : new Error('Unknown error'),
            status: 'error'
        };
    }
};
// API cache management
const apiCache = new Map();
export const clearApiCache = (endpoint) => {
    if (endpoint) {
        apiCache.delete(endpoint);
    }
    else {
        apiCache.clear();
    }
};
// Expose the clearApiCache function globally
if (typeof window !== 'undefined') {
    window.clearApiCache = clearApiCache;
}
/**
 * Fetch API wrapper for making HTTP requests with enhanced features
 */
export const fetchApi = async (endpoint, method = 'GET', data, additionalHeaders) => {
    const headers = {
        'Content-Type': 'application/json',
        ...(additionalHeaders || {}),
    };
    const options = {
        method,
        headers,
        credentials: 'include',
    };
    if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
        options.body = JSON.stringify(data);
    }
    const response = await fetch(endpoint, options);
    if (!response.ok) {
        const errorText = await response.text();
        let errorMessage;
        try {
            const errorJson = JSON.parse(errorText);
            errorMessage = errorJson.message || errorJson.error || `API error: ${response.status}`;
        }
        catch {
            errorMessage = errorText || `API error: ${response.status}`;
        }
        throw new Error(errorMessage);
    }
    return response.json();
};
