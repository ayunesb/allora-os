var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useState, useCallback, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
export function useSession() {
    const [session, setSession] = useState(null);
    const [isSessionExpired, setIsSessionExpired] = useState(false);
    const [lastActivity, setLastActivity] = useState(new Date());
    const [isLoading, setIsLoading] = useState(true);
    const refreshTimeoutRef = useRef(null);
    const updateLastActivity = useCallback(() => {
        setLastActivity(new Date());
        setIsSessionExpired(false);
    }, []);
    const refreshSession = useCallback(() => __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Manually refreshing session...");
            const { data, error } = yield supabase.auth.refreshSession();
            if (error) {
                console.error("Error refreshing session:", error);
                return false;
            }
            if (data.session) {
                console.log("Session refreshed successfully");
                setSession(data.session);
                setIsSessionExpired(false);
                // Set up the next refresh
                scheduleRefresh(data.session);
                return true;
            }
            return false;
        }
        catch (error) {
            console.error("Error in manual session refresh:", error);
            return false;
        }
    }), []);
    // Helper function to schedule session refresh
    const scheduleRefresh = useCallback((currentSession) => {
        if (!currentSession)
            return;
        // Clear any existing timeout
        if (refreshTimeoutRef.current) {
            clearTimeout(refreshTimeoutRef.current);
        }
        const expiresAt = currentSession.expires_at;
        if (!expiresAt)
            return;
        const expiryTime = new Date(expiresAt * 1000);
        const now = new Date();
        const timeToExpiry = expiryTime.getTime() - now.getTime();
        // If session is about to expire in the next 5 minutes, refresh it soon
        if (timeToExpiry < 5 * 60 * 1000 && timeToExpiry > 0) {
            refreshTimeoutRef.current = setTimeout(() => {
                refreshSession();
            }, 10000); // Refresh in 10 seconds
        }
        // Otherwise schedule refresh for 5 minutes before expiry
        else if (timeToExpiry > 5 * 60 * 1000) {
            const refreshTime = timeToExpiry - 5 * 60 * 1000;
            refreshTimeoutRef.current = setTimeout(() => {
                refreshSession();
            }, refreshTime);
        }
        // If session is expired, set flag
        else if (timeToExpiry <= 0) {
            console.log("Session expired");
            setIsSessionExpired(true);
            toast.error("Your session has expired. Please log in again.");
        }
    }, [refreshSession]);
    // Monitor user activity to prevent session timeouts
    useEffect(() => {
        const events = ["mousedown", "keydown", "scroll", "touchstart"];
        const handleActivity = () => {
            updateLastActivity();
        };
        events.forEach((event) => {
            window.addEventListener(event, handleActivity);
        });
        return () => {
            events.forEach((event) => {
                window.removeEventListener(event, handleActivity);
            });
        };
    }, [updateLastActivity]);
    // Set up auth state change listener and initialize auth
    useEffect(() => {
        // Clean up function to clear any timeouts on unmount
        return () => {
            if (refreshTimeoutRef.current) {
                clearTimeout(refreshTimeoutRef.current);
            }
        };
    }, []);
    // Initialize auth state and set up listener
    useEffect(() => {
        setIsLoading(true);
        // Set up auth state change listener first
        const { data: { subscription }, } = supabase.auth.onAuthStateChange((event, newSession) => {
            console.log("Auth state change:", event);
            // Update session state immediately
            setSession(newSession);
            // Schedule session refresh if needed
            scheduleRefresh(newSession);
            // Set session expired flag appropriately
            if (event === "SIGNED_OUT") {
                setIsSessionExpired(false);
            }
            else if (newSession) {
                setIsSessionExpired(false);
            }
        });
        // Then check for existing session
        const initializeAuth = () => __awaiter(this, void 0, void 0, function* () {
            try {
                // Get current session
                const { data: { session: currentSession }, error: sessionError, } = yield supabase.auth.getSession();
                if (sessionError) {
                    throw sessionError;
                }
                setSession(currentSession);
                scheduleRefresh(currentSession);
            }
            catch (error) {
                console.error("Error loading auth:", error);
            }
            finally {
                setIsLoading(false);
            }
        });
        initializeAuth();
        return () => {
            subscription.unsubscribe();
        };
    }, [scheduleRefresh]);
    return {
        session,
        setSession,
        isSessionExpired,
        isLoading,
        setIsLoading,
        refreshSession,
        updateLastActivity,
    };
}
