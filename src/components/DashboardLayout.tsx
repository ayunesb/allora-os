
import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw } from "lucide-react";
import { checkOnboardingStatus } from "@/utils/onboarding";

export default function DashboardLayout() {
  const { user, isLoading, profile, refreshSession } = useAuth();
  const navigate = useNavigate();

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
        <Navbar isLoggedIn={true} />
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

  // Render child routes with consistent layout
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={true} />
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
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 pl-64">
          <div className="container mx-auto px-4 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
