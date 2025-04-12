/**
 * Enhanced API Client
 * Provides optimized caching and standardized error handling
 */

import { handleError, ErrorType } from '@/utils/errorHandling/errorHandler';
import { logger } from '@/utils/loggingService';

// Cache structure
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

// Cache configuration
interface CacheConfig {
  enabled: boolean;
  maxEntries: number;
  defaultTTL: number; // Time-to-live in milliseconds
  staleWhileRevalidate: boolean;
}

// Default cache configuration
const defaultCacheConfig: CacheConfig = {
  enabled: true,
  maxEntries: 100,
  defaultTTL: 5 * 60 * 1000, // 5 minutes
  staleWhileRevalidate: true
};

// Cache storage
const apiCache = new Map<string, CacheEntry<any>>();
let cacheConfig: CacheConfig = { ...defaultCacheConfig };

// Request options with caching parameters
export interface EnhancedRequestOptions extends RequestInit {
  cacheKey?: string;
  cacheTTL?: number; // In milliseconds
  skipCache?: boolean;
  forceRefresh?: boolean;
  retries?: number;
  retryDelay?: number; // In milliseconds
  timeout?: number; // In milliseconds
  errorHandler?: (error: unknown) => void;
}

/**
 * Configure the API client cache
 */
export function configureApiCache(config: Partial<CacheConfig>): void {
  cacheConfig = { 
    ...cacheConfig, 
    ...config 
  };
  
  logger.info('API cache configured', { 
    enabled: cacheConfig.enabled,
    maxEntries: cacheConfig.maxEntries,
    defaultTTL: cacheConfig.defaultTTL
  });
}

/**
 * Clear the entire cache or a specific entry
 */
export function clearApiCache(cacheKey?: string): void {
  if (cacheKey) {
    apiCache.delete(cacheKey);
    logger.debug(`Cleared API cache for key: ${cacheKey}`);
  } else {
    apiCache.clear();
    logger.debug('Cleared all API cache entries');
  }
}

/**
 * Enhanced fetch with caching, retries, and error handling
 */
export async function enhancedFetch<T>(
  url: string, 
  options: EnhancedRequestOptions = {}
): Promise<T> {
  const {
    cacheKey = url,
    cacheTTL = cacheConfig.defaultTTL,
    skipCache = false,
    forceRefresh = false,
    retries = 1,
    retryDelay = 1000,
    timeout = 30000,
    errorHandler,
    ...fetchOptions
  } = options;

  // Check cache if enabled and not skipped
  if (cacheConfig.enabled && !skipCache && !forceRefresh) {
    const cachedData = apiCache.get(cacheKey);
    
    if (cachedData) {
      const now = Date.now();
      
      // If cache is still valid
      if (cachedData.expiry > now) {
        logger.debug(`Cache hit for: ${cacheKey}`);
        return cachedData.data;
      }
      
      // Stale-while-revalidate: return stale data and refresh in background
      if (cacheConfig.staleWhileRevalidate) {
        logger.debug(`Stale cache hit for: ${cacheKey}, revalidating...`);
        // Refresh cache in background
        fetchWithRetries<T>(url, fetchOptions, retries, retryDelay, timeout)
          .then(newData => {
            updateCache(cacheKey, newData, cacheTTL);
          })
          .catch(error => {
            logger.warn(`Background refresh failed for: ${cacheKey}`, { error });
          });
          
        return cachedData.data;
      }
    }
  }

  try {
    // Perform the request with retries
    const data = await fetchWithRetries<T>(url, fetchOptions, retries, retryDelay, timeout);
    
    // Update cache if caching is enabled
    if (cacheConfig.enabled && !skipCache) {
      updateCache(cacheKey, data, cacheTTL);
    }
    
    return data;
  } catch (error) {
    // Handle error with custom handler or default handler
    if (errorHandler) {
      errorHandler(error);
    } else {
      handleError(error, {
        context: { url, method: fetchOptions.method || 'GET' }
      });
    }
    
    throw error;
  }
}

/**
 * Fetch with automatic retries
 */
async function fetchWithRetries<T>(
  url: string,
  options: RequestInit,
  retries: number,
  retryDelay: number,
  timeout: number
): Promise<T> {
  // Create abort controller for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  // Add abort signal to options
  const fetchOptions = {
    ...options,
    signal: controller.signal
  };
  
  try {
    let attempt = 0;
    let lastError: unknown;
    
    while (attempt <= retries) {
      try {
        const response = await fetch(url, fetchOptions);
        
        // Clear timeout since request completed
        clearTimeout(timeoutId);
        
        // Handle non-successful responses
        if (!response.ok) {
          throw {
            status: response.status,
            statusText: response.statusText,
            url,
            method: options.method || 'GET'
          };
        }
        
        // Parse JSON response
        return await response.json();
      } catch (error) {
        lastError = error;
        attempt++;
        
        // If out of retries, throw the error
        if (attempt > retries) {
          throw error;
        }
        
        // Otherwise wait and retry
        logger.debug(`Retrying request (${attempt}/${retries}) to: ${url}`);
        await new Promise(resolve => setTimeout(resolve, retryDelay * attempt));
      }
    }
    
    // This should never execute but TypeScript needs it
    throw lastError;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Update cache with new data
 */
function updateCache<T>(cacheKey: string, data: T, ttl: number): void {
  // Manage cache size
  if (apiCache.size >= cacheConfig.maxEntries) {
    // Remove oldest entry when cache is full
    const oldestKey = Array.from(apiCache.entries())
      .sort((a, b) => a[1].timestamp - b[1].timestamp)[0][0];
    apiCache.delete(oldestKey);
  }
  
  // Add new cache entry
  apiCache.set(cacheKey, {
    data,
    timestamp: Date.now(),
    expiry: Date.now() + ttl
  });
  
  logger.debug(`Cache updated for: ${cacheKey}`);
}

/**
 * Get cache statistics for monitoring
 */
export function getCacheStats(): {
  size: number;
  enabled: boolean;
  hitRatio?: number;
  oldestEntry?: number;
} {
  if (apiCache.size === 0) {
    return { size: 0, enabled: cacheConfig.enabled };
  }
  
  const oldestTimestamp = Math.min(
    ...Array.from(apiCache.values()).map(entry => entry.timestamp)
  );
  
  return {
    size: apiCache.size,
    enabled: cacheConfig.enabled,
    oldestEntry: Date.now() - oldestTimestamp
  };
}
