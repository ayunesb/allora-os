
import React, { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import SkipToContent from '@/components/accessibility/SkipToContent';
import AccessibilityAnnouncer from '@/components/accessibility/AccessibilityAnnouncer';
import { useAccessibility } from '@/context/AccessibilityContext';

// Loading spinner for lazy-loaded dashboard components
const DashboardLoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    <span className="sr-only">Loading dashboard content...</span>
  </div>
);

export default function DashboardLayout() {
  const { applyAccessibilityClasses } = useAccessibility();
  
  // Apply accessibility classes when the layout mounts
  useEffect(() => {
    applyAccessibilityClasses();
    
    // Add a "main-content" id to the main element if it doesn't have one
    const mainElement = document.querySelector('main');
    if (mainElement && !mainElement.id) {
      mainElement.id = 'main-content';
    }
  }, [applyAccessibilityClasses]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Skip to content link for keyboard users */}
      <SkipToContent />
      
      {/* Screen reader announcements */}
      <AccessibilityAnnouncer />
      
      {/* Navigation bar */}
      <Navbar />
      
      {/* Main content area */}
      <main id="main-content" className="flex-1" role="main">
        <Suspense fallback={<DashboardLoadingSpinner />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}
