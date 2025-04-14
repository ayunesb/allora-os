
import { logger } from '@/utils/loggingService';

// Define all valid legal routes in a single place for easier maintenance
export const validLegalRoutes = [
  '/legal/terms-of-service',
  '/legal/privacy-policy',
  '/legal/cookies',
  '/legal/compliance',
  '/legal/refund-policy',
  '/legal/messaging-consent',
  '/privacy',
  '/terms',
  '/cookie-policy',
  '/refund-policy',
  '/messaging-consent'
];

// Map of shortened route names to their full paths for better error messages
export const legalRouteDisplayNames: Record<string, string> = {
  '/legal/terms-of-service': 'Terms of Service',
  '/legal/privacy-policy': 'Privacy Policy',
  '/legal/cookies': 'Cookies Policy',
  '/legal/compliance': 'Compliance Information',
  '/legal/refund-policy': 'Refund Policy',
  '/legal/messaging-consent': 'Messaging Consent',
  '/privacy': 'Privacy Policy',
  '/terms': 'Terms of Service',
  '/cookie-policy': 'Cookies Policy',
  '/refund-policy': 'Refund Policy',
  '/messaging-consent': 'Messaging Consent'
};

/**
 * Tracks access to legal routes and logs appropriate messages
 * @param path The current route path
 * @returns void
 */
export const trackRouteAccess = (path: string) => {
  if (validLegalRoutes.includes(path)) {
    logger.info(`Legal Route Access: ${path}`);
    console.log(`✅ Legal Route Access: ${path}`);
    
    // Track in analytics for future reference
    try {
      // This will be picked up by your analytics tracking
      window.dispatchEvent(new CustomEvent('route-access', {
        detail: {
          type: 'legal',
          path,
          name: legalRouteDisplayNames[path] || path.split('/').pop()
        }
      }));
    } catch (error) {
      // Silent catch - analytics is non-critical
    }
  } else if (path.includes('/legal')) {
    logger.warn(`Potentially Invalid Legal Route: ${path}`);
    console.warn(`❌ Potentially Invalid Legal Route: ${path}`);
    
    // Suggest similar valid routes for better user experience
    const similarRoutes = validLegalRoutes
      .filter(route => route.includes('/legal'))
      .map(route => ({ route, name: legalRouteDisplayNames[route] }));
    
    if (similarRoutes.length > 0) {
      console.info('Available legal routes:', similarRoutes);
    }
  }
};

/**
 * Checks if a route is a valid legal route
 * @param path The route path to check
 * @returns boolean indicating if the route is valid
 */
export const isValidLegalRoute = (path: string): boolean => {
  return validLegalRoutes.includes(path);
};

/**
 * Gets suggested legal routes based on partial path matching
 * @param partialPath A partial route path to match against
 * @returns Array of matching route objects with path and display name
 */
export const getSuggestedLegalRoutes = (partialPath: string): Array<{path: string, name: string}> => {
  return validLegalRoutes
    .filter(route => route.includes(partialPath))
    .map(route => ({
      path: route,
      name: legalRouteDisplayNames[route] || route
    }));
};
