var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
export function useAuthState() {
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isProfileLoading, setIsProfileLoading] = useState(true);
    const [authError, setAuthError] = useState(null);
    const [hasInitialized, setHasInitialized] = useState(false);
    // Check if email is verified
    const isEmailVerified = (user === null || user === void 0 ? void 0 : user.email_confirmed_at) != null || false;
    // Refresh session
    const refreshSession = () => __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        try {
            const { data, error } = yield supabase.auth.refreshSession();
            if (error)
                throw error;
            setSession(data.session);
            setUser((_b = (_a = data.session) === null || _a === void 0 ? void 0 : _a.user) !== null && _b !== void 0 ? _b : null);
            console.log("Session refreshed, user:", (_c = data.session) === null || _c === void 0 ? void 0 : _c.user);
            return true;
        }
        catch (error) {
            console.error("Error refreshing session:", error);
            setAuthError("Failed to refresh session");
            return false;
        }
    });
    // Load user profile
    const loadUserProfile = (userId) => __awaiter(this, void 0, void 0, function* () {
        if (!userId)
            return;
        setIsProfileLoading(true);
        try {
            console.log("Loading profile for user ID:", userId);
            const { data, error } = yield supabase
                .from("profiles")
                .select("*")
                .eq("id", userId)
                .single();
            if (error) {
                console.error("Profile loading error:", error);
                throw error;
            }
            if (data) {
                console.log("Profile loaded successfully:", data);
                // Make sure to keep the user's email accessible throughout the app
                const enhancedProfile = Object.assign(Object.assign({}, data), { 
                    // Add email from auth user if not present in the profile
                    email: data.email || (user === null || user === void 0 ? void 0 : user.email) || null });
                setProfile(enhancedProfile);
            }
            else {
                console.log("No profile data found");
                setProfile(null);
            }
        }
        catch (error) {
            console.error("Error loading user profile:", error);
        }
        finally {
            setIsProfileLoading(false);
        }
    });
    // Update last activity
    const updateLastActivity = () => __awaiter(this, void 0, void 0, function* () {
        if (!(user === null || user === void 0 ? void 0 : user.id) || !(profile === null || profile === void 0 ? void 0 : profile.id))
            return;
        try {
            const now = new Date().toISOString();
            const { error } = yield supabase
                .from("profiles")
                .update({ last_activity: now })
                .eq("id", user.id);
            if (error)
                throw error;
            setProfile((prev) => (prev ? Object.assign(Object.assign({}, prev), { last_activity: now }) : null));
        }
        catch (error) {
            console.error("Error updating last activity:", error);
        }
    });
    // Auth state listener
    useEffect(() => {
        setIsLoading(true);
        // Set up auth state listener
        const { data: { subscription }, } = supabase.auth.onAuthStateChange((event, session) => {
            var _a, _b;
            // Handle auth state changes
            console.log("Auth state changed:", event, "User:", (_a = session === null || session === void 0 ? void 0 : session.user) === null || _a === void 0 ? void 0 : _a.email);
            setSession(session);
            setUser((_b = session === null || session === void 0 ? void 0 : session.user) !== null && _b !== void 0 ? _b : null);
            if (session === null || session === void 0 ? void 0 : session.user) {
                // Load user profile on auth change
                setTimeout(() => {
                    loadUserProfile(session.user.id);
                }, 0);
            }
            else {
                setProfile(null);
            }
        });
        // Initial session check
        supabase.auth.getSession().then(({ data: { session } }) => {
            var _a, _b;
            console.log("Initial session check:", (_a = session === null || session === void 0 ? void 0 : session.user) === null || _a === void 0 ? void 0 : _a.email);
            setSession(session);
            setUser((_b = session === null || session === void 0 ? void 0 : session.user) !== null && _b !== void 0 ? _b : null);
            if (session === null || session === void 0 ? void 0 : session.user) {
                loadUserProfile(session.user.id);
            }
            setIsLoading(false);
            setHasInitialized(true);
        });
        // Cleanup
        return () => {
            subscription.unsubscribe();
        };
    }, []);
    return {
        user,
        session,
        profile,
        isLoading,
        isProfileLoading,
        isEmailVerified,
        authError,
        loadUserProfile,
        refreshSession,
        updateLastActivity,
        setProfile,
        hasInitialized,
    };
}
