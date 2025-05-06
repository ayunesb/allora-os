export interface EnhancedRequestConfig {
  method?: "GET" | "POST" | "PUT" | "DELETE";
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
export declare const clearApiCache: (cacheKey?: string) => void;
export declare const enhancedFetch: <T>(
  url: string,
  options?: EnhancedRequestConfig,
) => Promise<StandardResponse<T>>;
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
export declare function useProtectedApi<T, P = any>(
  apiFunction: (params: P) => Promise<T>,
  options?: UseProtectedApiOptions,
): {
  execute: (params: P) => Promise<T>;
  isLoading: boolean;
  error: Error;
  fetchApi: <T_1>(
    endpoint: string,
    method?: string,
    data?: any,
    additionalHeaders?: Record<string, string>,
  ) => Promise<T_1>;
};
export declare function useApiClient(): {
  fetchApi: <T>(
    endpoint: string,
    method?: string,
    data?: any,
    additionalHeaders?: Record<string, string>,
  ) => Promise<T>;
  execute: <T, U = any>(
    endpoint: string,
    method?: "GET" | "POST" | "PUT" | "DELETE",
    data?: U,
    additionalHeaders?: Record<string, string>,
  ) => Promise<T>;
  isLoading: boolean;
  error: Error;
};
