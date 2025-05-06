import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { ArrowLeft, AlertCircle, Home, Search } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
import { logger } from "@/utils/loggingService";
const NotFoundCard = ({
  resourceType = "Advisor",
  redirectPath = "/dashboard/ai-bots",
  redirectLabel = "Back to Advisors",
  message = "We couldn't find the executive advisor you're looking for. This may be because the advisor has been removed or the URL is incorrect.",
  autoRedirectDelay = 0, // 0 means no auto-redirect
  logError = true,
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (logError) {
      // Log the 404 error for this resource
      logger.error(
        `Resource not found: ${resourceType} at path ${window.location.pathname}`,
      );
    }
    // If autoRedirectDelay is specified, automatically redirect after the delay
    if (autoRedirectDelay > 0) {
      const timer = setTimeout(() => {
        toast.info(`Redirecting to ${redirectLabel}`);
        navigate(redirectPath);
      }, autoRedirectDelay * 1000);
      return () => clearTimeout(timer);
    }
  }, [
    navigate,
    autoRedirectDelay,
    redirectPath,
    redirectLabel,
    resourceType,
    logError,
  ]);
  return (
    <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[300px]">
      <div className="mb-4 text-destructive">
        <AlertCircle className="h-12 w-12" aria-hidden="true" />
      </div>
      <h2 className="text-xl font-semibold mb-2" id="not-found-title">
        {resourceType} not found
      </h2>
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Not Found</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>

      <div className="flex flex-col sm:flex-row gap-3 mt-2">
        <Link to={redirectPath} aria-labelledby="not-found-title">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>{redirectLabel}</span>
          </Button>
        </Link>

        <Link to="/dashboard" aria-label="Return to dashboard">
          <Button variant="secondary" className="flex items-center gap-2">
            <Home className="h-4 w-4" aria-hidden="true" />
            <span>Dashboard</span>
          </Button>
        </Link>

        <Link to="/dashboard/ai-bots" aria-label="Browse all advisors">
          <Button variant="default" className="flex items-center gap-2">
            <Search className="h-4 w-4" aria-hidden="true" />
            <span>Browse All</span>
          </Button>
        </Link>
      </div>

      {autoRedirectDelay > 0 && (
        <p className="text-sm text-muted-foreground mt-4">
          Auto-redirecting in {autoRedirectDelay} seconds...
        </p>
      )}
    </CardContent>
  );
};
export default NotFoundCard;
