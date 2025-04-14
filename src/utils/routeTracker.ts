
export const trackRouteAccess = (path: string) => {
  const legalRoutes = [
    '/legal/terms-of-service',
    '/legal/privacy-policy',
    '/legal/cookies',
    '/legal/compliance',
    '/legal/refund-policy',
    '/legal/messaging-consent'
  ];

  if (legalRoutes.includes(path)) {
    console.log(`✅ Legal Route Access: ${path}`);
    // You could extend this with more advanced tracking
  } else if (path.includes('/legal')) {
    console.warn(`❌ Potentially Invalid Legal Route: ${path}`);
  }
};
