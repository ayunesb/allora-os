
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from './components/ui/toaster';
import { Toaster as SonnerToaster } from 'sonner';

// This component is no longer used since we've migrated to using BrowserRouter in App.tsx
// It's kept for reference only
export function AppRoutes() {
  return (
    <AuthProvider>
      {/* We're now using BrowserRouter in App.tsx instead of RouterProvider */}
      <Toaster />
      <SonnerToaster position="bottom-right" />
    </AuthProvider>
  );
}
