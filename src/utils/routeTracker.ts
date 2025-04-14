
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
  '/messaging-consent',
  '/compliance/gdpr',  // Adding GDPR compliance route
  '/legal/gdpr',       // Adding alternate GDPR route
  '/gdpr',             // Adding direct GDPR route
  '/legal/cookie-settings', // Adding cookie settings route
  '/cookie-settings'    // Adding direct cookie settings route
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
  '/messaging-consent': 'Messaging Consent',
  '/compliance/gdpr': 'GDPR Compliance',
  '/legal/gdpr': 'GDPR Compliance',
  '/gdpr': 'GDPR Compliance',
  '/legal/cookie-settings': 'Cookie Settings',
  '/cookie-settings': 'Cookie Settings'
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
  } else if (path.includes('/legal') || path.includes('/privacy') || 
             path.includes('/terms') || path.includes('/cookie') || 
             path.includes('/gdpr') || path.includes('/refund') || 
             path.includes('/messaging-consent')) {
    logger.warn(`Potentially Invalid Legal Route: ${path}`);
    console.warn(`❌ Potentially Invalid Legal Route: ${path}`);
    
    // Suggest similar valid routes for better user experience
    const similarRoutes = validLegalRoutes
      .filter(route => route.includes('/legal') || 
                      (path.includes('/privacy') && route.includes('/privacy')) ||
                      (path.includes('/terms') && route.includes('/terms')) ||
                      (path.includes('/cookie') && route.includes('/cookie')) ||
                      (path.includes('/gdpr') && route.includes('/gdpr')) ||
                      (path.includes('/refund') && route.includes('/refund')) ||
                      (path.includes('/messaging') && route.includes('/messaging')))
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
  // Handle special cases for common typos or user errors
  const searchPath = partialPath.toLowerCase();
  
  // Define patterns to match against for better suggestions
  const patterns: Record<string, string[]> = {
    privacy: ['/privacy', '/legal/privacy-policy'],
    terms: ['/terms', '/legal/terms-of-service', '/tos'],
    cookie: ['/cookie-policy', '/legal/cookies', '/cookie-settings'],
    refund: ['/refund-policy', '/legal/refund-policy'],
    message: ['/messaging-consent', '/legal/messaging-consent'],
    gdpr: ['/gdpr', '/legal/gdpr', '/compliance/gdpr'],
    legal: validLegalRoutes
  };
  
  // Find which pattern matches best
  let bestMatches: string[] = [];
  
  for (const [key, routes] of Object.entries(patterns)) {
    if (searchPath.includes(key)) {
      bestMatches = [...bestMatches, ...routes];
    }
  }
  
  // If no patterns matched, do a general filter
  if (bestMatches.length === 0) {
    return validLegalRoutes
      .filter(route => route.toLowerCase().includes(searchPath))
      .map(route => ({
        path: route,
        name: legalRouteDisplayNames[route] || route
      }));
  }
  
  // Return unique matches based on patterns
  const uniqueMatches = [...new Set(bestMatches)];
  return uniqueMatches.map(route => ({
    path: route,
    name: legalRouteDisplayNames[route] || route
  }));
};
