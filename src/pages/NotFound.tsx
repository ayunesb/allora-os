
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertTriangle, Home, ArrowRight, RefreshCw, Search } from "lucide-react";
import { logger } from "@/utils/loggingService";
import { normalizeRoute } from "@/utils/navigation";
import { useAuth } from "@/context/AuthContext";

export default function NotFound() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [suggestedPath, setSuggestedPath] = useState<string | null>(null);
  const [alternativeRoutes, setAlternativeRoutes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const attemptedPath = location.state?.attemptedPath || location.pathname;
  
  useEffect(() => {
    const currentPath = attemptedPath;
    logger.info(`404 Page: Current path is ${currentPath}`);
    
    // Try to normalize the route - maybe it's just a casing issue or a common typo
    const normalizedPath = normalizeRoute(currentPath);
    
    // If the normalized path is different, we could suggest it
    if (normalizedPath !== currentPath) {
      setSuggestedPath(normalizedPath);
    } else {
      // Add better suggestions based on path prefix
      if (currentPath.includes('/admin')) {
        setSuggestedPath('/admin');
        
        // Add specific admin route suggestions
        if (currentPath.includes('/user')) {
          setAlternativeRoutes(['/admin/entities?tab=users']);
        } else if (currentPath.includes('/compan')) {
          setAlternativeRoutes(['/admin/entities?tab=companies']);
        } else if (currentPath.includes('/campaign')) {
          setAlternativeRoutes(['/admin/campaigns']);
        } else if (currentPath.includes('/lead')) {
          setAlternativeRoutes(['/admin/leads']);
        } else if (currentPath.includes('/analytic')) {
          setAlternativeRoutes(['/admin/analytics']);
        } else if (currentPath.includes('/setting')) {
          setAlternativeRoutes(['/admin/settings']);
        } else if (currentPath.includes('/launch')) {
          setAlternativeRoutes(['/admin/launch-prep']);
        } else if (currentPath.includes('/ai-bot')) {
          setAlternativeRoutes(['/admin/ai-bot-logic']);
        } else if (currentPath.includes('/system') || currentPath.includes('/diagnos')) {
          setAlternativeRoutes(['/admin/system-health', '/admin/diagnostics']);
        } else if (currentPath.includes('/platform')) {
          setAlternativeRoutes(['/admin/platform-stability']);
        } else if (currentPath.includes('/onboard')) {
          setAlternativeRoutes(['/admin/user-onboarding']);
        } else if (currentPath.includes('/dashboard-mod')) {
          setAlternativeRoutes(['/admin/dashboard-modules']);
        } else if (currentPath.includes('/communication')) {
          setAlternativeRoutes(['/admin/communication-tools']);
        } else if (currentPath.includes('/webhook')) {
          setAlternativeRoutes(['/admin/webhooks']);
        } else {
          setAlternativeRoutes([
            '/admin',
            '/admin/entities',
            '/admin/campaigns',
            '/admin/system-health',
            '/admin/diagnostics',
            '/admin/webhooks'
          ]);
        }
      } else if (currentPath.includes('/dashboard')) {
        setSuggestedPath('/dashboard');
        
        // Specific dashboard route suggestions
        if (currentPath.includes('/strategy')) {
          setAlternativeRoutes(['/dashboard/strategies']);
        } else if (currentPath.includes('/settings') || currentPath.includes('/account')) {
          setAlternativeRoutes(['/dashboard/profile', '/dashboard/settings']);
        } else {
          setAlternativeRoutes([
            '/dashboard/strategies',
            '/dashboard/leads',
            '/dashboard/campaigns',
            '/dashboard/ai-bots'
          ]);
        }
      } else if (currentPath.includes('/onboarding')) {
        setSuggestedPath('/onboarding');
        setAlternativeRoutes(['/onboarding/company-info', '/onboarding/industry', '/onboarding/goals']);
      } else if (currentPath.includes('/compliance')) {
        setSuggestedPath('/compliance');
        setAlternativeRoutes(['/compliance/overview', '/compliance/audit-logs', '/compliance/data-policies']);
      } else if (currentPath.includes('/login') || currentPath.includes('/signin')) {
        setSuggestedPath('/login');
      } else if (currentPath.includes('/signup') || currentPath.includes('/register')) {
        setSuggestedPath('/signup');
      } else {
        setSuggestedPath('/');
        setAlternativeRoutes(isAuthenticated ? 
          ['/dashboard', '/dashboard/strategies', '/dashboard/leads'] : 
          ['/login', '/signup', '/home', '/pricing']);
      }
    }
    
    // Log 404 for analytics
    logger.error(`404 Error: No route found for ${currentPath}`, {
      path: currentPath,
      referrer: document.referrer,
      timestamp: new Date().toISOString()
    });
    
  }, [attemptedPath, isAuthenticated]);
  
  const goBack = () => {
    navigate(-1);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // For a real app, this would navigate to a search results page
      // Here we'll just redirect to the most likely area based on the search term
      if (searchQuery.toLowerCase().includes('admin') || searchQuery.toLowerCase().includes('system')) {
        navigate('/admin');
      } else if (searchQuery.toLowerCase().includes('dashboard') || 
                searchQuery.toLowerCase().includes('strategy') || 
                searchQuery.toLowerCase().includes('lead')) {
        navigate('/dashboard');
      } else if (searchQuery.toLowerCase().includes('compliance')) {
        navigate('/compliance');
      } else {
        navigate('/');
      }
    }
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
        <p className="text-gray-300 mb-4 text-base">
          The page you are looking for might have been removed, 
          had its name changed, or is temporarily unavailable.
        </p>
        
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex w-full">
            <input
              type="text"
              placeholder="Search for pages..."
              className="flex-1 py-2 px-3 rounded-l-lg bg-white/10 border border-white/20 text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit" 
              className="bg-primary p-2 rounded-r-lg flex items-center justify-center"
            >
              <Search className="h-5 w-5 text-white" />
            </button>
          </div>
        </form>
        
        {alternativeRoutes.length > 0 && (
          <div className="mb-6 bg-white/5 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-white mb-2">Did you mean to visit:</h3>
            <div className="flex flex-col space-y-2">
              {alternativeRoutes.map(route => (
                <Button 
                  key={route}
                  variant="outline" 
                  asChild
                  className="w-full justify-between border-white/10 hover:bg-white/10"
                >
                  <Link to={route}>
                    {route}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        )}
        
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
            <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center">
              <Home className="mr-2 h-5 w-5" />
              {isAuthenticated ? "Dashboard" : "Home"}
            </Link>
          </Button>
          
          <Button
            variant="outline"
            className="w-full sm:w-auto text-white border-white/20 hover:bg-white/10"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="mr-2 h-5 w-5" />
            Refresh
          </Button>
        </div>
        
        {suggestedPath && suggestedPath !== '/' && (
          <Button 
            asChild 
            variant="secondary" 
            className="w-full mt-5 bg-white/10 text-white hover:bg-white/20"
          >
            <Link to={suggestedPath} className="flex items-center">
              Go to {suggestedPath.replace('/', '').charAt(0).toUpperCase() + suggestedPath.replace('/', '').slice(1)}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
