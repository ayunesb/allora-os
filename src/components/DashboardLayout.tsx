
import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLayout() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check for onboarding status
    if (user && !isLoading) {
      // In a real app, we would check if the user has completed onboarding
      // by checking a field in their profile
      const hasCompletedOnboarding = true; // This would be determined from user profile
      
      if (!hasCompletedOnboarding) {
        toast.info("Please complete onboarding first");
        navigate("/onboarding");
      }
    }
  }, [user, isLoading, navigate]);

  // If still loading, show skeleton UI
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar isLoggedIn={true} />
        <div className="flex-1 container mx-auto px-4 py-24">
          <Skeleton className="h-12 w-[250px] mb-6" />
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

  // Render child routes with consistent layout
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={true} />
      <Outlet />
    </div>
  );
}
