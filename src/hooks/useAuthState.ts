import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';

export type Profile = {
  id: string;
  user_id: string;
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
  personal_api_keys?: Record<string, string> | string | null;
  industry?: string;
  stripe_customer_id?: string;
  subscription_status?: string;
  subscription_plan_id?: string;
  subscription_expires_at?: string;
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
      return true;
    } catch (error) {
      console.error('Error refreshing session:', error);
      setAuthError('Failed to refresh session');
      return false;
    }
  };

  // Load user profile
  const loadUserProfile = async (userId: string) => {
    if (!userId) return;
    
    setIsProfileLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      
      if (data) {
        setProfile(data as Profile);
      } else {
        setProfile(null);
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
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
        .from('profiles')
        .update({ last_activity: now })
        .eq('user_id', user.id);

      if (error) throw error;
      
      setProfile(prev => prev ? { ...prev, last_activity: now } : null);
    } catch (error) {
      console.error('Error updating last activity:', error);
    }
  };

  // Auth state listener
  useEffect(() => {
    setIsLoading(true);
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        // Handle auth state changes
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
      }
    );

    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
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
