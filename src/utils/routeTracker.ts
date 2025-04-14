
import { logger } from '@/utils/loggingService';

export const trackRouteAccess = (path: string) => {
  const legalRoutes = [
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

  if (legalRoutes.includes(path)) {
    logger.info(`Legal Route Access: ${path}`);
    console.log(`✅ Legal Route Access: ${path}`);
    
    // Track in analytics for future reference
    try {
      // This will be picked up by your analytics tracking
      window.dispatchEvent(new CustomEvent('route-access', {
        detail: {
          type: 'legal',
          path
        }
      }));
    } catch (error) {
      // Silent catch - analytics is non-critical
    }
  } else if (path.includes('/legal')) {
    logger.warn(`Potentially Invalid Legal Route: ${path}`);
    console.warn(`❌ Potentially Invalid Legal Route: ${path}`);
  }
};

// Export a function to check if a route is a valid legal route
export const isValidLegalRoute = (path: string): boolean => {
  const legalRoutes = [
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
  
  return legalRoutes.includes(path);
};
