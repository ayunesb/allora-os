export declare const validLegalRoutes: string[];
export declare const legalRouteDisplayNames: Record<string, string>;
/**
 * Tracks access to legal routes and logs appropriate messages
 * @param path The current route path
 * @returns void
 */
export declare const trackRouteAccess: (path: string) => void;
/**
 * Checks if a route is a valid legal route
 * @param path The route path to check
 * @returns boolean indicating if the route is valid
 */
export declare const isValidLegalRoute: (path: string) => boolean;
/**
 * Gets suggested legal routes based on partial path matching
 * @param partialPath A partial route path to match against
 * @returns Array of matching route objects with path and display name
 */
export declare const getSuggestedLegalRoutes: (partialPath: string) => Array<{
    path: string;
    name: string;
}>;
