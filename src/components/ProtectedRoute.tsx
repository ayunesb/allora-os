
import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { AuthLoadingState } from "./auth/AuthLoadingState";
import { AuthErrorState } from "./auth/AuthErrorState";
import { VerificationRequiredState } from "./auth/VerificationRequiredState";
import { logger } from "@/utils/loggingService";
import { createAuthCompatibilityLayer } from "@/utils/authCompatibility";

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
  const authContext = useAuth();
  const auth = createAuthCompatibilityLayer(authContext);
  
  const location = useLocation();
  const [isVerifying, setIsVerifying] = useState(true);
  const [lastVerified, setLastVerified] = useState<number>(Date.now());

  // Log authentication status for debugging
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      logger.debug('Protected Route Auth State:', { 
        user: auth.user?.id, // Use user id instead of the whole user object
        profile: auth.profile, 
        roleRequired, 
        adminOnly,
        isLoading: auth.isLoading,
        hasInitialized: auth.hasInitialized,
        isVerifying,
        profileRole: auth.profile?.role,
        isEmailVerified: auth.isEmailVerified,
        path: location.pathname
      });
    }
  }, [auth.user, auth.profile, roleRequired, adminOnly, auth.isLoading, auth.hasInitialized, auth.isEmailVerified, location.pathname, isVerifying]);

  // Force session verification on sensitive routes or after time threshold
  useEffect(() => {
    const verifyAuthentication = async () => {
      setIsVerifying(true);
      
      // Only verify if we have a user and sufficient time has passed since last verification
      // or if we're on a sensitive route that requires latest auth state
      const isSensitiveRoute = adminOnly || roleRequired === 'admin' || requireVerified;
      const timeThreshold = isSensitiveRoute ? 30000 : 300000; // 30 seconds for sensitive routes, 5 minutes for others
      const shouldVerify = 
        auth.user && 
        (Date.now() - lastVerified > timeThreshold || isSensitiveRoute);
      
      if (shouldVerify && auth.refreshSession) {
        await auth.refreshSession();
        setLastVerified(Date.now());
      }
      
      setIsVerifying(false);
    };
    
    verifyAuthentication();
  }, [location.pathname, auth.user, adminOnly, roleRequired, requireVerified, auth.refreshSession]);

  // Show notification for session expiration
  useEffect(() => {
    if (auth.isSessionExpired && auth.user) {
      toast.error("Your session has expired. Please log in again.", {
        description: "You'll be redirected to the login page."
      });
    }
  }, [auth.isSessionExpired, auth.user]);

  // Handle loading state
  if (auth.isLoading || isVerifying) {
    return <AuthLoadingState />;
  }

  // Handle expired session
  if (auth.isSessionExpired) {
    logger.warn("Session expired, redirecting to login", { path: location.pathname });
    return <Navigate to="/login" state={{ from: location, expired: true }} replace />;
  }

  // Handle unauthenticated users
  if (!auth.user && auth.hasInitialized) {
    logger.warn("Unauthenticated access attempt", { path: location.pathname });
    toast.error("Please log in to access this page", {
      description: "This page requires authentication."
    });
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Handle auth errors
  if (auth.authError) {
    let errorMessage = "Unknown authentication error";
    
    if (typeof auth.authError === 'string') {
      errorMessage = auth.authError;
    } else if (typeof auth.authError === 'object' && auth.authError !== null && 'message' in auth.authError) {
      errorMessage = auth.authError.message as string;
    }
    
    return <AuthErrorState 
      error={errorMessage} 
      onRetry={async () => {
        if (auth.refreshSession) {
          await auth.refreshSession();
        }
      }} 
      isRetrying={false} 
    />;
  }

  // Handle verification requirement
  if (requireVerified && !auth.isEmailVerified && auth.hasInitialized) {
    logger.warn("Unverified user attempted to access restricted content", { path: location.pathname });
    return <VerificationRequiredState 
      onRefresh={async () => {
        if (auth.refreshSession) {
          await auth.refreshSession();
        }
      }}
      onResendVerification={async () => {}}
      isResending={false}
    />;
  }

  // Handle admin access check
  if ((adminOnly || roleRequired === 'admin') && auth.hasInitialized) {
    const isAdmin = auth.profile?.role === 'admin' || 
                  auth.user?.app_metadata?.is_admin;
    
    if (!isAdmin) {
      logger.warn("Non-admin attempted to access admin area", { 
        path: location.pathname,
        userRole: auth.profile?.role 
      });
      
      toast.error("You don't have permission to access this page", {
        description: "This area requires administrator privileges."
      });
      return <Navigate to="/dashboard" replace />;
    }
  }
  else if (roleRequired && auth.profile && auth.hasInitialized) {
    const userRole = auth.profile?.role || 'user';
    const hasRequiredRole = userRole === roleRequired || 
                          (roleRequired === 'user' && userRole === 'admin');
    
    if (!hasRequiredRole) {
      logger.warn("Insufficient role for route access", { 
        path: location.pathname,
        requiredRole: roleRequired,
        userRole: userRole
      });
      
      toast.error("You don't have permission to access this page", {
        description: `You need ${roleRequired} privileges to access this area.`
      });
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
}
