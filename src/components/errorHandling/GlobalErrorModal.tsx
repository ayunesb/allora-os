import React, { useEffect, useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { errorEventBus } from "@/utils/errorHandling/errorEventBus";
export function GlobalErrorModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    // Subscribe to global errors
    const handleError = (appError) => {
      // Only show the modal for critical errors
      if (appError.isCritical) {
        setError(appError);
        setIsOpen(true);
      }
    };
    errorEventBus.subscribe(handleError);
    return () => {
      errorEventBus.unsubscribe(handleError);
    };
  }, []);
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleRefresh = () => {
    window.location.reload();
  };
  if (!error) return null;
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-destructive mr-2" />
            <DialogTitle>Application Error</DialogTitle>
          </div>
          <DialogDescription>
            We've encountered an unexpected error. Our team has been notified.
          </DialogDescription>
        </DialogHeader>

        <div className="bg-muted p-3 rounded-md overflow-auto max-h-40 text-xs">
          <p className="font-mono">{error.message}</p>
          {error.code && (
            <p className="font-mono mt-1">Error code: {error.code}</p>
          )}
        </div>

        <DialogFooter className="flex justify-between items-center">
          <Button variant="outline" onClick={handleClose}>
            <X className="h-4 w-4 mr-2" />
            Close
          </Button>
          <Button onClick={handleRefresh}>Refresh Application</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
