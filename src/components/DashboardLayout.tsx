
import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { MobileSidebar } from '@/components/dashboard/MobileSidebar';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Loading } from '@/components/ui/loading';
import { normalizeUserObject } from '@/utils/authCompatibility';
import { createAuthCompatibilityLayer } from '@/utils/authCompatibility';

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const authContext = useAuth();
  const auth = createAuthCompatibilityLayer(authContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const normalizedUser = normalizeUserObject(auth?.user);
  const isLoading = auth?.isLoading || auth?.loading;

  useEffect(() => {
    // Close sidebar when route changes
    setSidebarOpen(false);
  }, [location.pathname]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !auth?.user) {
      navigate('/auth', { state: { from: location.pathname } });
    }
  }, [auth?.user, isLoading, navigate, location.pathname]);

  // Check for admin routes and redirect if not admin
  useEffect(() => {
    if (
      !isLoading && 
      auth?.user && 
      location.pathname.startsWith('/admin') && 
      normalizedUser?.role !== 'admin' && 
      !normalizedUser?.app_metadata?.is_admin
    ) {
      navigate('/dashboard', { replace: true });
    }
  }, [auth?.user, isLoading, navigate, location.pathname, normalizedUser]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading size="lg" text="Loading dashboard..." />
      </div>
    );
  }

  if (!auth?.user) {
    return null; // Will redirect to login via useEffect
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar - always visible on larger screens */}
      <div className="hidden md:flex">
        <Sidebar className="w-64 border-r min-h-screen" />
      </div>

      {/* Mobile sidebar - hidden by default */}
      <div className="md:hidden">
        <MobileSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <div className="flex-1">
        {/* Mobile header with menu button */}
        <div className="md:hidden flex items-center p-4 border-b">
          <Button 
            variant="outline" 
            size="icon" 
            className="mr-4" 
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <h1 className="font-semibold">Dashboard</h1>
        </div>

        {/* Main content area */}
        <main className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
