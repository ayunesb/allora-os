
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/components/theme-provider';
import { router } from './routes/router';
import { GlobalErrorBoundary } from '@/components/errorHandling/GlobalErrorBoundary';
import { AccessibilityProvider } from '@/context/AccessibilityContext';
import { applySecurityHeaders } from '@/utils/securityHeaders';
import { logger } from '@/utils/loggingService';

// Apply security headers before anything else
applySecurityHeaders();

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

// Log initialization
logger.info('Application initializing with latest Lovable template');

// Render the app with proper providers
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalErrorBoundary>
      <HelmetProvider>
        <ThemeProvider defaultTheme="dark" storageKey="allora-theme">
          <AccessibilityProvider>
            <QueryClientProvider client={queryClient}>
              <RouterProvider router={router} />
            </QueryClientProvider>
          </AccessibilityProvider>
        </ThemeProvider>
      </HelmetProvider>
    </GlobalErrorBoundary>
  </React.StrictMode>
);
