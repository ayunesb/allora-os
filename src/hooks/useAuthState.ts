import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { Json } from "@/utils/profileHelpers";

export type Profile = {
  id: string;
  user_id?: string;
  email?: string;
  username?: string;
  full_name?: string;
  avatar_url?: string;
  company_id?: string;
  role?: string;
  last_activity?: string;
  created_at?: string;
  updated_at?: string;
  name?: string;
  company?: string;
  phone?: string;
  location?: string;
  website?: string;
  bio?: string;
  personal_api_keys?: Record<string, string> | string | null | Json;
  industry?: string;
  stripe_customer_id?: string;
  subscription_status?: string;
  subscription_plan_id?: string;
  subscription_expires_at?: string;
  company_size?: string;
  risk_appetite?: string;
  goals?: string[];
};

export function useAuthState() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Check if email is verified
  const isEmailVerified = user?.email_confirmed_at != null || false;

  // Refresh session
  const refreshSession = async () => {
    try {
      const { data, error } = await supabase.auth.refreshSession();
      if (error) throw error;

      setSession(data.session);
      setUser(data.session?.user ?? null);

      console.log("Session refreshed, user:", data.session?.user);
      return true;
    } catch (error) {
      console.error("Error refreshing session:", error);
      setAuthError("Failed to refresh session");
      return false;
    }
  };

  // Load user profile
  const loadUserProfile = async (userId: string) => {
    if (!userId) return;

    setIsProfileLoading(true);
    try {
      console.log("Loading profile for user ID:", userId);
      const { data, error } = await supabase
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
        const enhancedProfile = {
          ...data,
          // Add email from auth user if not present in the profile
          email: data.email || user?.email || null,
        } as Profile;

        setProfile(enhancedProfile);
      } else {
        console.log("No profile data found");
        setProfile(null);
      }
    } catch (error) {
      console.error("Error loading user profile:", error);
    } finally {
      setIsProfileLoading(false);
    }
  };

  // Update last activity
  const updateLastActivity = async () => {
    if (!user?.id || !profile?.id) return;

    try {
      const now = new Date().toISOString();

      const { error } = await supabase
        .from("profiles")
        .update({ last_activity: now })
        .eq("id", user.id);

      if (error) throw error;

      setProfile((prev) => (prev ? { ...prev, last_activity: now } : null));
    } catch (error) {
      console.error("Error updating last activity:", error);
    }
  };

  // Auth state listener
  useEffect(() => {
    setIsLoading(true);

    // Set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      // Handle auth state changes
      console.log("Auth state changed:", event, "User:", session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        // Load user profile on auth change
        setTimeout(() => {
          loadUserProfile(session.user.id);
        }, 0);
      } else {
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
    hasInitialized,
  };
}
