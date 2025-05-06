type DeepLinkParams = Record<string, string | number | boolean>;
/**
 * Constructs a deep link URL for the application
 * @param basePath The base path (e.g., '/dashboard/strategy')
 * @param params Optional query parameters
 * @param hash Optional hash fragment
 * @returns Formatted URL string
 */
export declare const createDeepLink: (
  basePath: string,
  params?: DeepLinkParams,
  hash?: string,
) => string;
/**
 * Creates a shareable URL for the current state
 * @param route The base route path
 * @param state The current state to encode in the URL
 * @returns A shareable URL string
 */
export declare const createShareableLink: (
  route: string,
  state: Record<string, any>,
) => string;
/**
 * Extracts and validates parameters from the URL
 * @param searchParams URLSearchParams object
 * @param paramMap Mapping of parameter names to their expected types
 * @returns Object with parsed parameters
 */
export declare const extractDeepLinkParams: <T extends Record<string, any>>(
  searchParams: URLSearchParams,
  paramMap: Record<string, "string" | "number" | "boolean">,
) => Partial<T>;
/**
 * Creates a hook-friendly function to generate deep links
 * @param baseRoute The base route for the current view
 * @returns Function that generates proper deep links
 */
export declare const createViewDeepLinker: (
  baseRoute: string,
) => (params?: DeepLinkParams, hash?: string) => string;
export {};
