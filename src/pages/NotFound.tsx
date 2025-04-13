
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-muted flex items-center justify-center">
            <AlertTriangle className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground" />
          </div>
        </div>
        
        <h1 className="text-5xl sm:text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8 text-sm sm:text-base">
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </p>
        
        <Button asChild size="lg" className="animate-pulse transition-all hover:shadow-lg">
          <Link to="/" className="flex items-center">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
