
import { normalizeRoute } from "./navigation";

type DeepLinkParams = Record<string, string | number | boolean>;

/**
 * Constructs a deep link URL for the application
 * @param basePath The base path (e.g., '/dashboard/strategy')
 * @param params Optional query parameters
 * @param hash Optional hash fragment
 * @returns Formatted URL string
 */
export const createDeepLink = (
  basePath: string,
  params?: DeepLinkParams,
  hash?: string
): string => {
  // First normalize the route in case it's a common alias
  const normalizedPath = normalizeRoute(basePath);
  
  // Construct URL with query parameters if provided
  let url = normalizedPath;
  
  if (params && Object.keys(params).length > 0) {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
    
    const queryString = searchParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }
  
  // Add hash if provided
  if (hash) {
    // Ensure hash starts with # symbol
    url += hash.startsWith('#') ? hash : `#${hash}`;
  }
  
  return url;
};

/**
 * Creates a shareable URL for the current state
 * @param route The base route path
 * @param state The current state to encode in the URL
 * @returns A shareable URL string
 */
export const createShareableLink = (
  route: string,
  state: Record<string, any>
): string => {
  const baseUrl = window.location.origin;
  const params: DeepLinkParams = {};
  
  // Only include serializable values in the URL
  Object.entries(state).forEach(([key, value]) => {
    if (
      value !== undefined && 
      value !== null && 
      (typeof value === 'string' || 
       typeof value === 'number' || 
       typeof value === 'boolean')
    ) {
      params[key] = value;
    }
  });
  
  const deepLink = createDeepLink(route, params);
  return `${baseUrl}${deepLink}`;
};

/**
 * Extracts and validates parameters from the URL
 * @param searchParams URLSearchParams object
 * @param paramMap Mapping of parameter names to their expected types
 * @returns Object with parsed parameters
 */
export const extractDeepLinkParams = <T extends Record<string, any>>(
  searchParams: URLSearchParams,
  paramMap: Record<string, 'string' | 'number' | 'boolean'>
): Partial<T> => {
  const result: Record<string, any> = {};
  
  Object.entries(paramMap).forEach(([paramName, paramType]) => {
    if (searchParams.has(paramName)) {
      const value = searchParams.get(paramName);
      
      if (value !== null) {
        switch (paramType) {
          case 'number':
            result[paramName] = parseFloat(value);
            break;
          case 'boolean':
            result[paramName] = value === 'true';
            break;
          default:
            result[paramName] = value;
        }
      }
    }
  });
  
  return result as Partial<T>;
};

/**
 * Creates a hook-friendly function to generate deep links
 * @param baseRoute The base route for the current view
 * @returns Function that generates proper deep links
 */
export const createViewDeepLinker = (baseRoute: string) => {
  return (params?: DeepLinkParams, hash?: string) => {
    return createDeepLink(baseRoute, params, hash);
  };
};
