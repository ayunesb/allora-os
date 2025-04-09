
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { API_CONFIG } from '@/config/appConfig';
import { logger } from '@/utils/loggingService';
import { sanitizeInput } from '@/utils/sanitizers';

export type ApiError = {
  message: string;
  status?: number;
  details?: unknown;
  code?: string;
};

export type ApiResponse<T> = {
  data: T | null;
  error: ApiError | null;
  status: 'success' | 'error';
};

type ApiRequestOptions = {
  errorMessage?: string;
  showErrorToast?: boolean;
  showSuccessToast?: boolean;
  successMessage?: string;
  timeout?: number;
  retry?: boolean;
  maxRetries?: number;
  retryDelay?: number;
};

// Cache storage for API results
const apiCache = new Map<string, {data: any, timestamp: number}>();
const DEFAULT_CACHE_TTL = 60000; // 1 minute in milliseconds

/**
 * Wrapper for API calls with consistent error handling, timeouts and caching
 * @param apiCall - The async function making the API call
 * @param options - Configuration options for the API call
 * @returns Standardized API response
 */
export async function apiRequest<T>(
  apiCall: () => Promise<any>,
  options: ApiRequestOptions & { 
    cacheKey?: string; 
    cacheTTL?: number;
    skipCache?: boolean;
  } = {}
): Promise<ApiResponse<T>> {
  const {
    errorMessage = 'An error occurred',
    showErrorToast = true,
    showSuccessToast = false,
    successMessage = 'Operation completed successfully',
    timeout = API_CONFIG.defaultTimeout,
    retry = false,
    maxRetries = API_CONFIG.retryAttempts,
    retryDelay = 1000,
    cacheKey,
    cacheTTL = DEFAULT_CACHE_TTL,
    skipCache = false
  } = options;

  // Check cache for GET requests when cacheKey is provided
  if (cacheKey && !skipCache) {
    const cachedResponse = apiCache.get(cacheKey);
    const now = Date.now();
    
    if (cachedResponse && (now - cachedResponse.timestamp < cacheTTL)) {
      logger.info('Returning cached API response', { cacheKey });
      return {
        data: cachedResponse.data,
        error: null,
        status: 'success'
      };
    }
  }

  let attempts = 0;

  // Function to execute the API call with retries
  const executeWithRetries = async (): Promise<ApiResponse<T>> => {
    attempts++;
    
    try {
      // Create a timeout promise
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => {
          reject({
            message: 'Request timed out',
            status: 408,
            code: 'TIMEOUT'
          });
        }, timeout);
      });

      // Race the API call against the timeout
      const response = await Promise.race([apiCall(), timeoutPromise]);
      
      // Handle Supabase error format
      if (response.error) {
        throw {
          message: sanitizeInput(response.error.message) || errorMessage,
          status: response.error.status,
          code: response.error.code,
          details: response.error
        };
      }
      
      if (showSuccessToast) {
        toast.success(sanitizeInput(successMessage));
      }
      
      // Cache successful responses when cacheKey is provided
      if (cacheKey && response.data) {
        apiCache.set(cacheKey, {
          data: response.data,
          timestamp: Date.now()
        });
      }
      
      logger.info('API request successful', { 
        successMessage, 
        dataType: typeof response.data,
        cached: !!cacheKey
      });
      
      return {
        data: response.data,
        error: null,
        status: 'success'
      };
    } catch (error: any) {
      const apiError: ApiError = {
        message: sanitizeInput(error.message) || errorMessage,
        status: error.status || 500,
        code: error.code,
        details: error
      };
      
      logger.error('API Error:', apiError);
      
      // Handle retry logic
      if (retry && attempts < maxRetries) {
        logger.info(`Retrying API call (${attempts}/${maxRetries})...`);
        
        // Wait before retrying with exponential backoff
        await new Promise(resolve => setTimeout(resolve, retryDelay * Math.pow(2, attempts - 1)));
        
        // Recursive retry
        return executeWithRetries();
      }
      
      if (showErrorToast) {
        toast.error(apiError.message);
      }
      
      return {
        data: null,
        error: apiError,
        status: 'error'
      };
    }
  };

  return executeWithRetries();
}

/**
 * Clears the API cache either completely or for a specific key
 * @param cacheKey Optional specific cache key to clear
 */
export function clearApiCache(cacheKey?: string): void {
  if (cacheKey) {
    apiCache.delete(cacheKey);
    logger.info('Cleared API cache for key', { cacheKey });
  } else {
    apiCache.clear();
    logger.info('Cleared all API cache');
  }
}

/**
 * Helper function to safely parse JSON
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch (e) {
    logger.error('Failed to parse JSON:', { error: e, json: json.substring(0, 100) });
    return fallback;
  }
}

/**
 * Helper function to check if a response is a Supabase error
 */
export function isSupabaseError(error: any): boolean {
  return error && 
    typeof error === 'object' && 
    'code' in error &&
    'message' in error;
}

/**
 * Utility to create a cancellable API request
 * @returns An object with the cancel function and a token to pass to fetch
 */
export function createCancellableRequest() {
  const controller = new AbortController();
  const signal = controller.signal;
  
  return {
    cancel: () => controller.abort(),
    signal
  };
}
