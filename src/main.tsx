import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/components/theme-provider';
import { GlobalErrorBoundary } from '@/components/errorHandling/GlobalErrorBoundary';
import { applySecurityHeaders } from '@/utils/securityHeaders';
import { logger } from '@/utils/loggingService';
import App from './App';

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
    <BrowserRouter>
      <GlobalErrorBoundary>
        <HelmetProvider>
            <ThemeProvider defaultTheme="dark" storageKey="allora-theme">
              <QueryClientProvider client={queryClient}>
              <App />
              </QueryClientProvider>
            </ThemeProvider>
        </HelmetProvider>
      </GlobalErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
);
