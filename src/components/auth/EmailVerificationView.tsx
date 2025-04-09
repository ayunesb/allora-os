
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { resendVerificationEmail } from "@/utils/authHelpers";
import { toast } from "sonner";
import { supabase } from "@/backend/supabase";
import { VerificationHeader } from "./verification/VerificationHeader";
import { PendingVerificationContent } from "./verification/PendingVerificationContent";
import { VerificationStatusContent } from "./verification/VerificationStatusContent";

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
        <VerificationHeader 
          verificationStatus={verificationStatus} 
          email={email} 
        />
      </CardHeader>
      <CardContent className="space-y-4">
        {verificationStatus === "pending" ? (
          <PendingVerificationContent 
            onResendEmail={handleResendEmail}
            isResending={isResending}
            timeLeft={timeLeft}
          />
        ) : (
          <VerificationStatusContent status={verificationStatus} />
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
