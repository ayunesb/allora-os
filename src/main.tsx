
import React from 'react';
import ReactDOM from 'react-dom/client';
import { 
  createBrowserRouter, 
  RouterProvider 
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Import routes
import routes from './routes';

// Import AuthProvider
import { AuthProvider } from './context/AuthContext';

// Import styles - using the new centralized import
import './styles/index';

// Create a new QueryClient instance
const queryClient = new QueryClient();

// Create router
const router = createBrowserRouter(routes);

// Render the app
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
