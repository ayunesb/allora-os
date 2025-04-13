
import React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { setupAccessibleErrorHandling } from "@/utils/api/errorHandling";
import { logger } from "@/utils/loggingService";

export default function RootLayout() {
  // Apply any global effects or settings when the root layout mounts
  React.useEffect(() => {
    try {
      document.documentElement.classList.add('antialiased');
      setupAccessibleErrorHandling();
      logger.info('Root layout mounted');
      
      return () => {
        document.documentElement.classList.remove('antialiased');
        logger.info('Root layout unmounted');
      };
    } catch (error) {
      logger.error('Error in RootLayout effect:', error);
    }
  }, []);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background font-sans antialiased">
        <Outlet />
        <Toaster />
      </div>
    </ErrorBoundary>
  );
}
