
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GlobalErrorBoundary } from '@/components/errorHandling/GlobalErrorBoundary';
import './styles/index.css';
import './App.css';
import { logger } from '@/utils/loggingService';

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

// Render the app with proper providers
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalErrorBoundary 
      onError={handleError} 
      fallback={<div className="p-8 text-center">Something went wrong. Please refresh the page.</div>}
    >
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </GlobalErrorBoundary>
  </React.StrictMode>
);
