
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; 
import { RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export function SessionRefreshBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { refreshSession } = useAuth();

  // Check for connection issues on component mount
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (!data.session) {
          setIsVisible(true);
        }
      } catch (error) {
        console.error("Error checking session:", error);
        setIsVisible(true);
      }
    };

    checkConnection();
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const success = await refreshSession();
      if (success) {
        toast.success("Session refreshed successfully");
        setIsVisible(false);
      } else {
        toast.error("Unable to refresh session");
      }
    } catch (error) {
      console.error("Error refreshing session:", error);
      toast.error("Error refreshing session");
    } finally {
      setIsRefreshing(false);
    }
  };

  if (!isVisible) return null;

  return (
    <Alert variant="destructive" className="mb-4 animate-fadeIn">
      <AlertTitle className="flex items-center gap-2">
        <RefreshCw className="h-4 w-4" /> Connection Issue Detected
      </AlertTitle>
      <AlertDescription className="flex justify-between items-center mt-2">
        <span>There might be an issue with your connection to our servers.</span>
        <Button 
          size="sm" 
          onClick={handleRefresh} 
          disabled={isRefreshing}
          className="ml-2"
        >
          {isRefreshing ? "Refreshing..." : "Refresh Connection"}
        </Button>
      </AlertDescription>
    </Alert>
  );
}
