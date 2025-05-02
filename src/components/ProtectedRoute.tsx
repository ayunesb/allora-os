
import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

// Loading state component
const AuthLoadingState = () => (
  <div className="flex flex-col items-center justify-center min-h-screen p-4">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
    <p className="text-lg text-center text-muted-foreground">Verifying your access...</p>
  </div>
);

// Auth error state component
const AuthErrorState = ({ 
  error, 
  onRetry,
  isRetrying 
}: { 
  error: string; 
  onRetry: () => void;
  isRetrying: boolean;
}) => (
  <div className="flex flex-col items-center justify-center min-h-screen p-4">
    <div className="p-6 bg-destructive/10 rounded-lg max-w-md">
      <h2 className="text-xl font-bold mb-4 text-destructive">Authentication Error</h2>
      <p className="mb-4">{error}</p>
      <button 
        onClick={onRetry} 
        disabled={isRetrying}
        className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors"
      >
        {isRetrying ? 'Retrying...' : 'Retry'}
      </button>
    </div>
  </div>
);

// Verification required state component
const VerificationRequiredState = ({
  onRefresh,
  onResendVerification,
  isResending
}: {
  onRefresh: () => void;
  onResendVerification: () => void;
  isResending: boolean;
}) => (
  <div className="flex flex-col items-center justify-center min-h-screen p-4">
    <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg max-w-md">
      <h2 className="text-xl font-bold mb-4 text-yellow-700 dark:text-yellow-400">Email Verification Required</h2>
      <p className="mb-4">Please verify your email address before continuing.</p>
      <div className="flex flex-col sm:flex-row gap-3">
        <button 
          onClick={onRefresh} 
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors"
        >
          I've Verified My Email
        </button>
        <button 
          onClick={onResendVerification}
          disabled={isResending}
          className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          {isResending ? 'Sending...' : 'Resend Verification Email'}
        </button>
      </div>
    </div>
  </div>
);

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
  const auth = useAuth();
  const location = useLocation();
  const [isVerifying, setIsVerifying] = useState(true);
  const [lastVerified, setLastVerified] = useState<number>(Date.now());

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
  }, [location.pathname, auth.user, adminOnly, roleRequired, requireVerified, auth.refreshSession, lastVerified]);

  // Handle loading state
  if (auth.isLoading || auth.loading || isVerifying) {
    return <AuthLoadingState />;
  }

  // Handle expired session
  if (auth.isSessionExpired) {
    return <Navigate to="/login" state={{ from: location, expired: true }} replace />;
  }

  // Handle unauthenticated users
  if (!auth.user && auth.hasInitialized) {
    toast.error("Please log in to access this page", {
      description: "This page requires authentication."
    });
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Handle auth errors
  if (auth.authError) {
    return <AuthErrorState 
      error={auth.authError} 
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
    return <VerificationRequiredState 
      onRefresh={async () => {
        if (auth.refreshSession) {
          await auth.refreshSession();
        }
      }}
      onResendVerification={async () => {
        // Implement resend verification logic here
      }}
      isResending={false}
    />;
  }

  // Handle admin access check
  if ((adminOnly || roleRequired === 'admin') && auth.hasInitialized) {
    const isAdmin = auth.profile?.role === 'admin' || 
                  (auth.user?.app_metadata && auth.user.app_metadata.is_admin);
    
    if (!isAdmin) {
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
      toast.error("You don't have permission to access this page", {
        description: `You need ${roleRequired} privileges to access this area.`
      });
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
}
