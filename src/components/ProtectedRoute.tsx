
import { ReactNode, useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { resendVerificationEmail } from "@/utils/authHelpers";
import { AuthLoadingState } from "./auth/AuthLoadingState";
import { AuthErrorState } from "./auth/AuthErrorState";
import { VerificationRequiredState } from "./auth/VerificationRequiredState";
import { checkIfUserIsAdmin } from "@/utils/adminHelper";

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
  const [isResending, setIsResending] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [adminCheckDone, setAdminCheckDone] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [loadingTimeout, setLoadingTimeout] = useState(false);

  // Set a timeout to avoid infinite loading
  useEffect(() => {
    let timer: number;
    if (isLoading && !loadingTimeout) {
      timer = window.setTimeout(() => {
        setLoadingTimeout(true);
      }, 10000); // 10 seconds loading timeout
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isLoading, loadingTimeout]);

  useEffect(() => {
    if (isSessionExpired && user) {
      toast.error("Your session has expired. Please log in again.", {
        description: "You'll be redirected to the login page."
      });
    }
  }, [isSessionExpired, user]);

  // Check admin status directly from the database
  useEffect(() => {
    const verifyAdminStatus = async () => {
      if (user && (adminOnly || roleRequired === 'admin')) {
        try {
          const isAdmin = await checkIfUserIsAdmin();
          console.log('Admin check result:', isAdmin, 'for user:', user.email);
          setIsUserAdmin(isAdmin);
          setAdminCheckDone(true);
        } catch (error) {
          console.error('Error checking admin status:', error);
          setAdminCheckDone(true); // Continue even on error
        }
      } else {
        setAdminCheckDone(true);
      }
    };

    if (user && !adminCheckDone && hasInitialized) {
      verifyAdminStatus();
    }
  }, [user, adminOnly, roleRequired, adminCheckDone, hasInitialized]);

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
        isUserAdmin,
        loadingTimeout
      });
    }
  }, [user, profile, roleRequired, adminOnly, isLoading, isUserAdmin, hasInitialized, loadingTimeout]);

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

  // Show loading state but with timeout protection
  if (isLoading && !loadingTimeout) {
    return <AuthLoadingState />;
  }

  // If loading took too long, give user the option to retry or navigate back
  if (loadingTimeout && isLoading) {
    return (
      <AuthErrorState 
        error="Loading took too long. There might be an issue with the connection." 
        onRetry={handleSessionRefresh} 
        isRetrying={isRefreshing} 
      />
    );
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

  if (!user && hasInitialized) {
    toast.error("Please log in to access this page", {
      description: "This page requires authentication."
    });
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireVerified && !isEmailVerified && hasInitialized) {
    return <VerificationRequiredState 
      onRefresh={async (): Promise<void> => {
        await refreshSession();
      }}
      onResendVerification={handleResendVerificationEmail}
      isResending={isResending}
    />;
  }

  // Check admin access - improved to use both direct check and profile check
  if ((adminOnly || roleRequired === 'admin') && hasInitialized) {
    // Priority 1: Check direct database admin status
    if (isUserAdmin) {
      console.log('Admin access granted via direct database check');
      return <>{children}</>;
    }
    
    // Priority 2: Check profile.role (should be in sync, but as fallback)
    const isAdminByProfile = profile?.role === 'admin';
    
    if (isAdminByProfile) {
      console.log('Admin access granted via profile role');
      return <>{children}</>;
    }
    
    // Only redirect if both checks have completed
    if (adminCheckDone && !isUserAdmin && !isAdminByProfile) {
      console.log('Access denied: User does not have admin role', profile);
      
      // Less intrusive notification that doesn't kick you out if you're already on an admin page
      if (!location.pathname.startsWith('/admin')) {
        toast.error("You don't have permission to access this page", {
          description: "This area requires administrator privileges."
        });
        return <Navigate to="/dashboard" replace />;
      }
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
