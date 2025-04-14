import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { normalizeRoute, trackRouteVisit } from '@/utils/navigation';
import { toast } from 'sonner';
import { logger } from '@/utils/loggingService';
import { useAuth } from '@/context/AuthContext';

export default function NavigationFixer() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [attemptedFix, setAttemptedFix] = useState(false);
  const [suspiciousRouteAttempts, setSuspiciousRouteAttempts] = useState<Record<string, number>>({});
  
  // Calculate isAuthenticated based on user presence
  const isAuthenticated = !!user;
  
  useEffect(() => {
    // Reset the fix attempt flag when the location changes
    setAttemptedFix(false);
    
    // Track visited route for analytics and smart suggestions
    trackRouteVisit(location.pathname);
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
      '/update-password',
      '/diagnostics',
      '/not-found',
      '/contact',
      '/about',
      '/faq',
      '/legal',
      '/privacy',
      '/terms'
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
      } else {
        // If path doesn't match known patterns and couldn't be normalized, it's likely a 404
        logger.info(`Navigation to unknown path: ${currentPath}`);
        navigate('/not-found', { replace: true, state: { attemptedPath: currentPath } });
      }
      setAttemptedFix(true);
    }

    // Enhanced legal route checking
    const legalRoutes = [
      '/legal/terms-of-service',
      '/legal/privacy-policy',
      '/legal/cookies',
      '/legal/compliance',
      '/legal/refund-policy',
      '/legal/messaging-consent'
    ];
    
    // Log any navigation to legal routes for tracking
    if (legalRoutes.includes(currentPath)) {
      logger.info(`Accessing legal route: ${currentPath}`);
      toast.info(`Navigating to legal page: ${currentPath.split('/').pop()}`);
    }

    // Add specific logging for potential 404 routes
    if (currentPath.includes('/legal') && !legalRoutes.includes(currentPath)) {
      logger.warn(`Potential 404 for legal route: ${currentPath}`);
      toast.error('Invalid legal document route');
      navigate('/not-found', { 
        replace: true, 
        state: { attemptedPath: currentPath } 
      });
    }
  }, [location.pathname, navigate, attemptedFix, isAuthenticated]);
  
  // This component doesn't render anything visible
  return null;
}
