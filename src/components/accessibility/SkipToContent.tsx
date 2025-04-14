
import React from 'react';

/**
 * Skip to Content component for keyboard accessibility
 * This allows keyboard users to skip directly to the main content
 * instead of having to tab through all navigation elements
 */
export function SkipToContent() {
  return (
    <a 
      href="#main-content" 
      className="skip-link focus:bg-primary focus:text-primary-foreground focus:no-underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
      Skip to content
    </a>
  );
}

export default SkipToContent;
