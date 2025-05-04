import { useState } from "react";
import { toast } from "sonner";
export const SessionRefreshHandler = ({ user, refreshSession, children }) => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const handleSessionRefresh = async () => {
        setIsRefreshing(true);
        try {
            await refreshSession();
            toast.success("Session refreshed successfully");
        }
        catch (error) {
            console.error("Error refreshing session:", error);
            toast.error("An unexpected error occurred", {
                description: "Unable to refresh your session. Please try logging in again."
            });
        }
        finally {
            setIsRefreshing(false);
        }
    };
    return <>{children(isRefreshing, handleSessionRefresh)}</>;
};
