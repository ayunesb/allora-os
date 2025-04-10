
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
    isLoading: isSessionLoading, 
    setIsLoading: setIsSessionLoading,
    refreshSession: refreshUserSession,
    updateLastActivity
  } = useSession();

  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [hasInitialized, setHasInitialized] = useState(false);

  const updateEmailVerification = useCallback((user: User | null) => {
    if (user?.email_confirmed_at || user?.confirmed_at) {
      setIsEmailVerified(true);
    } else {
      setIsEmailVerified(false);
    }
  }, []);

  const loadUserProfile = useCallback(async (userId: string) => {
    if (!userId) return null;
    
    setIsProfileLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        logger.error('Error loading user profile:', { error, userId });
        return null;
      }

      if (data) {
        setProfile(data);
        return data;
      }
      return null;
    } catch (error) {
      logger.error('Unexpected error loading profile:', { error, userId });
      return null;
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
      async (event, newSession) => {
        logger.info('Auth state change:', { event });
        
        if (!mounted) return;
        
        // Only perform synchronous operations inside the main callback
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        // Load profile on auth change
        if (newSession?.user) {
          setTimeout(async () => {
            if (mounted) {
              await loadUserProfile(newSession.user.id);
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
        }
      }
    );

    // Initialize auth - only once
    const initializeAuth = async () => {
      if (!mounted) return;
      
      setIsSessionLoading(true);
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
            await loadUserProfile(currentSession.user.id);
          }
        }
      } catch (error: any) {
        logger.error('Error loading auth:', { error });
        if (mounted) {
          setAuthError('Failed to initialize authentication');
        }
      } finally {
        if (mounted) {
          setIsSessionLoading(false);
          setHasInitialized(true);
        }
      }
    };
    
    // Only initialize once
    if (!hasInitialized) {
      initializeAuth();
    }

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [setSession, loadUserProfile, setIsSessionLoading, hasInitialized]);

  // Update email verification status whenever user changes
  useEffect(() => {
    updateEmailVerification(user);
  }, [user, updateEmailVerification]);

  const isLoading = isSessionLoading || (isProfileLoading && !!user);

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
    updateEmailVerification,
    hasInitialized
  };
}
