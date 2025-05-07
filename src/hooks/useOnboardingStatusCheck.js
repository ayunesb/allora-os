var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        const checkStatus = () => __awaiter(this, void 0, void 0, function* () {
            if (!user && retryCount < 3) {
                setTimeout(() => {
                    if (isMounted) {
                        setRetryCount((prev) => prev + 1);
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
                const isCompleted = yield checkOnboardingStatus(user.id);
                if (isCompleted && isMounted) {
                    toast.info("You've already completed onboarding");
                    navigate("/dashboard");
                }
            }
            catch (error) {
                console.error("Error checking onboarding status:", error);
            }
            finally {
                if (isMounted) {
                    setIsCheckingStatus(false);
                }
            }
        });
        checkStatus();
        return () => {
            isMounted = false;
        };
    }, [user, navigate, retryCount, hasInitialized]);
    return {
        isCheckingStatus,
        retryCount,
        user,
    };
}
