
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

// Create a new QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
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
