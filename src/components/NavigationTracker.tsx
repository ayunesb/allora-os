
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackRouteVisit } from '@/utils/navigation';

/**
 * Component that silently tracks navigation to help with
 * improved 404 recommendations and route analytics
 */
export function NavigationTracker() {
  const location = useLocation();
  
  useEffect(() => {
    // Track the current route
    trackRouteVisit(location.pathname);
    
    // We could also log analytics here if needed
  }, [location.pathname]);
  
  // This component doesn't render anything visually
  return null;
}
