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
};

// Route normalization function to handle common URL variants
export const normalizeRoute = (route: string): string => {
  // First check direct matches in our correction map
  if (COMMON_ROUTE_CORRECTIONS[route]) {
    return COMMON_ROUTE_CORRECTIONS[route];
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
  
  // Fix any boardroom/strategy confusion
  if (route.includes('/boardroom')) {
    return route.replace('/boardroom', '/strategies');
  }
  
  if (route === '/auth/login') {
    return '/login';
  }
  
  return route;
};

// Track visited routes for smarter suggestions
let recentRoutes: string[] = [];
const MAX_RECENT_ROUTES = 10;

export const trackRouteVisit = (route: string) => {
  // Only track main sections, not deeply nested routes
  const simplifiedRoute = route.split('/').slice(0, 3).join('/');
  
  // Remove if already exists
  recentRoutes = recentRoutes.filter(r => r !== simplifiedRoute);
  
  // Add to front
  recentRoutes.unshift(simplifiedRoute);
  
  // Keep only the last MAX_RECENT_ROUTES
  if (recentRoutes.length > MAX_RECENT_ROUTES) {
    recentRoutes = recentRoutes.slice(0, MAX_RECENT_ROUTES);
  }
};

export const getRecentRoutes = (): string[] => {
  return [...recentRoutes];
};
