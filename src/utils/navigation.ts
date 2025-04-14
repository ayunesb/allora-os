
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
    navigateFunction(to, options);
  } else {
    console.warn('Navigation function not registered yet.');
  }
};

// Route normalization function to handle common URL variants
export const normalizeRoute = (route: string): string => {
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
  
  // Ensure all admin routes exist
  if (route === '/admin/users' || 
      route === '/admin/companies' || 
      route === '/admin/campaigns' ||
      route === '/admin/leads' ||
      route === '/admin/analytics' ||
      route === '/admin/settings' ||
      route === '/admin/launch-prep') {
    // These routes are valid
    return route;
  }

  if (route === '/auth/login') {
    return '/login';
  }
  
  // Fix any boardroom/strategy confusion
  if (route.includes('/boardroom')) {
    return route.replace('/boardroom', '/strategies');
  }
  
  return route;
};
