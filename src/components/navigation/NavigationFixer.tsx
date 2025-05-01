
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { normalizeRoute, trackRouteVisit } from '@/utils/navigation';
import { trackRouteAccess, isValidLegalRoute, getSuggestedLegalRoutes, validLegalRoutes } from '@/utils/routeTracker';
import { toast } from 'sonner';
import { logger } from '@/utils/loggingService';
import { useAuth } from '@/hooks/useAuth';

export default function NavigationFixer() {
  const location = useLocation();
  const navigate = useNavigate();
  
  let user;
  let isAuthenticated = false;
  
  try {
    // Try to get auth info, but don't crash if not available
    const auth = useAuth();
    user = auth?.user;
    isAuthenticated = !!user;
  } catch (error) {
    // Auth context not available, continue without it
    logger.warn('Auth context not available in NavigationFixer');
  }
  
  const [attemptedFix, setAttemptedFix] = useState(false);
  const [suspiciousRouteAttempts, setSuspiciousRouteAttempts] = useState<Record<string, number>>({});
  
  useEffect(() => {
    // Reset the fix attempt flag when the location changes
    setAttemptedFix(false);
    
    // Track visited route for analytics and smart suggestions
    trackRouteVisit(location.pathname);
    
    // Also track route access for legal pages specifically
    trackRouteAccess(location.pathname);
  }, [location.pathname]);
  
  useEffect(() => {
    const currentPath = location.pathname;
    
    // Skip processing for known valid routes
    const knownValidPaths = [
      '/',
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
      '/update-password',
      '/diagnostics',
      '/not-found',
      '/contact',
      '/about',
      '/faq',
      '/legal',
      '/settings',
    ];
    
    // Add all legal routes to known valid paths
    const allValidPaths = [...knownValidPaths, ...validLegalRoutes];
    
    const isKnownValid = allValidPaths.some(path => 
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
      navigate('/login', { replace: true, state: { from: currentPath } });
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
      // Check if this is an admin or dashboard path that might be misspelled
      const isLikelyAdminPath = /^\/adm(in)?.*/.test(currentPath);
      const isLikelyDashboardPath = /^\/dash(board)?.*/.test(currentPath);
      const isLikelyCompliancePath = /^\/comp(liance)?.*/.test(currentPath);
      const isLikelySystemPath = /^\/sys(tem)?.*/.test(currentPath);
      const isLikelyDiagnosticsPath = /^\/diag(nostics)?.*/.test(currentPath);
      const isLikelyLegalPath = /^\/(legal|terms|priv|cookie|refund|message|consent|gdpr).*/.test(currentPath);
      
      if (isLikelyAdminPath) {
        navigate('/admin', { replace: true, state: { attemptedPath: currentPath } });
        toast.info("Redirecting to the admin dashboard");
      } else if (isLikelyDashboardPath) {
        navigate('/dashboard', { replace: true, state: { attemptedPath: currentPath } });
        toast.info("Redirecting to the dashboard");
      } else if (isLikelyCompliancePath) {
        navigate('/compliance', { replace: true, state: { attemptedPath: currentPath } });
        toast.info("Redirecting to the compliance area");
      } else if (isLikelySystemPath) {
        navigate('/admin/system-health', { replace: true, state: { attemptedPath: currentPath } });
        toast.info("Redirecting to system health");
      } else if (isLikelyDiagnosticsPath) {
        navigate('/admin/diagnostics', { replace: true, state: { attemptedPath: currentPath } });
        toast.info("Redirecting to diagnostics");
      } else if (isLikelyLegalPath) {
        // Special handling for potential legal pages with typos
        const suggestedRoutes = getSuggestedLegalRoutes(currentPath);
        
        if (suggestedRoutes.length > 0) {
          // If we have suggestions, go to the first one
          navigate(suggestedRoutes[0].path, { 
            replace: true, 
            state: { attemptedPath: currentPath, suggestions: suggestedRoutes } 
          });
          toast.info(`Redirecting to ${suggestedRoutes[0].name}`);
        } else {
          // If no suggestions, go to the main legal page
          navigate('/legal', { replace: true, state: { attemptedPath: currentPath } });
          toast.info("Redirecting to legal information");
        }
      } else {
        // If path doesn't match known patterns and couldn't be normalized, it's likely a 404
        logger.info(`Navigation to unknown path: ${currentPath}`);
        navigate('/not-found', { replace: true, state: { attemptedPath: currentPath } });
      }
      setAttemptedFix(true);
    }

    // Enhanced legal route checking - specifically for /legal/something routes
    if (currentPath.includes('/legal/') && !isValidLegalRoute(currentPath)) {
      logger.warn(`Potential 404 for legal route: ${currentPath}`);
      
      // Get suggested legal routes
      const suggestedRoutes = getSuggestedLegalRoutes(currentPath);
      
      if (suggestedRoutes.length > 0) {
        toast.info(`Redirecting to ${suggestedRoutes[0].name}`);
        logger.info(`Suggested legal routes: ${JSON.stringify(suggestedRoutes)}`);
        navigate(suggestedRoutes[0].path, { 
          replace: true, 
          state: { 
            attemptedPath: currentPath,
            suggestedRoutes
          } 
        });
      } else {
        toast.error('Invalid legal document route');
        navigate('/legal', { 
          replace: true, 
          state: { attemptedPath: currentPath }
        });
      }
      setAttemptedFix(true);
    }
  }, [location.pathname, navigate, attemptedFix, isAuthenticated]);
  
  // This component doesn't render anything visible
  return null;
}
