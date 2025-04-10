
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
      meta: {
        onError: (error: Error) => {
          // Silently handle errors in production
          if (process.env.NODE_ENV !== 'production') {
            console.error('Query error:', error);
          }
        }
      }
    },
    mutations: {
      meta: {
        onError: (error: Error) => {
          // Silently handle errors in production
          if (process.env.NODE_ENV !== 'production') {
            console.error('Mutation error:', error);
          }
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
