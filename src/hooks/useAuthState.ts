
import { useState, useEffect, useCallback } from 'react';
import { useSession } from './useSession';
import { useUserProfile } from './useUserProfile';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { User, Session } from '@supabase/supabase-js';
import { logger } from '@/utils/loggingService';

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
        logger.error('Error loading user profile:', { error, userId });
        return;
      }

      if (data) {
        setProfile(data);
      }
    } catch (error) {
      logger.error('Unexpected error loading profile:', { error, userId });
    } finally {
      setIsProfileLoading(false);
    }
  }, []);

  // Set up auth state change listener and initialize auth
  useEffect(() => {
    setAuthError(null);
    let mounted = true;
    
    // Set up auth state change listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        logger.info('Auth state change:', { event });
        
        if (!mounted) return;
        
        // Update session and user state immediately - only synchronous operations here
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        // Use setTimeout to prevent deadlock with Supabase client
        if (newSession?.user) {
          setTimeout(() => {
            if (mounted) {
              loadUserProfile(newSession.user.id);
            }
          }, 0);
        } else if (mounted) {
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
          logger.info('Auth token refreshed');
        }
      }
    );

    // Then check for existing session
    const initializeAuth = async () => {
      if (!mounted) return;
      
      setIsLoading(true);
      try {
        // Get current session
        const { data: { session: currentSession }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          throw sessionError;
        }
        
        if (mounted) {
          setSession(currentSession);
          
          if (currentSession?.user) {
            setUser(currentSession.user);
            // Use setTimeout to prevent potential deadlock
            setTimeout(() => {
              if (mounted) {
                loadUserProfile(currentSession.user.id);
              }
            }, 0);
          }
        }
      } catch (error: any) {
        logger.error('Error loading auth:', { error });
        if (mounted) {
          setAuthError('Failed to initialize authentication');
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };
    
    initializeAuth();

    return () => {
      mounted = false;
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
