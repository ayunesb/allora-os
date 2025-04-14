
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/AdminLayout';
import { registerNavigate } from '@/utils/navigation';

// This is a wrapper component to maintain the import structure
// but use our existing AdminLayout component and register navigation
export default function AdminLayoutWrapper() {
  const navigate = useNavigate();
  
  // Register the navigate function for use outside of components
  React.useEffect(() => {
    registerNavigate(navigate);
    return () => {
      // Unregister on unmount
      registerNavigate(() => {
        console.warn('Navigation function was unregistered');
      });
    };
  }, [navigate]);
  
  return <AdminLayout><Outlet /></AdminLayout>;
}
