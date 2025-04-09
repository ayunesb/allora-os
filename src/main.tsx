
import React from 'react';
import ReactDOM from 'react-dom/client';
import { 
  createBrowserRouter, 
  RouterProvider 
} from 'react-router-dom';

// Import routes
import routes from './routes';

// Import AuthProvider
import { AuthProvider } from './context/AuthContext';

// Import styles - using the new centralized import
import './styles/index';

// Create router
const router = createBrowserRouter(routes);

// Render the app
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
