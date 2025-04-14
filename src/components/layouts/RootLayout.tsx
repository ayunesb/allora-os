
import React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { setupAccessibleErrorHandling } from "@/utils/api/errorHandling";
import { logger } from "@/utils/loggingService";
import { AccessibilityButton } from "@/components/accessibility/AccessibilityPanel";

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

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background font-sans antialiased">
        <Outlet />
        <Toaster />
        <AccessibilityButton />
      </div>
    </ErrorBoundary>
  );
}
