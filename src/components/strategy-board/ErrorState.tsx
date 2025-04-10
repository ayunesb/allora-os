
import React from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  error: Error | unknown;
  onRetry: () => void;
}

export default function ErrorState({ error, onRetry }: ErrorStateProps) {
  const errorMessage = error instanceof Error ? error.message : "Failed to load strategies";
  
  return (
    <div className="bg-black/30 backdrop-blur-md border border-red-900/30 rounded-lg p-8 sm:p-12 text-center my-8 animate-fadeIn shadow-xl">
      <div className="bg-red-900/20 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
        <AlertCircle className="h-8 w-8 text-red-400" />
      </div>
      
      <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-white">
        Oops! Couldn't load your strategies
      </h3>
      
      <p className="text-red-300 border border-red-500/20 bg-red-500/10 p-3 rounded-md mb-6 max-w-md mx-auto">
        {errorMessage}
      </p>
      
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        We encountered an error while loading your strategic plans. Please try again or contact support if the issue persists.
      </p>
      
      <Button 
        onClick={onRetry}
        variant="outline"
        size="lg"
        className="bg-black/50 border-white/20 hover:bg-white/10 transition-all duration-300"
      >
        <RefreshCw className="mr-2 h-5 w-5 animate-spin-once" />
        Retry
      </Button>
    </div>
  );
}
