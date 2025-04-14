
import { ReactNode, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { AuthLoadingState } from "./auth/AuthLoadingState";
import { AuthErrorState } from "./auth/AuthErrorState";
import { VerificationRequiredState } from "./auth/VerificationRequiredState";
import { AdminCheckHandler } from "./auth/AdminCheckHandler";
import { SessionRefreshHandler } from "./auth/SessionRefreshHandler";
import { VerificationHandler } from "./auth/VerificationHandler";
import { AuthStateHandler } from "./auth/AuthStateHandler";

type ProtectedRouteProps = {
  children: ReactNode;
  roleRequired?: 'admin' | 'user';
  adminOnly?: boolean;
  requireVerified?: boolean;
};

export default function ProtectedRoute({ 
  children, 
  roleRequired,
  adminOnly,
  requireVerified = false 
}: ProtectedRouteProps) {
  const { 
    user, 
    isLoading, 
    profile, 
    isEmailVerified, 
    refreshSession, 
    authError,
    isSessionExpired,
    hasInitialized
  } = useAuth();
  
  const location = useLocation();

  useEffect(() => {
    if (isSessionExpired && user) {
      toast.error("Your session has expired. Please log in again.", {
        description: "You'll be redirected to the login page."
      });
    }
  }, [isSessionExpired, user]);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Protected Route Auth State:', { 
        user, 
        profile, 
        roleRequired, 
        adminOnly,
        isLoading,
        hasInitialized,
        profileRole: profile?.role,
        isEmailVerified
      });
    }
  }, [user, profile, roleRequired, adminOnly, isLoading, hasInitialized, isEmailVerified]);

  // Handle loading state
  if (isLoading) {
    return <AuthLoadingState />;
  }

  // Handle expired session
  if (isSessionExpired) {
    return <Navigate to="/login" state={{ from: location, expired: true }} replace />;
  }

  // Handle unauthenticated users
  if (!user && hasInitialized) {
    toast.error("Please log in to access this page", {
      description: "This page requires authentication."
    });
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Handle auth errors
  if (authError) {
    return <AuthErrorState 
      error={authError} 
      onRetry={async () => refreshSession()} 
      isRetrying={false} 
    />;
  }

  // Handle verification requirement
  if (requireVerified && !isEmailVerified && hasInitialized) {
    return <VerificationRequiredState 
      onRefresh={async () => refreshSession()}
      onResendVerification={async () => {}}
      isResending={false}
    />;
  }

  // Handle admin access check
  if ((adminOnly || roleRequired === 'admin') && hasInitialized) {
    if (profile?.role !== 'admin') {
      toast.error("You don't have permission to access this page", {
        description: "This area requires administrator privileges."
      });
      return <Navigate to="/dashboard" replace />;
    }
  }
  else if (roleRequired && profile && hasInitialized) {
    const hasRequiredRole = profile.role === roleRequired || 
                          (roleRequired === 'user' && profile.role === 'admin');
    
    if (!hasRequiredRole) {
      toast.error("You don't have permission to access this page", {
        description: `You need ${roleRequired} privileges to access this area.`
      });
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
}
