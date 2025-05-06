interface ApiRequestOptions {
  url: string;
  method?: string;
  headers?: Record<string, string>;
  body?: any;
  skipAuthCheck?: boolean;
  quiet?: boolean;
}
export declare function useProtectedApi(): {
  makeRequest: <T>(options: ApiRequestOptions) => Promise<T>;
  isLoading: boolean;
};
export default useProtectedApi;
