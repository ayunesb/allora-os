import { ApiFetchFunction, ApiRequestOptions } from "@/utils/api/apiClient";
/**
 * An optimized API client that focuses on performance and error recovery
 */
export declare const optimizedApiClient: {
  /**
   * Fetch data with built-in retry and recovery mechanisms
   */
  fetch: <T>(
    endpoint: string,
    options?: ApiRequestOptions & {
      retryStrategy?: "exponential" | "linear" | "none";
      maxRetries?: number;
      retryDelay?: number;
      fallbackData?: T;
      showToastOnError?: boolean;
      fetchFunction?: ApiFetchFunction;
    },
  ) => Promise<
    | {
        data: T;
        error: any;
        status: "success";
        isFallback: boolean;
      }
    | {
        data: T;
        error: any;
        status: "error";
        isFallback: boolean;
      }
  >;
  /**
   * Post data with improved error handling and recovery
   */
  post: <T>(
    endpoint: string,
    data: any,
    options?: ApiRequestOptions & {
      retryStrategy?: "exponential" | "linear" | "none";
      maxRetries?: number;
      showLoadingToast?: boolean;
      loadingMessage?: string;
    },
  ) => Promise<
    | {
        data: T;
        error: any;
        status: "success";
        isFallback: boolean;
      }
    | {
        data: any;
        error: any;
        status: "error";
        isFallback: boolean;
      }
  >;
  /**
   * Clear cache for specific endpoint or all endpoints
   */
  clearCache: (endpoint?: string) => void;
};
