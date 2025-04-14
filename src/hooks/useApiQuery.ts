
import { useState, useEffect, useCallback, useRef } from 'react';
import { enhancedFetch, EnhancedRequestConfig, clearApiCache } from '@/utils/api/enhancedApiClient';
import { StandardResponse } from '@/utils/api/standardResponse';

interface UseApiQueryOptions<T> extends EnhancedRequestConfig {
  initialData?: T;
  enabled?: boolean;
  refetchInterval?: number;
  onSuccess?: (data: T) => void;
  onError?: (error: any) => void;
  suspense?: boolean;
  select?: (data: T) => any;
}

interface UseApiQueryResult<T> {
  data: T | null;
  isLoading: boolean;
  isError: boolean;
  error: any;
  refetch: () => Promise<void>;
  reset: () => void;
  clearCache: () => void;
}

/**
 * Hook for fetching data from an API with caching, retries, and optimized performance
 */
export function useApiQuery<T>(
  url: string,
  options: UseApiQueryOptions<T> = {}
): UseApiQueryResult<T> {
  const {
    initialData = null,
    enabled = true,
    refetchInterval,
    onSuccess,
    onError,
    select,
    ...fetchOptions
  } = options;

  const [data, setData] = useState<T | null>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(enabled);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const fetchOptionsRef = useRef(fetchOptions);
  const onSuccessRef = useRef(onSuccess);
  const onErrorRef = useRef(onError);
  const selectRef = useRef(select);
  
  // Update refs when dependencies change
  useEffect(() => {
    fetchOptionsRef.current = fetchOptions;
    onSuccessRef.current = onSuccess;
    onErrorRef.current = onError;
    selectRef.current = select;
  }, [fetchOptions, onSuccess, onError, select]);

  // Create fetch function
  const fetchData = useCallback(async () => {
    if (!enabled) return;
    
    setIsLoading(true);
    
    try {
      const response: StandardResponse<T> = await enhancedFetch<T>(url, fetchOptionsRef.current);
      
      if (response.success && response.data !== null) {
        const processedData = selectRef.current ? selectRef.current(response.data) : response.data;
        setData(processedData);
        setIsError(false);
        setError(null);
        
        if (onSuccessRef.current) {
          onSuccessRef.current(processedData);
        }
      } else {
        setIsError(true);
        setError(response.error || 'Unknown error');
        
        if (onErrorRef.current) {
          onErrorRef.current(response.error);
        }
      }
    } catch (err) {
      setIsError(true);
      setError(err);
      
      if (onErrorRef.current) {
        onErrorRef.current(err);
      }
    } finally {
      setIsLoading(false);
    }
  }, [url, enabled]);

  // Initial fetch and refetch interval
  useEffect(() => {
    if (!enabled) return;
    
    fetchData();
    
    let intervalId: number | null = null;
    
    if (refetchInterval && refetchInterval > 0) {
      intervalId = window.setInterval(fetchData, refetchInterval);
    }
    
    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
    };
  }, [fetchData, enabled, refetchInterval]);

  // Clear cache function
  const clearCacheAndRefetch = useCallback(() => {
    const cacheKey = fetchOptionsRef.current.cacheKey || 
      `GET:${url}:${fetchOptionsRef.current.body ? JSON.stringify(fetchOptionsRef.current.body) : ''}`;
    clearApiCache(cacheKey);
    return fetchData();
  }, [url, fetchData]);

  // Reset function
  const reset = useCallback(() => {
    setData(initialData);
    setIsError(false);
    setError(null);
  }, [initialData]);

  return {
    data,
    isLoading,
    isError,
    error,
    refetch: fetchData,
    reset,
    clearCache: clearCacheAndRefetch
  };
}
