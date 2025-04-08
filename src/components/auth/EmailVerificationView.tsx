
import { useState, useEffect } from "react";
import { RocketIcon, AlertCircle, RefreshCw, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";
import { resendVerificationEmail } from "@/utils/authHelpers";
import { toast } from "sonner";
import { supabase } from "@/backend/supabase";

interface EmailVerificationViewProps {
  email: string;
  onTryAgain: () => void;
}

export default function EmailVerificationView({ email, onTryAgain }: EmailVerificationViewProps) {
  const navigate = useNavigate();
  const [isResending, setIsResending] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<"pending" | "verified" | "failed">("pending");
  const [lastResent, setLastResent] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  // Check verification status on load and when email changes
  useEffect(() => {
    if (!email) return;
    
    const checkVerificationStatus = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        if (data.user?.email_confirmed_at) {
          setVerificationStatus("verified");
          toast.success("Email verified successfully!");
          // Redirect to dashboard after 2 seconds
          setTimeout(() => navigate("/dashboard"), 2000);
        }
      } catch (error) {
        console.error("Error checking verification status:", error);
      }
    };

    checkVerificationStatus();
    
    // Set up interval to check verification status every 10 seconds
    const intervalId = setInterval(checkVerificationStatus, 10000);
    
    return () => clearInterval(intervalId);
  }, [email, navigate]);

  // Handle countdown timer for resend
  useEffect(() => {
    if (!lastResent) return;
    
    const calculateTimeLeft = () => {
      const now = new Date();
      const diff = 60 - Math.floor((now.getTime() - lastResent.getTime()) / 1000);
      
      if (diff <= 0) {
        setTimeLeft(null);
        return;
      }
      
      setTimeLeft(diff);
    };
    
    calculateTimeLeft();
    const timerId = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timerId);
  }, [lastResent]);

  const handleResendEmail = async () => {
    if (!email) {
      toast.error("Email address is missing. Please try again.");
      return;
    }

    if (timeLeft && timeLeft > 0) {
      toast.info(`Please wait ${timeLeft} seconds before requesting another email`);
      return;
    }

    setIsResending(true);
    
    try {
      const result = await resendVerificationEmail(email);
      
      if (result.success) {
        setLastResent(new Date());
        toast.success("Verification email resent successfully!");
      } else {
        toast.error(result.error || "Failed to resend verification email");
      }
    } catch (error) {
      console.error("Resend verification error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
          {verificationStatus === "verified" ? (
            <CheckCircle className="h-8 w-8 text-green-500" />
          ) : verificationStatus === "failed" ? (
            <XCircle className="h-8 w-8 text-destructive" />
          ) : (
            <RocketIcon className="h-8 w-8 text-primary" />
          )}
        </div>
        <CardTitle className="text-2xl">
          {verificationStatus === "verified" 
            ? "Email Verified!" 
            : verificationStatus === "failed" 
              ? "Verification Failed" 
              : "Verify Your Email"}
        </CardTitle>
        <CardDescription>
          {verificationStatus === "verified" 
            ? "You'll be redirected to the dashboard shortly" 
            : verificationStatus === "failed" 
              ? "There was a problem verifying your email" 
              : `We've sent a verification email to ${email}`}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {verificationStatus === "pending" && (
          <>
            <Alert className="bg-muted">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Check your email</AlertTitle>
              <AlertDescription>
                Please check your email inbox and click the verification link to complete your registration.
              </AlertDescription>
            </Alert>
            <p className="text-sm text-muted-foreground text-center">
              If you don't see the email, check your spam folder or try logging in anyway - email verification may be disabled in development.
            </p>
            <div className="flex justify-center">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleResendEmail} 
                disabled={isResending || (timeLeft !== null && timeLeft > 0)}
                className="flex items-center gap-1"
              >
                {isResending ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : timeLeft !== null && timeLeft > 0 ? (
                  <>
                    <RefreshCw className="h-4 w-4" />
                    Resend in {timeLeft}s
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4" />
                    Resend verification email
                  </>
                )}
              </Button>
            </div>
          </>
        )}
        
        {verificationStatus === "verified" && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <AlertTitle className="text-green-700">Success!</AlertTitle>
            <AlertDescription className="text-green-600">
              Your email has been verified. You'll be redirected to the dashboard.
            </AlertDescription>
          </Alert>
        )}
        
        {verificationStatus === "failed" && (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertTitle>Verification Failed</AlertTitle>
            <AlertDescription>
              There was a problem verifying your email. Please try again or contact support.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="flex justify-center gap-4">
        {verificationStatus !== "verified" && (
          <>
            <Button variant="outline" onClick={() => navigate("/login")}>
              Go to Login
            </Button>
            <Button onClick={onTryAgain}>
              Try Again
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
