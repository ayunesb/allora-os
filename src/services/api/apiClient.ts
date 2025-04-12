
import { logger } from '@/utils/loggingService';
import { handleApiError } from '@/utils/api/errorHandling';
import { toast } from 'sonner';

// Cache configuration
interface CacheConfig {
  enabled: boolean;
  maxAge: number; // in milliseconds
  staleWhileRevalidate: boolean;
}

// Default cache configuration
const defaultCacheConfig: CacheConfig = {
  enabled: true,
  maxAge: 5 * 60 * 1000, // 5 minutes
  staleWhileRevalidate: true
};

// Cache storage
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expires: number;
}

const cache = new Map<string, CacheEntry<any>>();

// Request options
export interface RequestOptions extends RequestInit {
  cacheKey?: string;
  skipCache?: boolean;
  cacheTTL?: number;
  suppressErrors?: boolean;
  customErrorHandler?: (error: any) => void;
  successMessage?: string;
  errorMessage?: string;
}

// Standard response format
export interface ApiResponse<T> {
  data: T | null;
  error: Error | null;
  status: 'success' | 'error';
  isCached: boolean;
}

// API client configuration
let apiConfig: {
  baseUrl: string;
  defaultHeaders: Record<string, string>;
  cacheConfig: CacheConfig;
} = {
  baseUrl: '',
  defaultHeaders: {
    'Content-Type': 'application/json'
  },
  cacheConfig: { ...defaultCacheConfig }
};

/**
 * Configure the API client
 */
export function configureApi(config: {
  baseUrl?: string;
  defaultHeaders?: Record<string, string>;
  cacheConfig?: Partial<CacheConfig>;
}) {
  apiConfig = {
    ...apiConfig,
    ...(config.baseUrl && { baseUrl: config.baseUrl }),
    ...(config.defaultHeaders && { defaultHeaders: { ...apiConfig.defaultHeaders, ...config.defaultHeaders } }),
    ...(config.cacheConfig && { cacheConfig: { ...apiConfig.cacheConfig, ...config.cacheConfig } })
  };
}

/**
 * Clear the API cache
 */
export function clearCache(cacheKey?: string) {
  if (cacheKey) {
    cache.delete(cacheKey);
  } else {
    cache.clear();
  }
}

/**
 * Main request function
 */
export async function request<T>(url: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
  const {
    cacheKey = url,
    skipCache = false,
    cacheTTL,
    suppressErrors = false,
    customErrorHandler,
    successMessage,
    errorMessage,
    ...fetchOptions
  } = options;

  // Add default headers
  const headers = new Headers(fetchOptions.headers);
  Object.entries(apiConfig.defaultHeaders).forEach(([key, value]) => {
    if (!headers.has(key)) {
      headers.set(key, value);
    }
  });
  
  // Check cache if enabled and not skipped
  if (apiConfig.cacheConfig.enabled && !skipCache) {
    const cachedEntry = cache.get(cacheKey);
    if (cachedEntry) {
      const now = Date.now();
      
      // If cache is still valid, return it
      if (cachedEntry.expires > now) {
        logger.debug(`Using cached data for ${cacheKey}`);
        return { 
          data: cachedEntry.data, 
          error: null, 
          status: 'success', 
          isCached: true 
        };
      }
      
      // If staleWhileRevalidate is enabled, return stale data and refresh in background
      if (apiConfig.cacheConfig.staleWhileRevalidate) {
        logger.debug(`Using stale data for ${cacheKey} while revalidating`);
        
        // Fetch fresh data in background
        setTimeout(() => {
          logger.debug(`Background revalidation for ${cacheKey}`);
          request<T>(url, { ...options, skipCache: true });
        }, 0);
        
        return { 
          data: cachedEntry.data, 
          error: null, 
          status: 'success', 
          isCached: true 
        };
      }
    }
  }
  
  // If we get here, we need to make a network request
  try {
    logger.debug(`Fetching ${url}`);
    const response = await fetch(apiConfig.baseUrl + url, {
      ...fetchOptions,
      headers
    });
    
    if (!response.ok) {
      throw {
        status: response.status,
        statusText: response.statusText,
        url,
        method: fetchOptions.method || 'GET'
      };
    }
    
    const data = await response.json();
    
    // Show success message if provided
    if (successMessage) {
      toast.success(successMessage);
    }
    
    // Cache the response if caching is enabled
    if (apiConfig.cacheConfig.enabled && !skipCache) {
      const ttl = cacheTTL || apiConfig.cacheConfig.maxAge;
      cache.set(cacheKey, {
        data,
        timestamp: Date.now(),
        expires: Date.now() + ttl
      });
      
      // Prune old cache entries if there are too many
      if (cache.size > 100) { // Max 100 entries
        const oldestKey = Array.from(cache.entries())
          .sort((a, b) => a[1].timestamp - b[1].timestamp)[0][0];
        cache.delete(oldestKey);
      }
    }
    
    return { 
      data, 
      error: null, 
      status: 'success', 
      isCached: false 
    };
  } catch (error) {
    // Don't handle the error if suppressed
    if (!suppressErrors) {
      if (customErrorHandler) {
        customErrorHandler(error);
      } else {
        handleApiError(error, {
          showToast: true,
          customMessage: errorMessage
        });
      }
    }
    
    logger.error(`Request failed for ${url}`, { error });
    
    return { 
      data: null, 
      error: error instanceof Error ? error : new Error(String(error)), 
      status: 'error', 
      isCached: false 
    };
  }
}

/**
 * Convenient method shortcuts
 */
export const api = {
  get: <T>(url: string, options?: RequestOptions) => 
    request<T>(url, { method: 'GET', ...options }),
    
  post: <T>(url: string, data: any, options?: RequestOptions) => 
    request<T>(url, { method: 'POST', body: JSON.stringify(data), ...options }),
    
  put: <T>(url: string, data: any, options?: RequestOptions) => 
    request<T>(url, { method: 'PUT', body: JSON.stringify(data), ...options }),
    
  patch: <T>(url: string, data: any, options?: RequestOptions) => 
    request<T>(url, { method: 'PATCH', body: JSON.stringify(data), ...options }),
    
  delete: <T>(url: string, options?: RequestOptions) => 
    request<T>(url, { method: 'DELETE', ...options }),

  // Helper for uploading files
  upload: <T>(url: string, formData: FormData, options?: RequestOptions) => {
    // Don't set Content-Type for multipart/form-data - browser sets it with boundary
    const { headers, ...rest } = options || {};
    const customHeaders = headers instanceof Headers 
      ? Object.fromEntries(Array.from(headers.entries()))
      : headers as Record<string, string>;
      
    return request<T>(url, { 
      method: 'POST', 
      body: formData, 
      headers: { ...customHeaders },
      ...rest 
    });
  }
};
