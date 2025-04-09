
import { useEffect } from "react";
import { Navigate, Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import Sidebar from "@/components/Sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw } from "lucide-react";
import { checkOnboardingStatus } from "@/utils/onboarding";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DashboardLayout() {
  const { user, isLoading, profile, refreshSession } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  // Define the main navigation items
  const navItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Strategies", path: "/dashboard/strategies" },
    { label: "Campaigns", path: "/dashboard/campaigns" },
    { label: "Calls", path: "/dashboard/calls" },
    { label: "Leads", path: "/dashboard/leads" },
    { label: "AI Bots", path: "/dashboard/ai-bots" },
    { label: "Settings", path: "/dashboard/settings" },
  ];

  useEffect(() => {
    // Check for onboarding status
    const checkUserOnboarding = async () => {
      if (user && !isLoading) {
        // First check using the helper function for a more reliable check
        const hasCompletedOnboarding = await checkOnboardingStatus(user.id);
        
        if (!hasCompletedOnboarding) {
          toast.info("Please complete onboarding first");
          navigate("/onboarding");
        }
      }
    };
    
    checkUserOnboarding();
  }, [user, isLoading, profile, navigate]);

  // Handle session refresh
  const handleRefreshSession = async () => {
    toast.info("Refreshing session...");
    await refreshSession();
    toast.success("Session refreshed");
  };

  // If still loading, show skeleton UI
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 container mx-auto px-4 py-24">
          <div className="flex justify-between items-center mb-6">
            <Skeleton className="h-12 w-[250px]" />
            <Skeleton className="h-10 w-32" />
          </div>
          <Skeleton className="h-4 w-full max-w-md mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-[200px] rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // If not logged in, redirect to login
  if (!user) {
    toast.error("Please log in to access this page");
    return <Navigate to="/login" replace />;
  }

  // Session time check
  const sessionTime = user.updated_at ? new Date(user.updated_at).getTime() : 0;
  const thirtyMinutesAgo = Date.now() - 30 * 60 * 1000;
  const showRefreshButton = sessionTime < thirtyMinutesAgo;
  
  // Determine active tab
  const getActiveValue = () => {
    if (currentPath === '/dashboard') return '/dashboard';
    
    // Match the most specific path
    for (const item of navItems) {
      if (currentPath.startsWith(item.path) && item.path !== '/dashboard') {
        return item.path;
      }
    }
    
    return '/dashboard';
  };

  // Render child routes with consistent layout
  return (
    <div className="min-h-screen flex flex-col">
      {showRefreshButton && (
        <div className="bg-muted py-2 px-4 border-b">
          <div className="container mx-auto flex justify-end">
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={handleRefreshSession}
              className="text-xs flex items-center gap-1"
            >
              <RefreshCw className="h-3 w-3" /> Refresh Session
            </Button>
          </div>
        </div>
      )}
      
      {/* Top Navigation Tabs */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold">Allora AI</h1>
            </div>
            <Tabs defaultValue={getActiveValue()} className="w-auto" value={getActiveValue()}>
              <TabsList className="bg-transparent">
                {navItems.map((item) => (
                  <TabsTrigger 
                    key={item.path} 
                    value={item.path}
                    className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                    asChild
                  >
                    <Link to={item.path}>{item.label}</Link>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>
      
      <div className="flex flex-1">
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
