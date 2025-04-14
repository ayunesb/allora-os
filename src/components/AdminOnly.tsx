
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';

type AdminOnlyProps = {
  children: React.ReactNode;
};

export default function AdminOnly({ children }: AdminOnlyProps) {
  const { user, profile } = useAuth();
  
  // Calculate isAuthenticated based on user presence
  const isAuthenticated = !!user;
  
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }
  
  if (profile && profile.role !== 'admin') {
    toast.error('Access denied. Admin rights required.', {
      id: 'admin-access-denied',
    });
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
}
