
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface PendingVerificationContentProps {
  onResendEmail: () => void;
  isResending: boolean;
  timeLeft: number | null;
}

export function PendingVerificationContent({ 
  onResendEmail, 
  isResending, 
  timeLeft 
}: PendingVerificationContentProps) {
  return (
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
          onClick={onResendEmail} 
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
  );
}
