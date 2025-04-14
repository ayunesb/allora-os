
import React, { ReactNode } from 'react';
import { AuthProvider } from '@/context/AuthContext';

interface AuthProviderWrapperProps {
  children: ReactNode;
}

/**
 * A component that ensures all children are wrapped with the AuthProvider
 * to prevent "useAuth must be used within an AuthProvider" errors
 */
export function AuthProviderWrapper({ children }: AuthProviderWrapperProps) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
