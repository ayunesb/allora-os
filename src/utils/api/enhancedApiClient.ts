
import { toast } from 'sonner';
import { StandardResponse, successResponse, errorResponse } from './standardResponse';

/**
 * Enhanced API client with built-in caching, retries, and standardized responses
 */

// Cache configuration and storage
const apiCache = new Map<string, { data: any; timestamp: number; expiry: number }>();
const DEFAULT_CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds
const MAX_CACHE_SIZE = 100;

// Request configuration types
export interface EnhancedRequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
  useCache?: boolean;
  cacheTTL?: number;
  cacheKey?: string;
  retry?: boolean;
  maxRetries?: number;
  retryDelay?: number;
  timeout?: number;
  successMessage?: string;
  errorMessage?: string;
}

/**
 * Clear the API cache for a specific key or all keys
 */
export function clearApiCache(cacheKey?: string) {
  if (cacheKey) {
    apiCache.delete(cacheKey);
  } else {
    apiCache.clear();
  }
  console.log(`Cache ${cacheKey ? `for ${cacheKey}` : 'entirely'} cleared`);
}

/**
 * Enhanced fetch function with caching, retries, and standardized responses
 */
export async function enhancedFetch<T>(
  url: string,
  config: EnhancedRequestConfig = {}
): Promise<StandardResponse<T>> {
  const {
    method = 'GET',
    headers = {},
    body,
    useCache = method === 'GET',
    cacheTTL = DEFAULT_CACHE_TTL,
    cacheKey = `${method}:${url}:${body ? JSON.stringify(body) : ''}`,
    retry = true,
    maxRetries = 2,
    retryDelay = 1000,
    timeout = 30000,
    successMessage,
    errorMessage = 'Request failed'
  } = config;

  // Check cache for GET requests
  if (useCache && method === 'GET') {
    const cachedResponse = apiCache.get(cacheKey);
    if (cachedResponse && cachedResponse.expiry > Date.now()) {
      console.log(`Using cached response for ${cacheKey}`);
      return successResponse<T>(cachedResponse.data);
    }
  }

  // Initialize retry counter
  let retries = 0;
  
  // Create controller for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    // Prepare request
    const requestHeaders = {
      'Content-Type': 'application/json',
      ...headers
    };
    
    const requestBody = body ? JSON.stringify(body) : undefined;
    
    // Retry loop
    while (true) {
      try {
        const response = await fetch(url, {
          method,
          headers: requestHeaders,
          body: requestBody,
          signal: controller.signal
        });
        
        // Clear timeout
        clearTimeout(timeoutId);

        // Handle unsuccessful responses
        if (!response.ok) {
          const errorData = await response.text();
          let parsedError;
          try {
            parsedError = JSON.parse(errorData);
          } catch {
            parsedError = errorData;
          }
          
          throw {
            status: response.status,
            statusText: response.statusText,
            data: parsedError
          };
        }

        // Parse response
        const data = await response.json();
        
        // Cache successful GET responses
        if (useCache && method === 'GET') {
          // Manage cache size
          if (apiCache.size >= MAX_CACHE_SIZE) {
            const oldestKey = [...apiCache.entries()]
              .sort((a, b) => a[1].timestamp - b[1].timestamp)[0][0];
            apiCache.delete(oldestKey);
          }
          
          // Store in cache
          apiCache.set(cacheKey, {
            data,
            timestamp: Date.now(),
            expiry: Date.now() + cacheTTL
          });
        }
        
        // Show success message if provided
        if (successMessage) {
          toast.success(successMessage);
        }
        
        return successResponse<T>(data);
      } catch (error: any) {
        // Don't retry if max retries reached or it's an abort error
        if (error.name === 'AbortError' || !retry || retries >= maxRetries) {
          throw error;
        }
        
        // Increment retries and wait before trying again
        retries++;
        console.log(`Retry attempt ${retries}/${maxRetries} for ${url}`);
        await new Promise(resolve => setTimeout(resolve, retryDelay * retries));
      }
    }
  } catch (error: any) {
    clearTimeout(timeoutId);
    
    // Format error message
    let formattedError = typeof error === 'string' ? error : 'An unknown error occurred';
    let statusCode;
    
    if (error.name === 'AbortError') {
      formattedError = 'Request timed out';
    } else if (error.status) {
      statusCode = error.status;
      formattedError = error.data?.message || error.statusText || 'Request failed';
    } else if (error.message) {
      formattedError = error.message;
    }
    
    // Show error toast
    toast.error(errorMessage || formattedError);
    
    return errorResponse<T>(
      errorMessage || formattedError,
      formattedError,
      statusCode?.toString()
    );
  }
}

/**
 * Enhanced API client with method-specific helpers
 */
export const enhancedApi = {
  get: <T>(url: string, config?: Omit<EnhancedRequestConfig, 'method'>) => 
    enhancedFetch<T>(url, { ...config, method: 'GET' }),
    
  post: <T>(url: string, data: any, config?: Omit<EnhancedRequestConfig, 'method' | 'body'>) => 
    enhancedFetch<T>(url, { ...config, method: 'POST', body: data }),
    
  put: <T>(url: string, data: any, config?: Omit<EnhancedRequestConfig, 'method' | 'body'>) => 
    enhancedFetch<T>(url, { ...config, method: 'PUT', body: data }),
    
  patch: <T>(url: string, data: any, config?: Omit<EnhancedRequestConfig, 'method' | 'body'>) => 
    enhancedFetch<T>(url, { ...config, method: 'PATCH', body: data }),
    
  delete: <T>(url: string, config?: Omit<EnhancedRequestConfig, 'method'>) => 
    enhancedFetch<T>(url, { ...config, method: 'DELETE' }),
    
  clearCache: clearApiCache
};
