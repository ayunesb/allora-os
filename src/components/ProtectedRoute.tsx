
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

  return (
    <SessionRefreshHandler user={user} refreshSession={refreshSession}>
      {(isRefreshing, handleSessionRefresh) => (
        <AuthStateHandler 
          isLoading={isLoading} 
          authError={authError} 
          onRetry={handleSessionRefresh} 
          isRetrying={isRefreshing}
        >
          <VerificationHandler user={user}>
            {(isResending, handleResendVerificationEmail) => {
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

              // Handle verification requirement
              if (requireVerified && !isEmailVerified && hasInitialized) {
                return <VerificationRequiredState 
                  onRefresh={async (): Promise<void> => {
                    await refreshSession();
                  }}
                  onResendVerification={handleResendVerificationEmail}
                  isResending={isResending}
                />;
              }

              // Handle role and admin checks
              return (
                <AdminCheckHandler 
                  user={user}
                  roleRequired={roleRequired}
                  adminOnly={adminOnly}
                  hasInitialized={hasInitialized}
                >
                  {(isUserAdmin, adminCheckDone) => {
                    // Check admin access
                    if ((adminOnly || roleRequired === 'admin') && hasInitialized) {
                      // Priority 1: Check direct database admin status
                      if (isUserAdmin) {
                        console.log('Admin access granted via direct database check');
                        return <>{children}</>;
                      }
                      
                      // Priority 2: Check profile.role (as fallback)
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
                  }}
                </AdminCheckHandler>
              );
            }}
          </VerificationHandler>
        </AuthStateHandler>
      )}
    </SessionRefreshHandler>
  );
}
