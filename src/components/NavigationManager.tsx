
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerNavigate } from '@/utils/navigation';

export const NavigationManager = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    registerNavigate(navigate);
    return () => registerNavigate(() => {
      console.warn('Navigation attempted after component unmounted');
    });
  }, [navigate]);
  
  return null;
};
