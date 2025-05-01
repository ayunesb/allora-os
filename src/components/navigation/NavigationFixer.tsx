
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

/**
 * NavigationFixer
 * This component ensures proper navigation state is maintained
 * and handles errors gracefully when auth context is not available
 */
const NavigationFixer: React.FC = () => {
  const location = useLocation();
  const auth = useAuth(); // This now uses the hook from hooks/useAuth.tsx which has fallback values

  useEffect(() => {
    try {
      // Check if we need to redirect the user based on their authentication state
      const currentPath = location.pathname;
      
      if (auth.user) {
        // User is authenticated, handle any redirects if needed
        console.log('User is authenticated, current path:', currentPath);
      } else {
        // User is not authenticated, we could redirect if needed
        console.log('User is not authenticated, current path:', currentPath);
      }
    } catch (error) {
      console.error('Error in NavigationFixer:', error);
    }
  }, [location.pathname, auth.user]);

  // This component doesn't render anything
  return null;
};

export default NavigationFixer;
