
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from './components/ui/toaster';
import { Toaster as SonnerToaster } from 'sonner';

export function AppRoutes() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster />
      <SonnerToaster position="bottom-right" />
    </AuthProvider>
  );
}
