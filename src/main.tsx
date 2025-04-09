
import React from 'react';
import ReactDOM from 'react-dom/client';
import { 
  BrowserRouter 
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Import routes
import { AppRoutes } from './routes';

// Import styles - using the new centralized import
import './styles/index';

// Create a new QueryClient instance with better error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
      // Updated error handling to use the correct API
      meta: {
        onError: (error: Error) => {
          console.error('Query error:', error);
        }
      }
    },
    mutations: {
      // Updated error handling to use the correct API
      meta: {
        onError: (error: Error) => {
          console.error('Mutation error:', error);
        }
      }
    }
  },
});

// Render the app
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

