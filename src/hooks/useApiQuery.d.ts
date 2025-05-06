import { EnhancedRequestConfig } from "@/utils/api/enhancedApiClient";
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
export declare function useApiQuery<T>(
  url: string,
  options?: UseApiQueryOptions<T>,
): UseApiQueryResult<T>;
export {};
