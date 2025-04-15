
import { toast } from 'sonner';
import { fetchApi } from './apiClient';
import { handleApiError } from '@/utils/api/errorHandling';
import { useState } from 'react';

export interface EnhancedRequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
  retry?: boolean;
  maxRetries?: number;
  cacheTTL?: number;
  cacheKey?: string;
  successMessage?: string;
  errorMessage?: string;
  suspense?: boolean;
}

export interface StandardResponse<T> {
  success: boolean;
  data: T | null;
  error: any | null;
  statusCode?: number;
  message?: string;
}

// API cache management
const apiCache = new Map<string, { data: any; timestamp: number }>();

export const clearApiCache = (cacheKey?: string) => {
  if (cacheKey) {
    apiCache.delete(cacheKey);
  } else {
    apiCache.clear();
  }
};

export const enhancedFetch = async <T>(url: string, options: EnhancedRequestConfig = {}): Promise<StandardResponse<T>> => {
  const { 
    method = 'GET', 
    headers = {}, 
    body,
    cacheKey,
    cacheTTL = 5 * 60 * 1000, // 5 minutes default
    retry = false,
    maxRetries = 3,
    timeout = 30000,
    successMessage,
    errorMessage
  } = options;

  // Generate a cache key if not provided
  const effectiveCacheKey = cacheKey || `${method}:${url}:${body ? JSON.stringify(body) : ''}`;
  
  // Check cache for GET requests
  if (method === 'GET' && apiCache.has(effectiveCacheKey)) {
    const cachedItem = apiCache.get(effectiveCacheKey);
    if (cachedItem && (Date.now() - cachedItem.timestamp) < cacheTTL) {
      return { success: true, data: cachedItem.data, error: null };
    }
  }

  try {
    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    const result = await fetchApi<T>(
      url, 
      method, 
      body, 
      {
        ...headers,
        'Content-Type': 'application/json'
      }
    );
    
    clearTimeout(timeoutId);
    
    // Cache successful GET responses
    if (method === 'GET') {
      apiCache.set(effectiveCacheKey, {
        data: result,
        timestamp: Date.now()
      });
    }
    
    if (successMessage) {
      toast.success(successMessage);
    }
    
    return { success: true, data: result, error: null };
  } catch (error: any) {
    // Handle error with custom message if provided
    handleApiError(error, {
      customMessage: errorMessage,
      rethrow: false
    });
    
    return { 
      success: false, 
      data: null, 
      error, 
      statusCode: error.statusCode || 500,
      message: error.message || errorMessage || 'An error occurred'
    };
  }
};

export interface UseProtectedApiOptions {
  showSuccessToast?: boolean;
  successMessage?: string;
  showErrorToast?: boolean;
  errorMessage?: string;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

export interface SaveSecuritySettingsParams {
  settings: any;
}

export function useProtectedApi<T, P = any>(
  apiFunction: (params: P) => Promise<T>,
  options: UseProtectedApiOptions = {}
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const execute = async (params: P): Promise<T> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await apiFunction(params);
      
      if (options.showSuccessToast) {
        toast.success(options.successMessage || 'Operation completed successfully');
      }
      
      if (options.onSuccess) {
        options.onSuccess(result);
      }
      
      return result;
    } catch (err: any) {
      setError(err);
      
      if (options.showErrorToast) {
        toast.error(options.errorMessage || err.message || 'An error occurred');
      }
      
      if (options.onError) {
        options.onError(err);
      }
      
      handleApiError(err, {
        showToast: false, // We're already showing a toast above
        rethrow: false
      });
      
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  return { execute, isLoading, error, fetchApi };
}

export function useApiClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = async <T, U = any>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    data?: U,
    additionalHeaders?: Record<string, string>
  ): Promise<T> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await fetchApi<T>(endpoint, method, data, additionalHeaders);
      return result;
    } catch (err: any) {
      setError(err);
      handleApiError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fetchApi,
    execute,
    isLoading,
    error
  };
}
