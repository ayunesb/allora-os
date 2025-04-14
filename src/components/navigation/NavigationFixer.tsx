
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { normalizeRoute } from '@/utils/navigation';
import { toast } from 'sonner';
import { logger } from '@/utils/loggingService';
import { useAuth } from '@/context/AuthContext';

export default function NavigationFixer() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [attemptedFix, setAttemptedFix] = useState(false);
  const [suspiciousRouteAttempts, setSuspiciousRouteAttempts] = useState<Record<string, number>>({});
  
  useEffect(() => {
    // Reset the fix attempt flag when the location changes
    setAttemptedFix(false);
  }, [location.pathname]);
  
  useEffect(() => {
    const currentPath = location.pathname;
    
    // Skip processing for known valid routes
    const knownValidPaths = [
      '/login', 
      '/signup', 
      '/dashboard', 
      '/admin', 
      '/onboarding',
      '/compliance',
      '/home',
      '/pricing',
      '/auth',
      '/reset-password',
      '/email-confirm',
      '/verify-otp',
      '/update-password'
    ];
    
    const isKnownValid = knownValidPaths.some(path => 
      currentPath === path || currentPath.startsWith(`${path}/`)
    );
    
    if (isKnownValid || attemptedFix) {
      return;
    }
    
    // Check for suspicious admin/restricted area access attempts
    const restrictedPaths = ['/admin', '/compliance'];
    const isRestrictedPath = restrictedPaths.some(path => 
      currentPath.startsWith(path) && !isAuthenticated
    );
    
    if (isRestrictedPath) {
      // Log suspicious activity
      setSuspiciousRouteAttempts(prev => {
        const count = (prev[currentPath] || 0) + 1;
        const newState = { ...prev, [currentPath]: count };
        
        // If multiple attempts, log as potential security issue
        if (count > 1) {
          logger.warn('Multiple unauthorized access attempts to restricted area', {
            path: currentPath,
            attempts: count,
            userAgent: navigator.userAgent
          });
        }
        
        return newState;
      });
      
      // Redirect to login
      logger.info(`Unauthorized access attempt to restricted area: ${currentPath}`);
      toast.error("You need to be logged in to access this area");
      navigate('/login', { replace: true });
      setAttemptedFix(true);
      return;
    }
    
    // Try to normalize the route
    const normalizedPath = normalizeRoute(currentPath);
    
    // If normalization changed the path, redirect to the normalized path
    if (normalizedPath !== currentPath) {
      logger.info(`Fixing navigation: Redirecting from ${currentPath} to ${normalizedPath}`);
      
      // Show a toast notification about the redirect
      toast.info("Redirecting to the correct page");
      
      // Navigate to the normalized path
      navigate(normalizedPath, { replace: true });
      setAttemptedFix(true);
    } else if (!currentPath.match(/^\/(api|assets|images|css|js|fonts|favicon)/)) {
      // If path doesn't match known patterns and couldn't be normalized, it's likely a 404
      logger.info(`Navigation to unknown path: ${currentPath}`);
      navigate('/not-found', { replace: true, state: { attemptedPath: currentPath } });
      setAttemptedFix(true);
    }
  }, [location.pathname, navigate, attemptedFix, isAuthenticated]);
  
  // This component doesn't render anything visible
  return null;
}
