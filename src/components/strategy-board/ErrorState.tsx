
import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  error: Error | null;
  onRetry: () => void;
}

export default function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 border border-destructive/20 bg-destructive/10 rounded-lg animate-fadeIn">
      <div className="bg-destructive/20 p-3 rounded-full mb-4">
        <AlertCircle className="h-8 w-8 text-destructive" />
      </div>
      
      <h3 className="text-xl font-bold mb-2">Oops! Couldn't load your strategies</h3>
      
      <p className="text-muted-foreground text-center mb-6 max-w-md">
        {error?.message || "Something went wrong while loading your strategies. Please try again."}
      </p>
      
      <Button onClick={onRetry} className="retry-button">
        <RefreshCw className="mr-2 h-4 w-4 animate-spin-once" />
        Refresh and try again
      </Button>
    </div>
  );
}
