import React from "react";
import { Button } from "@/components/ui/button";
import { TrendingUp, Plus, RefreshCw, AlertCircle } from "lucide-react";
import { useBreakpoint } from "@/hooks/use-mobile";
import { Alert, AlertDescription } from "@/components/ui/alert";
const EmptyState = ({
  onCreateNew,
  isLoading = false,
  error = null,
  onRetry,
}) => {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  if (error) {
    return (
      <div className="bg-secondary/40 border border-border/50 rounded-lg p-4 sm:p-6 text-center mb-10">
        <AlertCircle className="h-10 w-10 sm:h-12 sm:w-12 text-destructive mx-auto mb-3 sm:mb-4" />
        <h3 className="text-xl font-bold mb-2">Error Loading Strategies</h3>
        <Alert variant="destructive" className="mb-4 sm:mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        {onRetry && (
          <Button
            onClick={onRetry}
            variant="outline"
            size={isMobile ? "sm" : "default"}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        )}
      </div>
    );
  }
  return (
    <div className="bg-secondary/40 border border-border/50 rounded-lg p-4 sm:p-6 text-center mb-10">
      <TrendingUp className="h-10 w-10 sm:h-12 sm:w-12 text-primary mx-auto mb-3 sm:mb-4" />
      <h3 className="text-xl font-bold mb-2">No Strategies Yet</h3>
      <p className="text-gray-300 mb-4 sm:mb-6">
        Create your first business strategy with AI assistance.
      </p>
      <Button
        onClick={onCreateNew}
        className="allora-button"
        size={isMobile ? "sm" : "default"}
        disabled={isLoading}
      >
        <Plus className="mr-2 h-4 w-4" />
        {isLoading ? "Creating..." : "Create First Strategy"}
      </Button>
    </div>
  );
};
export default EmptyState;
