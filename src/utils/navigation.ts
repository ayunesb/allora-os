// A utility for navigation that doesn't depend on the useNavigate hook directly
// This will be used in contexts or services that need to navigate but can't access useNavigate

let navigateFunction: ((to: string, options?: { replace?: boolean; state?: any }) => void) | null = null;

export const registerNavigate = (
  navigate: (to: string, options?: { replace?: boolean; state?: any }) => void
) => {
  navigateFunction = navigate;
};

export const navigate = (
  to: string,
  options?: { replace?: boolean; state?: any }
) => {
  if (navigateFunction) {
    // Normalize the route before navigating
    const normalizedRoute = normalizeRoute(to);
    navigateFunction(normalizedRoute, options);
  } else {
    console.warn('Navigation function not registered yet.');
  }
};

// A map of common route misspellings and their corrections
const COMMON_ROUTE_CORRECTIONS: Record<string, string> = {
  '/administrator': '/admin',
  '/administration': '/admin',
  '/admins': '/admin',
  '/users': '/admin/entities?tab=users',
  '/companies': '/admin/entities?tab=companies',
  '/board': '/dashboard/strategies',
  '/board-room': '/dashboard/strategies',
  '/strategies': '/dashboard/strategies',
  '/dashboard-home': '/dashboard',
  '/home-dashboard': '/dashboard',
  '/account': '/dashboard/profile',
  '/settings': '/dashboard/settings',
  '/admin-settings': '/admin/settings',
  '/user-settings': '/dashboard/settings',
  '/profile': '/dashboard/profile',
  '/my-account': '/dashboard/profile',
  '/logout': '/login',
  '/signin': '/login',
  '/register': '/signup',
  '/campaigns': '/dashboard/campaigns',
  '/marketing': '/dashboard/campaigns',
  '/leads': '/dashboard/leads',
  '/contacts': '/dashboard/leads',
  '/customers': '/dashboard/leads',
  '/system': '/admin/system-health',
  '/system-diagnostics': '/admin/diagnostics',
  '/diagnostics': '/admin/diagnostics',
  '/system-health': '/admin/system-health',
  '/admin-diagnostics': '/admin/diagnostics',
  '/admin/system': '/admin/system-health',
  '/admin/diag': '/admin/diagnostics',
  '/admin/diagnostic': '/admin/diagnostics',
  // Legal page redirections
  '/terms': '/legal/terms-of-service',
  '/tos': '/legal/terms-of-service',
  '/privacy-policy': '/privacy',
  '/cookies': '/cookie-policy',
  '/cookie': '/cookie-policy',
  '/refund': '/refund-policy',
  '/messaging': '/messaging-consent',
  '/gdpr-compliance': '/gdpr',
  '/gdpr-policy': '/gdpr',
  '/eu-privacy': '/gdpr',
  '/eu-data-rights': '/gdpr',
  '/data-privacy': '/privacy',
  '/cookie-preferences': '/cookie-settings',
  '/cookie-manager': '/cookie-settings',
};

// Legal routes map for more accurate corrections
const LEGAL_ROUTE_PATTERNS: Record<string, string> = {
  'term': '/legal/terms-of-service',
  'tos': '/legal/terms-of-service',
  'terms-service': '/legal/terms-of-service',
  'privacy': '/legal/privacy-policy',
  'privacy-policy': '/legal/privacy-policy',
  'private': '/legal/privacy-policy',
  'cookie': '/legal/cookies',
  'cookie-policy': '/legal/cookies',
  'cookies': '/legal/cookies',
  'refund': '/legal/refund-policy',
  'refunds': '/legal/refund-policy',
  'returns': '/legal/refund-policy',
  'return-policy': '/legal/refund-policy',
  'message': '/legal/messaging-consent',
  'messaging': '/legal/messaging-consent',
  'consent': '/legal/messaging-consent',
  'text-consent': '/legal/messaging-consent',
  'sms-consent': '/legal/messaging-consent',
  'gdpr': '/legal/gdpr',
  'data-protection': '/legal/gdpr',
  'eu-privacy': '/legal/gdpr',
  'cookie-settings': '/legal/cookie-settings',
  'cookie-preferences': '/legal/cookie-settings',
};

// Route normalization function to handle common URL variants
export const normalizeRoute = (route: string): string => {
  // First check direct matches in our correction map
  if (COMMON_ROUTE_CORRECTIONS[route]) {
    return COMMON_ROUTE_CORRECTIONS[route];
  }
  
  // Check if this is a legal-related route
  if (route.includes('/legal/') || 
      route.startsWith('/term') || 
      route.startsWith('/priv') || 
      route.startsWith('/cookie') || 
      route.startsWith('/refund') || 
      route.startsWith('/message') || 
      route.startsWith('/gdpr') || 
      route.startsWith('/consent')) {
    
    // Try to match against known legal route patterns
    const routeLower = route.toLowerCase();
    
    for (const [pattern, correction] of Object.entries(LEGAL_ROUTE_PATTERNS)) {
      if (routeLower.includes(pattern)) {
        return correction;
      }
    }
  }
  
  // Handle entities route with tab parameter
  if (route === '/admin/users') {
    return '/admin/entities?tab=users';
  }
  
  if (route === '/admin/companies') {
    return '/admin/entities?tab=companies';
  }
  
  // Convert routes to their canonical form
  if (route.includes('/strategy') && !route.includes('/strategies')) {
    return route.replace('/strategy', '/strategies');
  }
  
  if (route.includes('/account') && route.includes('/dashboard')) {
    return route.replace('/account', '/profile');
  }
  
  if (route.includes('/my-leads')) {
    return route.replace('/my-leads', '/dashboard/leads');
  }

  // Handle admin routes
  if (route.includes('/admin/dashboard')) {
    return route.replace('/admin/dashboard', '/admin');
  }
  
  // Fix any diagnostic/health confusion
  if (route.includes('/admin/diagnostic') && !route.includes('/admin/diagnostics')) {
    return route.replace('/admin/diagnostic', '/admin/diagnostics');
  }
  
  if (route.includes('/diagnostic') && !route.includes('/admin')) {
    return '/admin/diagnostics';
  }
  
  // Fix any boardroom/strategy confusion
  if (route.includes('/boardroom')) {
    return route.replace('/boardroom', '/strategies');
  }
  
  if (route === '/auth/login') {
    return '/login';
  }
  
  // Fix any compliance paths
  if (route.includes('/complian') && !route.includes('/compliance')) {
    return route.replace(/\/complian[^\/]*/, '/compliance');
  }

  // Fix admin system-health and admin diagnostics routes
  if (route.includes('/admin/system') && !route.includes('/admin/system-health')) {
    return '/admin/system-health';
  }
  
  if (route.includes('/admin/diagnostic') && !route.includes('/admin/diagnostics')) {
    return '/admin/diagnostics';
  }
  
  // Make sure system-health and diagnostics routes are properly handled
  if (route === '/system-health') {
    return '/admin/system-health';
  }
  
  if (route === '/diagnostics' || route === '/system/diagnostics') {
    return '/admin/diagnostics';
  }
  
  // Legal page normalizations
  if (route.includes('/term') && !route.includes('/terms-of-service')) {
    return '/legal/terms-of-service';
  }
  
  if ((route.includes('/privacy') || route.includes('/gdpr')) && route !== '/privacy') {
    return '/privacy';
  }
  
  if (route.includes('/cookie') && route !== '/cookie-policy') {
    return '/cookie-policy';
  }
  
  return route;
};

// Track route visits for analytics and suggestions
let recentRoutes: string[] = [];

export const trackRouteVisit = (route: string) => {
  if (!route) return;
  
  // Add to recent routes, keeping only the last 10
  recentRoutes.unshift(route);
  if (recentRoutes.length > 10) {
    recentRoutes = recentRoutes.slice(0, 10);
  }
  
  // Could send to analytics here
  if (typeof window !== 'undefined') {
    try {
      window.dispatchEvent(new CustomEvent('route-visit', { 
        detail: { route, timestamp: new Date().toISOString() } 
      }));
    } catch (e) {
      // Silent catch - non-critical
    }
  }
};

export const getRecentRoutes = () => {
  return [...recentRoutes];
};
