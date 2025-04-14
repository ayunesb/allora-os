
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
        <div className="min-h-screen bg-background font-sans antialiased">
          <Outlet />
          <Toaster />
          <AccessibilityButton />
          <HelpModal />
          {isRouterContextAvailable && <AccessibilityAnnouncer />}
        </div>
      </HelpProvider>
    </ErrorBoundary>
  );
}
