
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Show a toast notification
    toast.error("Page not found. Redirecting to a valid page.", {
      duration: 3000,
    });
    
    // If the path includes admin, redirect to admin dashboard
    const isAdminRoute = location.pathname.includes('/admin');
    
    // Set a timer to redirect the user to a valid page after 3 seconds
    const timer = setTimeout(() => {
      if (isAdminRoute) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [location.pathname, navigate]);

  // Determine the return link based on the current path
  const getReturnLink = () => {
    if (location.pathname.includes('/admin')) {
      return "/admin";
    }
    return "/";
  };

  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-background">
      <Navbar isLoggedIn={false} />
      
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-muted flex items-center justify-center">
              <AlertTriangle className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground" />
            </div>
          </div>
          
          <h1 className="text-5xl sm:text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Unexpected Application Error!</h2>
          <p className="text-muted-foreground mb-8 text-sm sm:text-base">
            The page you are looking for might have been removed, had its name changed,
            or is temporarily unavailable.
          </p>
          
          <Button asChild size="lg" className="animate-pulse transition-all hover:shadow-lg">
            <Link to={getReturnLink()} className="flex items-center">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Return to {location.pathname.includes('/admin') ? 'Admin Dashboard' : 'Home'}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
