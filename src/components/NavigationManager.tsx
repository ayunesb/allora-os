
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { registerNavigate } from '@/utils/navigation';

export const NavigationManager = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Register the navigate function for use outside of React components
    registerNavigate(navigate);
    
    // Clean up when component unmounts
    return () => registerNavigate(() => {
      console.warn('Navigation attempted after component unmounted');
    });
  }, [navigate]);
  
  // Log current route for debugging
  useEffect(() => {
    console.log(`Current route: ${location.pathname}`);
  }, [location]);
  
  // This component doesn't render anything
  return null;
};
