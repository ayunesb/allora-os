
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertTriangle, Home, ArrowRight } from "lucide-react";

export default function NotFound() {
  const location = useLocation();
  const navigate = useNavigate();
  const [suggestedPath, setSuggestedPath] = useState<string | null>(null);
  
  useEffect(() => {
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
      <div className="max-w-md w-full text-center bg-black/30 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl">
        <div className="flex justify-center mb-6">
          <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
            <AlertTriangle className="h-12 w-12 text-primary" />
          </div>
        </div>
        
        <h1 className="text-6xl font-bold text-primary mb-4 animate-pulse">404</h1>
        <h2 className="text-2xl font-semibold mb-4 text-white">Page Not Found</h2>
        <p className="text-gray-300 mb-8 text-base">
          The page you are looking for might have been removed, 
          had its name changed, or is temporarily unavailable.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button 
            variant="outline" 
            onClick={goBack} 
            className="w-full sm:w-auto text-white border-white/20 hover:bg-white/10"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go Back
          </Button>
          
          <Button 
            asChild 
            size="lg" 
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white"
          >
            <Link to="/" className="flex items-center">
              <Home className="mr-2 h-5 w-5" />
              Return to Home
            </Link>
          </Button>
          
          {suggestedPath && suggestedPath !== '/' && (
            <Button 
              asChild 
              variant="secondary" 
              className="w-full sm:w-auto mt-3 sm:mt-0 bg-white/10 text-white hover:bg-white/20"
            >
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
