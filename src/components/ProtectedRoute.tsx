
import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { AuthLoadingState } from "./auth/AuthLoadingState";
import { AuthErrorState } from "./auth/AuthErrorState";
import { VerificationRequiredState } from "./auth/VerificationRequiredState";
import { logger } from "@/utils/loggingService";

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
  const [isVerifying, setIsVerifying] = useState(true);
  const [lastVerified, setLastVerified] = useState<number>(Date.now());

  // Log authentication status for debugging
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      logger.debug('Protected Route Auth State:', { 
        user: user?.id, // Use user id instead of the whole user object
        profile, 
        roleRequired, 
        adminOnly,
        isLoading,
        hasInitialized,
        isVerifying,
        profileRole: profile?.role,
        isEmailVerified,
        path: location.pathname
      });
    }
  }, [user, profile, roleRequired, adminOnly, isLoading, hasInitialized, isEmailVerified, location.pathname, isVerifying]);

  // Force session verification on sensitive routes or after time threshold
  useEffect(() => {
    const verifyAuthentication = async () => {
      setIsVerifying(true);
      
      // Only verify if we have a user and sufficient time has passed since last verification
      // or if we're on a sensitive route that requires latest auth state
      const isSensitiveRoute = adminOnly || roleRequired === 'admin' || requireVerified;
      const timeThreshold = isSensitiveRoute ? 30000 : 300000; // 30 seconds for sensitive routes, 5 minutes for others
      const shouldVerify = 
        user && 
        (Date.now() - lastVerified > timeThreshold || isSensitiveRoute);
      
      if (shouldVerify) {
        await refreshSession();
        setLastVerified(Date.now());
      }
      
      setIsVerifying(false);
    };
    
    verifyAuthentication();
  }, [location.pathname, user, adminOnly, roleRequired, requireVerified, refreshSession]);

  // Show notification for session expiration
  useEffect(() => {
    if (isSessionExpired && user) {
      toast.error("Your session has expired. Please log in again.", {
        description: "You'll be redirected to the login page."
      });
    }
  }, [isSessionExpired, user]);

  // Handle loading state
  if (isLoading || isVerifying) {
    return <AuthLoadingState />;
  }

  // Handle expired session
  if (isSessionExpired) {
    logger.warn("Session expired, redirecting to login", { path: location.pathname });
    return <Navigate to="/login" state={{ from: location, expired: true }} replace />;
  }

  // Handle unauthenticated users
  if (!user && hasInitialized) {
    logger.warn("Unauthenticated access attempt", { path: location.pathname });
    toast.error("Please log in to access this page", {
      description: "This page requires authentication."
    });
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Handle auth errors - Fix: Change authError type to string
  if (authError) {
    const errorMessage = typeof authError === 'string' ? authError : 
                         authError instanceof Error ? authError.message : 
                         'Unknown authentication error';
    
    return <AuthErrorState 
      error={errorMessage} 
      onRetry={async () => {
        await refreshSession();
      }} 
      isRetrying={false} 
    />;
  }

  // Handle verification requirement
  if (requireVerified && !isEmailVerified && hasInitialized) {
    logger.warn("Unverified user attempted to access restricted content", { path: location.pathname });
    return <VerificationRequiredState 
      onRefresh={async () => {
        await refreshSession();
      }}
      onResendVerification={async () => {}}
      isResending={false}
    />;
  }

  // Handle admin access check
  if ((adminOnly || roleRequired === 'admin') && hasInitialized) {
    if (profile?.role !== 'admin') {
      logger.warn("Non-admin attempted to access admin area", { 
        path: location.pathname,
        userRole: profile?.role 
      });
      
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
      logger.warn("Insufficient role for route access", { 
        path: location.pathname,
        requiredRole: roleRequired,
        userRole: profile?.role 
      });
      
      toast.error("You don't have permission to access this page", {
        description: `You need ${roleRequired} privileges to access this area.`
      });
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
}
