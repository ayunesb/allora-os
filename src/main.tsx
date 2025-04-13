
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './styles/index.css';
import './App.css';

// Add error boundary for React 18
const handleError = (error: Error) => {
  console.error('Caught React error:', error);
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <React.ErrorBoundary fallback={<div>Something went wrong. Please refresh the page.</div>} onError={handleError}>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </QueryClientProvider>
    </React.ErrorBoundary>
  </React.StrictMode>
);
