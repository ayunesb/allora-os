
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type ProtectedRouteProps = {
  children: ReactNode;
  roleRequired?: 'admin' | 'user';
  requireVerified?: boolean;
};

export default function ProtectedRoute({ 
  children, 
  roleRequired,
  requireVerified = false 
}: ProtectedRouteProps) {
  const { user, isLoading, profile, isEmailVerified, refreshSession } = useAuth();
  const location = useLocation();

  // If still loading, show loading spinner
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  // If not logged in, redirect to login
  if (!user) {
    toast.error("Please log in to access this page");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If email verification is required but email not verified
  if (requireVerified && !isEmailVerified) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="max-w-md w-full space-y-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Email verification required</AlertTitle>
            <AlertDescription>
              Please verify your email address before accessing this page.
              Check your inbox for a verification email.
            </AlertDescription>
          </Alert>
          <div className="flex flex-col gap-2">
            <Button 
              onClick={async () => {
                await refreshSession();
                toast.info("Session refreshed. If you've verified your email, try again.");
              }}
              variant="outline"
            >
              I've verified my email
            </Button>
            <Button 
              onClick={() => {
                // This could be expanded to resend verification email
                toast.info("Please check your email for verification link");
              }}
            >
              Resend verification email
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // If role is required but user doesn't have it
  if (roleRequired && profile) {
    const hasRequiredRole = profile.role === roleRequired || 
                           (roleRequired === 'user' && profile.role === 'admin');
    
    if (!hasRequiredRole) {
      toast.error("You don't have permission to access this page");
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
}
