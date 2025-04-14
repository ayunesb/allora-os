
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { logger } from "@/utils/loggingService";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { profile, isLoading, user } = useAuth();
  const location = useLocation();
  const [isVerifyingAdmin, setIsVerifyingAdmin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Define refreshSession function locally if not available from useAuth
  const refreshSession = async () => {
    try {
      const { data, error } = await supabase.auth.refreshSession();
      
      if (error) {
        logger.error("Error refreshing session:", error);
        return false;
      }
      
      return !!data.session;
    } catch (error) {
      logger.error("Session refresh error:", error);
      return false;
    }
  };

  useEffect(() => {
    const verifyAdminStatus = async () => {
      setIsVerifyingAdmin(true);
      
      try {
        // First check local profile
        if (profile?.role === "admin") {
          // Double-check with server for sensitive admin routes
          const { data, error } = await supabase.rpc('verify_admin_status');
          
          if (error) {
            logger.error("Error verifying admin status:", error);
            throw error;
          }
          
          if (data === true) {
            logger.info("Admin status verified via server check");
            setIsAdmin(true);
          } else {
            logger.warn("Admin verification failed - server returned false");
            setIsAdmin(false);
            await refreshSession(); // Refresh the session to update local state
          }
        } else {
          logger.debug("User is not an admin based on profile", { role: profile?.role });
          setIsAdmin(false);
        }
      } catch (error) {
        logger.error("Admin verification failed:", error);
        setIsAdmin(false);
        toast.error("Could not verify administrator status");
      } finally {
        setIsVerifyingAdmin(false);
      }
    };

    verifyAdminStatus();
  }, [profile?.role]);

  if (isLoading || isVerifyingAdmin) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        <p className="mt-4 text-muted-foreground">Verifying administrator access...</p>
      </div>
    </div>;
  }

  // If not admin, redirect to dashboard
  if (!isAdmin) {
    logger.warn("Unauthorized admin access attempt", { path: location.pathname });
    toast.error("Administrator access required");
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
