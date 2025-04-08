
import { ReactNode, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { resendVerificationEmail } from "@/utils/authHelpers";

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
  const [isResending, setIsResending] = useState(false);

  const handleResendVerificationEmail = async () => {
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

  // If still loading, show loading spinner
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading your account information...</p>
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
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              I've verified my email
            </Button>
            <Button 
              onClick={handleResendVerificationEmail}
              disabled={isResending}
              className="flex items-center gap-2"
            >
              {isResending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4" />
                  Resend verification email
                </>
              )}
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
