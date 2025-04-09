
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
      toast.error("Your session has expired. Please log in again.", {
        description: "You'll be redirected to the login page."
      });
    }
  }, [isSessionExpired, user]);

  // For development purposes, log auth state
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Protected Route Auth State:', { 
        user, 
        profile, 
        roleRequired, 
        adminOnly,
        isLoading
      });
    }
  }, [user, profile, roleRequired, adminOnly, isLoading]);

  // Handler functions
  const handleResendVerificationEmail = async (): Promise<void> => {
    if (!user?.email) {
      toast.error("Email address is missing", {
        description: "We couldn't find your email address. Please try logging in again."
      });
      return;
    }

    setIsResending(true);
    try {
      const result = await resendVerificationEmail(user.email);
      if (result.success) {
        toast.success("Verification email sent successfully", {
          description: "Please check your inbox and spam folder."
        });
      } else {
        toast.error(result.error || "Failed to send verification email", {
          description: "Please try again in a few minutes."
        });
      }
    } catch (error) {
      console.error("Error sending verification email:", error);
      toast.error("An error occurred while sending verification email", {
        description: "Please try again later or contact support."
      });
    } finally {
      setIsResending(false);
    }
  };

  const handleSessionRefresh = async (): Promise<void> => {
    setIsRefreshing(true);
    try {
      await refreshSession();
      toast.success("Session refreshed successfully");
    } catch (error) {
      console.error("Error refreshing session:", error);
      toast.error("An unexpected error occurred", {
        description: "Unable to refresh your session. Please try logging in again."
      });
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
    toast.error("Please log in to access this page", {
      description: "This page requires authentication."
    });
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireVerified && !isEmailVerified) {
    return <VerificationRequiredState 
      onRefresh={async (): Promise<void> => {
        await refreshSession();
      }}
      onResendVerification={handleResendVerificationEmail}
      isResending={isResending}
    />;
  }

  // Check for admin access if adminOnly is set
  if ((adminOnly || roleRequired === 'admin') && profile) {
    const isAdmin = profile.role === 'admin';
    
    if (!isAdmin) {
      console.log('Access denied: User does not have admin role', profile);
      toast.error("You don't have permission to access this page", {
        description: "This area requires administrator privileges."
      });
      return <Navigate to="/dashboard" replace />;
    }
  }
  // Check for role if roleRequired is set
  else if (roleRequired && profile) {
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
