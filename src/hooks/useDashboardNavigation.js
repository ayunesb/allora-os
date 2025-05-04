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
        const checkUserOnboarding = async () => {
            if (user && !isLoading) {
                const hasCompletedOnboarding = await checkOnboardingStatus(user.id);
                if (!hasCompletedOnboarding) {
                    toast.info("Please complete onboarding first");
                    navigate("/onboarding");
                }
            }
        };
        checkUserOnboarding();
    }, [user, isLoading, profile, navigate]);
    const handleRefreshSession = async () => {
        toast.info("Refreshing session...");
        await refreshSession();
        toast.success("Session refreshed");
    };
    const handleSignOut = async () => {
        await signOut();
        navigate('/');
        toast.success('You have been logged out');
    };
    const handleNavigateToProfile = () => {
        navigate('/dashboard/profile');
        setMobileMenuOpen(false);
    };
    // Check if session needs refresh
    const needsSessionRefresh = () => {
        if (!user?.updated_at)
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
        handleNavigateToProfile
    };
}
