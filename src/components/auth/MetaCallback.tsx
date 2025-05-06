import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { RefreshCcw } from "lucide-react";
export default function MetaCallback() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const handleCallback = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get("code");
        const errorParam = searchParams.get("error");
        if (errorParam) {
          setError(`Meta authorization error: ${errorParam}`);
          setIsLoading(false);
          return;
        }
        if (!code) {
          setError("No authorization code provided");
          setIsLoading(false);
          return;
        }
        // Call the edge function to exchange the code for a token
        const response = await fetch(
          `/functions/v1/meta-auth?action=callback&code=${code}`,
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Failed to authenticate with Meta");
        }
        if (data.success) {
          toast.success("Meta account connected successfully!");
          navigate("/dashboard/ad-accounts?platform=meta&success=true");
        } else {
          throw new Error(data.error || "Failed to connect Meta account");
        }
      } catch (error) {
        console.error("Meta callback error:", error);
        setError(
          error.message || "An error occurred during Meta authentication",
        );
        toast.error("Failed to connect Meta account");
      } finally {
        setIsLoading(false);
      }
    };
    handleCallback();
  }, [location, navigate]);
  const handleRetry = () => {
    window.location.href = "/dashboard/ad-accounts";
  };
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCcw className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Connecting to Meta...</h1>
          <p className="text-muted-foreground">
            Please wait while we authenticate your account.
          </p>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Authentication Error</h1>
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={handleRetry}>Try Again</Button>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <RefreshCcw className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Redirecting...</h1>
        <p className="text-muted-foreground">
          You will be redirected to the dashboard shortly.
        </p>
      </div>
    </div>
  );
}
