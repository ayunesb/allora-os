
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { normalizeRoute } from '@/utils/navigation';
import { toast } from 'sonner';
import { logger } from '@/utils/loggingService';

export default function NavigationFixer() {
  const location = useLocation();
  const navigate = useNavigate();
  const [attemptedFix, setAttemptedFix] = useState(false);
  
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
      '/pricing'
    ];
    
    const isKnownValid = knownValidPaths.some(path => 
      currentPath === path || currentPath.startsWith(`${path}/`)
    );
    
    if (isKnownValid || attemptedFix) {
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
    }
  }, [location.pathname, navigate, attemptedFix]);
  
  // This component doesn't render anything visible
  return null;
}
