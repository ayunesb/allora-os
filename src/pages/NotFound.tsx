
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertTriangle, Home, ArrowRight } from "lucide-react";

export default function NotFound() {
  const location = useLocation();
  const navigate = useNavigate();
  const [suggestedPath, setSuggestedPath] = useState<string | null>(null);
  
  useEffect(() => {
    // Determine a suggested path based on the current URL segment
    const currentPath = location.pathname;
    
    if (currentPath.includes('/admin')) {
      setSuggestedPath('/admin');
    } else if (currentPath.includes('/dashboard')) {
      setSuggestedPath('/dashboard');
    } else if (currentPath.includes('/onboarding')) {
      setSuggestedPath('/onboarding');
    } else if (currentPath.includes('/compliance')) {
      setSuggestedPath('/compliance');
    } else {
      setSuggestedPath('/');
    }
  }, [location]);
  
  const goBack = () => {
    navigate(-1);
  };

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
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
          <Button variant="outline" onClick={goBack} className="w-full sm:w-auto">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go Back
          </Button>
          
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link to="/" className="flex items-center">
              <Home className="mr-2 h-5 w-5" />
              Return to Home
            </Link>
          </Button>
          
          {suggestedPath && suggestedPath !== '/' && (
            <Button asChild variant="secondary" className="w-full sm:w-auto mt-3 sm:mt-0">
              <Link to={suggestedPath} className="flex items-center">
                Go to {suggestedPath.replace('/', '').charAt(0).toUpperCase() + suggestedPath.replace('/', '').slice(1)}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
