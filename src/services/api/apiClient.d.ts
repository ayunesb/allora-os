interface CacheConfig {
  enabled: boolean;
  maxAge: number;
  staleWhileRevalidate: boolean;
}
export interface RequestOptions extends RequestInit {
  cacheKey?: string;
  skipCache?: boolean;
  cacheTTL?: number;
  suppressErrors?: boolean;
  customErrorHandler?: (error: any) => void;
  successMessage?: string;
  errorMessage?: string;
}
export interface ApiResponse<T> {
  data: T | null;
  error: Error | null;
  status: "success" | "error";
  isCached: boolean;
}
/**
 * Configure the API client
 */
export declare function configureApi(config: {
  baseUrl?: string;
  defaultHeaders?: Record<string, string>;
  cacheConfig?: Partial<CacheConfig>;
}): void;
/**
 * Clear the API cache
 */
export declare function clearCache(cacheKey?: string): void;
/**
 * Main request function
 */
export declare function request<T>(
  url: string,
  options?: RequestOptions,
): Promise<ApiResponse<T>>;
/**
 * Convenient method shortcuts
 */
export declare const api: {
  get: <T>(url: string, options?: RequestOptions) => Promise<ApiResponse<T>>;
  post: <T>(
    url: string,
    data: any,
    options?: RequestOptions,
  ) => Promise<ApiResponse<T>>;
  put: <T>(
    url: string,
    data: any,
    options?: RequestOptions,
  ) => Promise<ApiResponse<T>>;
  patch: <T>(
    url: string,
    data: any,
    options?: RequestOptions,
  ) => Promise<ApiResponse<T>>;
  delete: <T>(url: string, options?: RequestOptions) => Promise<ApiResponse<T>>;
  upload: <T>(
    url: string,
    formData: FormData,
    options?: RequestOptions,
  ) => Promise<ApiResponse<T>>;
};
export {};
