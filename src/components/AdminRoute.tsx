import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { logger } from "@/utils/loggingService";
import { toast } from "sonner";
import { createAuthCompatibilityLayer } from "@/utils/authCompatibility";
import { Loading } from "@/components/ui/loading";
const AdminRoute = ({ children }) => {
  const authContext = useAuth();
  const auth = createAuthCompatibilityLayer(authContext);
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(null);
  const isLoading = auth?.isLoading || auth?.loading || isAdmin === null;
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!auth?.user) {
        setIsAdmin(false);
        return;
      }
      try {
        // Check if user has admin role
        const isAdminUser =
          auth.user.role === "admin" ||
          auth.user?.app_metadata?.is_admin === true;
        setIsAdmin(isAdminUser);
        if (!isAdminUser) {
          logger.warn("Non-admin user attempted to access admin route", {
            userId: auth.user.id,
            path: location.pathname,
          });
          toast.error("You do not have permission to access this page");
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
        toast.error("Something went wrong checking your permissions");
      }
    };
    checkAdminStatus();
  }, [auth?.user, location.pathname]);
  if (isLoading) {
    return (
      <Loading size="lg" text="Checking permissions..." center fullHeight />
    );
  }
  if (!auth?.user) {
    // Redirect to login if not authenticated
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  if (!isAdmin) {
    // Redirect to dashboard if authenticated but not admin
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
};
export default AdminRoute;
