
import { AlertCircle, Loader2, RefreshCw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface VerificationRequiredStateProps {
  onRefresh: () => Promise<void>;
  onResendVerification: () => Promise<void>;
  isResending: boolean;
}

export function VerificationRequiredState({ 
  onRefresh, 
  onResendVerification, 
  isResending 
}: VerificationRequiredStateProps) {
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
              await onRefresh();
              toast.info("Session refreshed. If you've verified your email, try again.");
            }}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            I've verified my email
          </Button>
          <Button 
            onClick={onResendVerification}
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
