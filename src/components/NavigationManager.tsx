
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerNavigate } from '@/utils/navigation';

export const NavigationManager = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Register the navigate function for use outside of React components
    registerNavigate(navigate);
    
    // Clean up when component unmounts
    return () => registerNavigate(() => {
      console.warn('Navigation attempted after component unmounted');
    });
  }, [navigate]);
  
  // This component doesn't render anything
  return null;
};
