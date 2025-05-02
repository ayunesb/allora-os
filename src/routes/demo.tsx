
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { isDemoTenant } from '@/utils/isDemoTenant';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useCompanyId } from '@/hooks/useCompanyId';

export default function DemoRoute() {
  const { user } = useAuth();
  const tenantId = useCompanyId();
  const [isDemo, setIsDemo] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkDemoStatus = async () => {
      if (tenantId) {
        const demo = await isDemoTenant(tenantId);
        setIsDemo(demo);
      } else {
        setIsDemo(false);
      }
      setIsLoading(false);
    };

    checkDemoStatus();
  }, [tenantId]);

  // While checking demo status
  if (isLoading) {
    return (
      <div className="container mx-auto p-6 flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If not in demo mode, redirect to dashboard
  if (isDemo === false) {
    return <Navigate to="/dashboard" replace />;
  }

  const demoExpirationTime = 24; // hours

  return (
    <div className="min-h-screen flex flex-col">
      <Alert className="rounded-none border-t-0 border-x-0 bg-amber-50 dark:bg-amber-900/20">
        <AlertTitle className="flex items-center justify-between">
          <span>Demo Mode</span>
          <Button 
            onClick={() => navigate('/dashboard')} 
            variant="secondary" 
            size="sm"
            className="bg-amber-100 hover:bg-amber-200 dark:bg-amber-800 dark:hover:bg-amber-700"
          >
            Exit Demo
          </Button>
        </AlertTitle>
        <AlertDescription>
          You're viewing a read-only demo environment. All changes will be automatically reset after {demoExpirationTime} hours.
        </AlertDescription>
      </Alert>
      
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
