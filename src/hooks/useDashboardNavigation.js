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
import { toast } from "sonner";
import { checkOnboardingStatus } from "@/utils/onboarding";
export function useDashboardNavigation() {
    const { user, isLoading, profile, refreshSession, signOut } = useAuth();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navItems = [
        { label: "Dashboard", path: "/dashboard" },
        { label: "Strategies", path: "/dashboard/strategies" },
        { label: "Campaigns", path: "/dashboard/campaigns" },
        { label: "Calls", path: "/dashboard/calls" },
        { label: "Leads", path: "/dashboard/leads" },
        { label: "AI Bots", path: "/dashboard/ai-bots" },
    ];
    useEffect(() => {
        const checkUserOnboarding = () => __awaiter(this, void 0, void 0, function* () {
            if (user && !isLoading) {
                const hasCompletedOnboarding = yield checkOnboardingStatus(user.id);
                if (!hasCompletedOnboarding) {
                    toast.info("Please complete onboarding first");
                    navigate("/onboarding");
                }
            }
        });
        checkUserOnboarding();
    }, [user, isLoading, profile, navigate]);
    const handleRefreshSession = () => __awaiter(this, void 0, void 0, function* () {
        toast.info("Refreshing session...");
        yield refreshSession();
        toast.success("Session refreshed");
    });
    const handleSignOut = () => __awaiter(this, void 0, void 0, function* () {
        yield signOut();
        navigate("/");
        toast.success("You have been logged out");
    });
    const handleNavigateToProfile = () => {
        navigate("/dashboard/profile");
        setMobileMenuOpen(false);
    };
    // Check if session needs refresh
    const needsSessionRefresh = () => {
        if (!(user === null || user === void 0 ? void 0 : user.updated_at))
            return false;
        const sessionTime = new Date(user.updated_at).getTime();
        const thirtyMinutesAgo = Date.now() - 30 * 60 * 1000;
        return sessionTime < thirtyMinutesAgo;
    };
    return {
        user,
        isLoading,
        navItems,
        mobileMenuOpen,
        setMobileMenuOpen,
        needsSessionRefresh,
        handleRefreshSession,
        handleSignOut,
        handleNavigateToProfile,
    };
}
