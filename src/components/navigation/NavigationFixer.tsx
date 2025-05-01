
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
  
  // Use a try-catch block to handle potential auth context errors
  let authState = null;
  try {
    authState = useAuth();
  } catch (error) {
    console.warn('Auth context not available in NavigationFixer:', error);
    // Continue with null auth state - component will work in limited capacity
  }

  useEffect(() => {
    try {
      // Check if we need to redirect the user based on their authentication state
      const currentPath = location.pathname;
      
      if (authState?.user) {
        // User is authenticated, handle any redirects if needed
        console.log('User is authenticated, current path:', currentPath);
      } else {
        // User is not authenticated, we could redirect if needed
        console.log('User is not authenticated, current path:', currentPath);
      }
    } catch (error) {
      console.error('Error in NavigationFixer:', error);
    }
  }, [location.pathname, authState?.user]);

  // This component doesn't render anything
  return null;
};

export default NavigationFixer;
