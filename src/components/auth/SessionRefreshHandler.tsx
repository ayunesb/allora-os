
import { useState } from "react";
import { toast } from "sonner";

interface SessionRefreshHandlerProps {
  user: any;
  refreshSession: () => Promise<void>;
  children: (
    isRefreshing: boolean, 
    handleSessionRefresh: () => Promise<void>
  ) => React.ReactNode;
}

export const SessionRefreshHandler = ({ 
  user, 
  refreshSession, 
  children 
}: SessionRefreshHandlerProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleSessionRefresh = async (): Promise<void> => {
    setIsRefreshing(true);
    try {
      await refreshSession();
      toast.success("Session refreshed successfully");
    } catch (error) {
      console.error("Error refreshing session:", error);
      toast.error("An unexpected error occurred", {
        description: "Unable to refresh your session. Please try logging in again."
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  return <>{children(isRefreshing, handleSessionRefresh)}</>;
};
