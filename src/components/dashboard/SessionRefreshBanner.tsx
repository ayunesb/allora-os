
import React, { useState, useEffect } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

interface SessionRefreshBannerProps {
  threshold?: number; // Time in minutes before showing the banner
}

export const SessionRefreshBanner: React.FC<SessionRefreshBannerProps> = ({
  threshold = 45, // Default to 45 minutes
}) => {
  const [showBanner, setShowBanner] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { user, refreshSession } = useAuth();
  
  useEffect(() => {
    // Check if session needs refreshing
    const checkSessionAge = () => {
      if (!user?.updated_at) return;
      
      const sessionUpdateTime = new Date(user.updated_at).getTime();
      const thresholdMs = threshold * 60 * 1000; // Convert minutes to ms
      const now = Date.now();
      
      setShowBanner(now - sessionUpdateTime > thresholdMs);
    };
    
    checkSessionAge();
    
    // Check every 5 minutes
    const interval = setInterval(checkSessionAge, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [user, threshold]);
  
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refreshSession();
      setShowBanner(false);
      toast.success('Session refreshed successfully');
    } catch (error) {
      console.error('Failed to refresh session:', error);
      toast.error('Failed to refresh session');
    } finally {
      setIsRefreshing(false);
    }
  };
  
  if (!showBanner) return null;
  
  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm p-4 bg-muted/80 backdrop-blur rounded-lg shadow-lg border border-muted-foreground/20">
      <div className="flex items-start space-x-3">
        <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="font-medium text-sm">Session expiring soon</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Your session will expire soon. Refresh to stay logged in.
          </p>
          <Button 
            onClick={handleRefresh} 
            size="sm" 
            className="mt-2 h-8"
            disabled={isRefreshing}
          >
            {isRefreshing ? (
              <>
                <RefreshCw className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                Refreshing...
              </>
            ) : (
              'Refresh Session'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
