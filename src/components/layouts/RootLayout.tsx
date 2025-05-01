
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { setupAccessibleErrorHandling } from "@/utils/api/errorHandling";
import { logger } from "@/utils/loggingService";
import { AccessibilityButton } from "@/components/accessibility/AccessibilityPanel";
import { HelpProvider } from "@/context/HelpContext";
import { HelpModal } from "@/components/help/HelpModal";
import AccessibilityAnnouncer from "@/components/accessibility/AccessibilityAnnouncer";
import { Link } from "react-router-dom";

export default function RootLayout() {
  // Apply any global effects or settings when the root layout mounts
  React.useEffect(() => {
    try {
      logger.info('RootLayout mounted');
      document.documentElement.classList.add('antialiased');
      setupAccessibleErrorHandling();
      
      return () => {
        logger.info('RootLayout unmounted');
        document.documentElement.classList.remove('antialiased');
      };
    } catch (error) {
      logger.error('Error in RootLayout useEffect:', error);
    }
  }, []);

  // Check if we're inside a Router context to safely render AccessibilityAnnouncer
  let isRouterContextAvailable = true;
  try {
    // This will throw if not in Router context
    useLocation();
  } catch (e) {
    isRouterContextAvailable = false;
  }

  return (
    <ErrorBoundary>
      <HelpProvider>
        <div className="min-h-screen bg-background text-foreground font-sans">
          <header className="border-b px-6 py-4 bg-white/10 sticky top-0 z-50 backdrop-blur">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <h1 className="text-xl font-heading font-semibold">Allora OS</h1>
              <nav className="hidden md:block">
                <ul className="flex items-center space-x-6">
                  <li><Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
                  <li><Link to="/strategies" className="hover:text-primary transition-colors">Strategies</Link></li>
                  <li><Link to="/settings" className="hover:text-primary transition-colors">Settings</Link></li>
                </ul>
              </nav>
            </div>
          </header>
          
          <main className="max-w-7xl mx-auto p-6 space-y-8">
            <Outlet />
          </main>
          
          <Toaster />
          <AccessibilityButton />
          <HelpModal />
          {isRouterContextAvailable && <AccessibilityAnnouncer />}
        </div>
      </HelpProvider>
    </ErrorBoundary>
  );
}
