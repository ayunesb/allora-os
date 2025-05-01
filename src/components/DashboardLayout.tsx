
import React, { Suspense, useEffect, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import SkipToContent from '@/components/accessibility/SkipToContent';
import AccessibilityAnnouncer from '@/components/accessibility/AccessibilityAnnouncer';
import { useAccessibility } from '@/context/AccessibilityContext';
import { useTheme } from '@/context/ThemeContext';
import { useBreakpoint, useIsMobile } from '@/hooks/use-mobile';
import { LayoutDashboard, FileText, GraduationCap, ShoppingBag, Settings, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  const location = useLocation();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  
  // Close mobile sidebar when route changes
  useEffect(() => {
    if (isMobileSidebarOpen) {
      setIsMobileSidebarOpen(false);
    }
  }, [location.pathname]);
  
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

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Skip to content link for keyboard users */}
      <SkipToContent />
      
      {/* Screen reader announcements */}
      <AccessibilityAnnouncer />
      
      {/* Navigation bar */}
      <Navbar>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleMobileSidebar}
          aria-label={isMobileSidebarOpen ? "Close menu" : "Open menu"}
        >
          {isMobileSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </Navbar>
      
      {/* Main content area with sidebar */}
      <div className="flex-1 flex flex-col md:grid md:grid-cols-[auto_1fr] min-h-[calc(100vh-4rem)]">
        {/* Sidebar - Mobile overlay version */}
        {isMobile && isMobileSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMobileSidebarOpen(false)}
            aria-hidden="true"
          />
        )}
        
        {/* Sidebar - Mobile drawer or desktop fixed */}
        <nav 
          className={`${
            isMobile 
              ? `fixed z-50 top-16 left-0 bottom-0 w-64 transform transition-transform duration-200 ease-in-out ${
                  isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`
              : 'hidden md:block w-64'
          } bg-white/5 p-4 border-r border-white/10 overflow-y-auto`}
        >
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-white/10 ${
                  location.pathname === item.path ? 'bg-white/15' : ''
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>
        
        {/* Main content */}
        <main id="main-content" className="flex-1 p-4 sm:p-6" role="main">
          <Suspense fallback={<DashboardLoadingSpinner />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
