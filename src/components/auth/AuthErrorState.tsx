
import { AlertTriangle, Loader2, RefreshCw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface AuthErrorStateProps {
  error: string;
  onRetry: () => Promise<void>;
  isRetrying: boolean;
}

export function AuthErrorState({ error, onRetry, isRetrying }: AuthErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-md w-full space-y-4">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Authentication Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <div className="flex justify-center">
          <Button 
            onClick={onRetry} 
            disabled={isRetrying}
            className="flex items-center gap-2"
          >
            {isRetrying ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Retrying...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4" />
                Retry
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
