
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackRouteVisit } from '@/utils/navigation';
import { useAccessibility } from '@/context/AccessibilityContext';

/**
 * Component that silently tracks navigation to help with
 * improved 404 recommendations and route analytics,
 * while also ensuring accessibility features are maintained across navigation
 */
export function NavigationTracker() {
  const location = useLocation();
  const { preferences } = useAccessibility();
  
  useEffect(() => {
    // Track the current route
    trackRouteVisit(location.pathname);
    
    // Ensure the main content area has an id for skip links
    const mainContent = document.querySelector('main');
    if (mainContent && !mainContent.id) {
      mainContent.id = 'main-content';
    }
    
    // Re-apply accessibility classes on route change
    // This ensures consistent experience across page navigation
    applyAccessibilityClasses(preferences);
    
    // Move focus to the main content area for keyboard users 
    // (only if coming from a different page and not on initial load)
    if (location.state && (location.state as any).fromNavigation) {
      const mainElement = document.getElementById('main-content');
      if (mainElement) {
        // Add tabindex temporarily to make it focusable
        mainElement.setAttribute('tabindex', '-1');
        mainElement.focus({ preventScroll: false });
        // Remove tabindex after focusing
        setTimeout(() => {
          mainElement.removeAttribute('tabindex');
        }, 100);
      }
    }
  }, [location.pathname, preferences]);
  
  // This component doesn't render anything visually
  return null;
}
