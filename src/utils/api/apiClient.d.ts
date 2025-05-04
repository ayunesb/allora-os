/**
 * API client options interface
 */
export interface ApiRequestOptions {
    method?: string;
    headers?: Record<string, string>;
    body?: string;
    timeout?: number;
    retry?: boolean;
    maxRetries?: number;
    cacheTTL?: number;
    cacheKey?: string;
    successMessage?: string;
    errorMessage?: string;
}
export type ApiFetchFunction = (() => Promise<Response>) | (() => Promise<{
    data: any;
    error?: any;
}>);
/**
 * Core API request function
 */
export declare const apiRequest: <T>(fetchFunction: ApiFetchFunction, options?: ApiRequestOptions) => Promise<{
    data: T | null;
    error: Error | null;
    status: "success" | "error";
}>;
export declare const clearApiCache: (endpoint?: string) => void;
declare global {
    interface Window {
        clearApiCache: (endpoint?: string) => void;
    }
}
/**
 * Fetch API wrapper for making HTTP requests with enhanced features
 */
export declare const fetchApi: <T>(endpoint: string, method?: string, data?: any, additionalHeaders?: Record<string, string>) => Promise<T>;
