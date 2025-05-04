import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
export function useAuthState() {
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isProfileLoading, setIsProfileLoading] = useState(true);
    const [authError, setAuthError] = useState(null);
    const [hasInitialized, setHasInitialized] = useState(false);
    // Check if email is verified
    const isEmailVerified = user?.email_confirmed_at != null || false;
    // Refresh session
    const refreshSession = async () => {
        try {
            const { data, error } = await supabase.auth.refreshSession();
            if (error)
                throw error;
            setSession(data.session);
            setUser(data.session?.user ?? null);
            console.log("Session refreshed, user:", data.session?.user);
            return true;
        }
        catch (error) {
            console.error('Error refreshing session:', error);
            setAuthError('Failed to refresh session');
            return false;
        }
    };
    // Load user profile
    const loadUserProfile = async (userId) => {
        if (!userId)
            return;
        setIsProfileLoading(true);
        try {
            console.log("Loading profile for user ID:", userId);
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();
            if (error) {
                console.error("Profile loading error:", error);
                throw error;
            }
            if (data) {
                console.log("Profile loaded successfully:", data);
                // Make sure to keep the user's email accessible throughout the app
                const enhancedProfile = {
                    ...data,
                    // Add email from auth user if not present in the profile
                    email: data.email || user?.email || null
                };
                setProfile(enhancedProfile);
            }
            else {
                console.log("No profile data found");
                setProfile(null);
            }
        }
        catch (error) {
            console.error('Error loading user profile:', error);
        }
        finally {
            setIsProfileLoading(false);
        }
    };
    // Update last activity
    const updateLastActivity = async () => {
        if (!user?.id || !profile?.id)
            return;
        try {
            const now = new Date().toISOString();
            const { error } = await supabase
                .from('profiles')
                .update({ last_activity: now })
                .eq('id', user.id);
            if (error)
                throw error;
            setProfile(prev => prev ? { ...prev, last_activity: now } : null);
        }
        catch (error) {
            console.error('Error updating last activity:', error);
        }
    };
    // Auth state listener
    useEffect(() => {
        setIsLoading(true);
        // Set up auth state listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            // Handle auth state changes
            console.log("Auth state changed:", event, "User:", session?.user?.email);
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) {
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
            console.log("Initial session check:", session?.user?.email);
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) {
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
        hasInitialized
    };
}
