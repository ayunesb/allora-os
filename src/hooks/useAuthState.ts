
import { useState, useEffect, useCallback } from 'react';
import { useSession } from './useSession';
import { useUserProfile } from './useUserProfile';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { User, Session } from '@supabase/supabase-js';

export function useAuthState() {
  const { 
    session, 
    setSession, 
    isSessionExpired, 
    isLoading, 
    setIsLoading,
    refreshSession: refreshUserSession,
    updateLastActivity
  } = useSession();

  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const updateEmailVerification = useCallback((user: User | null) => {
    if (user?.email_confirmed_at || user?.confirmed_at) {
      setIsEmailVerified(true);
    } else {
      setIsEmailVerified(false);
    }
  }, []);

  const loadUserProfile = useCallback(async (userId: string) => {
    if (!userId) return;
    
    setIsProfileLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error loading user profile:', error);
        return;
      }

      if (data) {
        setProfile(data);
      }
    } catch (error) {
      console.error('Unexpected error loading profile:', error);
    } finally {
      setIsProfileLoading(false);
    }
  }, []);

  // Set up auth state change listener and initialize auth
  useEffect(() => {
    setAuthError(null);
    
    // Set up auth state change listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        console.log('Auth state change:', event);
        
        // Update session and user state immediately
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        // Use setTimeout to prevent deadlock with Supabase client
        if (newSession?.user) {
          setTimeout(() => {
            loadUserProfile(newSession.user.id);
          }, 0);
        } else {
          setProfile(null);
        }
        
        // Show appropriate notifications for auth events
        if (event === 'SIGNED_OUT') {
          toast.info('You have been signed out');
        } else if (event === 'SIGNED_IN') {
          toast.success('Welcome back!');
        } else if (event === 'USER_UPDATED') {
          toast.success('Your profile has been updated');
        } else if (event === 'PASSWORD_RECOVERY') {
          toast.info('Password recovery initiated');
        } else if (event === 'TOKEN_REFRESHED') {
          console.log('Auth token refreshed');
        }
      }
    );

    // Then check for existing session
    const initializeAuth = async () => {
      setIsLoading(true);
      try {
        // Get current session
        const { data: { session: currentSession }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          throw sessionError;
        }
        
        setSession(currentSession);
        
        if (currentSession?.user) {
          setUser(currentSession.user);
          // Use setTimeout to prevent potential deadlock
          setTimeout(() => {
            loadUserProfile(currentSession.user.id);
          }, 0);
        }
      } catch (error: any) {
        console.error('Error loading auth:', error);
        setAuthError('Failed to initialize authentication');
      } finally {
        setIsLoading(false);
      }
    };
    
    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, [setSession, loadUserProfile, setIsLoading]);

  // Update email verification status whenever user changes
  useEffect(() => {
    updateEmailVerification(user);
  }, [user, updateEmailVerification]);

  return {
    user,
    session,
    isLoading,
    profile,
    isProfileLoading,
    isEmailVerified,
    authError,
    isSessionExpired,
    setUser,
    setSession,
    loadUserProfile,
    updateLastActivity,
    refreshSession: refreshUserSession,
    setProfile,
    setAuthError,
    updateEmailVerification
  };
}
