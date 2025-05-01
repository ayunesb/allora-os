
import React, { Suspense, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import SkipToContent from '@/components/accessibility/SkipToContent';
import AccessibilityAnnouncer from '@/components/accessibility/AccessibilityAnnouncer';
import { useAccessibility } from '@/context/AccessibilityContext';
import { useTheme } from '@/context/ThemeContext';
import { LayoutDashboard, FileText, GraduationCap, ShoppingBag, Settings } from 'lucide-react';

// Loading spinner for lazy-loaded dashboard components
const DashboardLoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    <span className="sr-only">Loading dashboard content...</span>
  </div>
);

// Sidebar navigation items
const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: FileText, label: "Strategies", path: "/dashboard/strategies" },
  { icon: GraduationCap, label: "Academy", path: "/academy" },
  { icon: ShoppingBag, label: "Shop", path: "/shop" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export default function DashboardLayout() {
  const { preferences } = useAccessibility();
  
  // Apply accessibility classes when the layout mounts
  useEffect(() => {
    if (preferences) {
      document.documentElement.classList.toggle('high-contrast', !!preferences.highContrast);
      document.documentElement.classList.toggle('large-text', !!preferences.largeText);
      document.documentElement.classList.toggle('reduced-motion', !!preferences.reducedMotion);
      document.documentElement.classList.toggle('enhanced-focus', !!preferences.enhancedFocus);
      document.documentElement.classList.toggle('screen-reader-friendly', !!preferences.screenReaderFriendly);
      document.documentElement.classList.toggle('improved-spacing', !!preferences.improvedTextSpacing);
    }
    
    // Add a "main-content" id to the main element if it doesn't have one
    const mainElement = document.querySelector('main');
    if (mainElement && !mainElement.id) {
      mainElement.id = 'main-content';
    }
  }, [preferences]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Skip to content link for keyboard users */}
      <SkipToContent />
      
      {/* Screen reader announcements */}
      <AccessibilityAnnouncer />
      
      {/* Navigation bar (could be kept minimal since we have sidebar) */}
      <Navbar />
      
      {/* Main content area with sidebar */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-[16rem_1fr] min-h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <nav className="hidden md:block w-64 bg-white/5 p-4 border-r border-white/10">
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-white/10"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>
        
        {/* Main content */}
        <main id="main-content" className="p-6" role="main">
          <Suspense fallback={<DashboardLoadingSpinner />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
