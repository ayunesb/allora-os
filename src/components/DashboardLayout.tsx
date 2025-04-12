
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { useBreakpoint } from "@/hooks/use-mobile";
import { useDashboardNavigation } from "@/hooks/useDashboardNavigation";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import DashboardTabs from "@/components/dashboard/navigation/DashboardTabs";
import { MobileNavDrawer } from "@/components/dashboard/navigation/MobileNavDrawer";
import { UserDropdown } from "@/components/dashboard/navigation/UserDropdown";
import { SessionRefreshBar } from "@/components/dashboard/SessionRefreshBar";
import { DashboardLoadingState } from "@/components/dashboard/LoadingState";

export default function DashboardLayout() {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;
  const breakpoint = useBreakpoint();
  const isMobile = ['xs', 'mobile'].includes(breakpoint);
  
  const {
    mobileMenuOpen,
    setMobileMenuOpen,
    needsSessionRefresh,
    handleRefreshSession,
    handleSignOut,
    handleNavigateToProfile
  } = useDashboardNavigation();

  if (isLoading) {
    return <DashboardLoadingState />;
  }

  if (!user) {
    toast.error("Please log in to access this page");
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {needsSessionRefresh() && (
        <SessionRefreshBar onRefreshSession={handleRefreshSession} />
      )}
      
      <DashboardHeader />
      
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className={`container mx-auto ${isMobile ? 'px-2 py-1' : 'px-4 py-2'}`}>
          <div className="flex items-center justify-between">            
            <div className="flex items-center w-full">
              {isMobile ? (
                <div className="flex justify-between w-full items-center">
                  <MobileNavDrawer 
                    currentPath={currentPath}
                    open={mobileMenuOpen}
                    onOpenChange={setMobileMenuOpen}
                  />
                  <UserDropdown onSignOut={handleSignOut} />
                </div>
              ) : (
                <>
                  <DashboardTabs />
                  <UserDropdown onSignOut={handleSignOut} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-1">
        <main className="flex-1">
          <div className={`container mx-auto ${isMobile ? 'py-2 px-2' : 'px-4 py-4 sm:py-6 md:py-8'}`}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
