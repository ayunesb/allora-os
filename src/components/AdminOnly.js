import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';
import { createAuthCompatibilityLayer } from '@/utils/authCompatibility';
export default function AdminOnly({ children }) {
    const authContext = useAuth();
    const auth = createAuthCompatibilityLayer(authContext);
    // Calculate isAuthenticated based on user presence
    const isAuthenticated = !!auth?.user;
    if (!isAuthenticated) {
        return <Navigate to="/auth/login" replace/>;
    }
    // Check if the user has admin role
    const isAdmin = auth.user?.role === 'admin' || auth.user?.app_metadata?.is_admin;
    if (!isAdmin) {
        toast.error('Access denied. Admin rights required.', {
            id: 'admin-access-denied',
        });
        return <Navigate to="/dashboard" replace/>;
    }
    return <>{children}</>;
}
