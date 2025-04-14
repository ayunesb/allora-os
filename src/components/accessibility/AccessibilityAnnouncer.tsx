
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Accessibility announcer component for screen readers
 * Announces route changes and other important information
 */
export function AccessibilityAnnouncer() {
  const [announcement, setAnnouncement] = useState('');
  const location = useLocation();
  
  // Announce route changes
  useEffect(() => {
    // Get the page title from document or h1 elements
    const getPageTitle = () => {
      // Try to get the document title
      if (document.title) {
        return document.title;
      }
      
      // Try to get the first h1 element
      const h1Element = document.querySelector('h1');
      if (h1Element && h1Element.textContent) {
        return h1Element.textContent;
      }
      
      // Default to pathname
      return location.pathname.replace(/\//g, ' ').trim() || 'Home';
    };
    
    // Build the announcement
    const pageTitle = getPageTitle();
    const newAnnouncement = `Navigated to ${pageTitle}`;
    
    // Set the announcement
    setAnnouncement(newAnnouncement);
    
    // Clear the announcement after 3 seconds
    const timer = setTimeout(() => {
      setAnnouncement('');
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [location]);
  
  return (
    <div 
      className="sr-only" 
      role="status" 
      aria-live="polite" 
      aria-atomic="true"
    >
      {announcement}
    </div>
  );
}

export default AccessibilityAnnouncer;
