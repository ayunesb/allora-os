import { toast } from 'sonner';
import { logger } from '@/utils/loggingService';
import { apiRequest, clearApiCache } from '@/utils/api/apiClient';
/**
 * An optimized API client that focuses on performance and error recovery
 */
export const optimizedApiClient = {
    /**
     * Fetch data with built-in retry and recovery mechanisms
     */
    fetch: async (endpoint, options = {}) => {
        const { retryStrategy = 'exponential', maxRetries = 3, retryDelay = 1000, fallbackData, showToastOnError = true, fetchFunction, ...restOptions } = options;
        let attempt = 0;
        let lastError = null;
        while (attempt <= maxRetries) {
            try {
                // Use the core apiRequest function with optimized caching
                const response = await apiRequest(
                // Use provided fetch function or default to standard fetch
                fetchFunction || (() => fetch(endpoint)), {
                    ...restOptions,
                    timeout: 15000, // Increased timeout for better reliability
                    retry: attempt < maxRetries,
                    maxRetries: maxRetries - attempt,
                    cacheTTL: 60000, // 1 minute cache
                    cacheKey: endpoint
                });
                if (response.status === 'success') {
                    // Successfully fetched data, return it
                    return {
                        data: response.data,
                        error: null,
                        status: 'success',
                        isFallback: false
                    };
                }
                else {
                    // Request completed but returned an error
                    throw response.error;
                }
            }
            catch (error) {
                lastError = error;
                attempt += 1;
                if (attempt <= maxRetries) {
                    // Calculate delay based on retry strategy
                    let delay = retryDelay;
                    if (retryStrategy === 'exponential') {
                        delay = retryDelay * Math.pow(2, attempt - 1);
                    }
                    else if (retryStrategy === 'linear') {
                        delay = retryDelay * attempt;
                    }
                    logger.warn(`API request failed, retrying (${attempt}/${maxRetries})...`, {
                        endpoint,
                        error: error?.message || 'Unknown error',
                        nextRetryDelay: delay
                    });
                    // Wait before next retry
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
            }
        }
        // All retries failed
        if (showToastOnError) {
            toast.error(lastError?.message || 'Failed to load data after multiple attempts');
        }
        logger.error(`API request failed after ${maxRetries} attempts`, {
            endpoint,
            error: lastError
        });
        // Return fallback data if provided
        if (fallbackData !== undefined) {
            return {
                data: fallbackData,
                error: lastError,
                status: 'error',
                isFallback: true
            };
        }
        return {
            data: null,
            error: lastError,
            status: 'error',
            isFallback: false
        };
    },
    /**
     * Post data with improved error handling and recovery
     */
    post: async (endpoint, data, options = {}) => {
        const { retryStrategy = 'linear', maxRetries = 2, showLoadingToast = false, loadingMessage = 'Processing request...', ...restOptions } = options;
        let toastId;
        if (showLoadingToast) {
            toastId = toast.loading(loadingMessage);
        }
        try {
            const response = await optimizedApiClient.fetch(endpoint, {
                ...restOptions,
                retryStrategy,
                maxRetries,
                showToastOnError: false,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(options.headers || {})
                },
                body: JSON.stringify(data)
            });
            if (response.status === 'success') {
                if (toastId) {
                    toast.success(options.successMessage || 'Success', { id: toastId });
                }
                return response;
            }
            else {
                throw response.error;
            }
        }
        catch (error) {
            if (toastId) {
                toast.error(error?.message || options.errorMessage || 'Request failed', { id: toastId });
            }
            return {
                data: null,
                error,
                status: 'error',
                isFallback: false
            };
        }
    },
    /**
     * Clear cache for specific endpoint or all endpoints
     */
    clearCache: (endpoint) => {
        clearApiCache(endpoint);
    }
};
