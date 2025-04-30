
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GlobalErrorBoundary } from '@/components/errorHandling/GlobalErrorBoundary';
import { HelpProvider } from '@/context/HelpContext';
import { applySecurityHeaders } from '@/utils/securityHeaders';
import './styles/index.css';
import './App.css';
import { logger } from '@/utils/loggingService';

// Apply security headers before anything else
applySecurityHeaders();

// Initialize error handlers
const handleError = (error: Error) => {
  logger.error('Caught React error in main:', error);
  console.error('React error caught in main.tsx:', error);
};

// Initialize QueryClient with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

// Log initialization
logger.info('Application initializing');
console.log('Application initializing - main.tsx');

// Regenerate CSRF token on app load
import { generateCsrfToken } from '@/utils/csrfProtection';
generateCsrfToken();

// Render the app with proper providers
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalErrorBoundary 
      onError={handleError}
      fallback={<div className="p-8 text-center">Something went wrong. Please refresh the page.</div>} children={undefined}    >
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <HelpProvider children={undefined}>
            <App />
          </HelpProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </GlobalErrorBoundary>
  </React.StrictMode>
);
