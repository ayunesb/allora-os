
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { checkOnboardingStatus } from "@/utils/onboarding";
import { toast } from "sonner";

export function useOnboardingStatusCheck() {
  const { user } = useAuth();
  const [isCheckingStatus, setIsCheckingStatus] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const navigate = useNavigate();
  
  // Define hasInitialized based on user having been checked
  const hasInitialized = user !== undefined;

  useEffect(() => {
    let isMounted = true;
    
    const checkStatus = async () => {
      if (!user && retryCount < 3) {
        setTimeout(() => {
          if (isMounted) {
            setRetryCount(prev => prev + 1);
          }
        }, 1500);
        return;
      }
      
      if (!user) {
        if (hasInitialized) {
          toast.error("You must be logged in to complete onboarding");
          navigate("/login");
        }
        return;
      }

      try {
        const isCompleted = await checkOnboardingStatus(user.id);
        if (isCompleted && isMounted) {
          toast.info("You've already completed onboarding");
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error checking onboarding status:", error);
      } finally {
        if (isMounted) {
          setIsCheckingStatus(false);
        }
      }
    };

    checkStatus();
    
    return () => {
      isMounted = false;
    };
  }, [user, navigate, retryCount, hasInitialized]);

  return {
    isCheckingStatus,
    retryCount,
    user
  };
}
