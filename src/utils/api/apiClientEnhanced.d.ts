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
export declare function useProtectedApi<T, P = any>(apiFunction: (params: P) => Promise<T>, options?: UseProtectedApiOptions): {
    execute: (params: P) => Promise<T>;
    isLoading: boolean;
    error: Error;
};
export declare function useApiClient(): {
    fetchApi: <T>(endpoint: string, method?: string, data?: any, additionalHeaders?: Record<string, string>) => Promise<T>;
    execute: <T, U = any>(endpoint: string, method?: "GET" | "POST" | "PUT" | "DELETE", data?: U, additionalHeaders?: Record<string, string>) => Promise<T>;
    isLoading: boolean;
    error: Error;
};
