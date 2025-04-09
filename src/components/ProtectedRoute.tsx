
import { ReactNode, useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { resendVerificationEmail } from "@/utils/authHelpers";
import { AuthLoadingState } from "./auth/AuthLoadingState";
import { AuthErrorState } from "./auth/AuthErrorState";
import { VerificationRequiredState } from "./auth/VerificationRequiredState";

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
    isSessionExpired
  } = useAuth();
  const location = useLocation();
  const [isResending, setIsResending] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Handle session expiration notification
  useEffect(() => {
    if (isSessionExpired && user) {
      toast.error("Your session has expired. Please log in again.");
    }
  }, [isSessionExpired, user]);

  // Handler functions
  const handleResendVerificationEmail = async (): Promise<void> => {
    if (!user?.email) {
      toast.error("Email address is missing");
      return;
    }

    setIsResending(true);
    try {
      const result = await resendVerificationEmail(user.email);
      if (result.success) {
        toast.success("Verification email sent successfully");
      } else {
        toast.error(result.error || "Failed to send verification email");
      }
    } catch (error) {
      console.error("Error sending verification email:", error);
      toast.error("An error occurred while sending verification email");
    } finally {
      setIsResending(false);
    }
  };

  const handleSessionRefresh = async (): Promise<void> => {
    setIsRefreshing(true);
    try {
      const success = await refreshSession();
      if (success) {
        toast.success("Session refreshed successfully");
      } else {
        toast.error("Failed to refresh session. Please log in again.");
      }
    } catch (error) {
      console.error("Error refreshing session:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsRefreshing(false);
    }
  };

  // Conditional rendering based on auth state
  if (isLoading) {
    return <AuthLoadingState />;
  }

  if (authError) {
    return <AuthErrorState 
      error={authError} 
      onRetry={handleSessionRefresh} 
      isRetrying={isRefreshing} 
    />;
  }

  if (isSessionExpired) {
    return <Navigate to="/login" state={{ from: location, expired: true }} replace />;
  }

  if (!user) {
    toast.error("Please log in to access this page");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireVerified && !isEmailVerified) {
    return <VerificationRequiredState 
      onRefresh={refreshSession}
      onResendVerification={handleResendVerificationEmail}
      isResending={isResending}
    />;
  }

  // Check for admin access if adminOnly is set
  if ((adminOnly || roleRequired === 'admin') && profile) {
    const isAdmin = profile.role === 'admin';
    
    if (!isAdmin) {
      toast.error("You don't have permission to access this page");
      return <Navigate to="/dashboard" replace />;
    }
  }
  // Check for role if roleRequired is set
  else if (roleRequired && profile) {
    const hasRequiredRole = profile.role === roleRequired || 
                           (roleRequired === 'user' && profile.role === 'admin');
    
    if (!hasRequiredRole) {
      toast.error("You don't have permission to access this page");
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
}
