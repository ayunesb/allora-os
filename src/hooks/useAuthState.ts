
import { useState, useEffect, useCallback } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { UserProfile, fetchUserProfile } from '@/utils/profileHelpers';
import { supabase, getSession, getCurrentUser } from '@/backend/supabase';
import { toast } from 'sonner';

export function useAuthState() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [lastActivity, setLastActivity] = useState<Date>(new Date());
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSessionExpired, setIsSessionExpired] = useState(false);

  const loadUserProfile = async (userId: string) => {
    if (!userId) return;
    
    setIsProfileLoading(true);
    try {
      const userProfile = await fetchUserProfile(userId);
      setProfile(userProfile);
    } catch (error) {
      console.error('Error loading user profile:', error);
      setAuthError('Failed to load user profile data');
    } finally {
      setIsProfileLoading(false);
    }
  };

  const updateLastActivity = useCallback(() => {
    setLastActivity(new Date());
    setIsSessionExpired(false); // Reset session expired flag when there's activity
  }, []);

  // Refresh session method that can be called manually when needed
  const refreshUserSession = useCallback(async () => {
    try {
      console.log('Manually refreshing session...');
      const { data, error } = await supabase.auth.refreshSession();
      
      if (error) {
        console.error('Error refreshing session:', error);
        setAuthError('Session refresh failed');
        return false;
      }
      
      if (data.session) {
        console.log('Session refreshed successfully');
        setSession(data.session);
        setUser(data.session.user);
        setIsSessionExpired(false);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error in manual session refresh:', error);
      setAuthError('Session refresh failed');
      return false;
    }
  }, []);

  // Monitor user activity to prevent session timeouts
  useEffect(() => {
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    
    const handleActivity = () => {
      updateLastActivity();
    };
    
    events.forEach(event => {
      window.addEventListener(event, handleActivity);
    });
    
    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [updateLastActivity]);

  // Auto session refresh logic
  useEffect(() => {
    if (!session) return;
    
    const checkSessionRefresh = async () => {
      try {
        const expiresAt = session.expires_at;
        if (!expiresAt) return;
        
        const expiryTime = new Date(expiresAt * 1000);
        const now = new Date();
        const timeToExpiry = expiryTime.getTime() - now.getTime();
        
        // If session is about to expire in the next 5 minutes, refresh it
        if (timeToExpiry < 5 * 60 * 1000 && timeToExpiry > 0) {
          console.log('Session expiring soon, refreshing...');
          const { data, error } = await supabase.auth.refreshSession();
          
          if (error) {
            console.error('Error refreshing session:', error);
            setAuthError('Your session is about to expire and could not be refreshed');
          } else if (data.session) {
            console.log('Session refreshed successfully');
            setSession(data.session);
            setUser(data.session.user);
          }
        }
        
        // If session is expired, set flag
        if (timeToExpiry <= 0) {
          console.log('Session expired');
          setIsSessionExpired(true);
          toast.error('Your session has expired. Please log in again.');
        }
      } catch (error) {
        console.error('Error in session refresh check:', error);
      }
    };
    
    const intervalId = setInterval(checkSessionRefresh, 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, [session, lastActivity]);

  // Check if email is verified whenever user changes
  useEffect(() => {
    if (user) {
      setIsEmailVerified(user.email_confirmed_at !== null);
    } else {
      setIsEmailVerified(false);
    }
  }, [user]);

  // Set up auth state change listener and initialize auth
  useEffect(() => {
    setAuthError(null);
    
    // Set up auth state change listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        console.log('Auth state change:', event);
        
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        if (newSession?.user) {
          // Use setTimeout to prevent deadlock with Supabase client
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
        // Get current session and user using our exported functions
        const { session: currentSession } = await getSession();
        const { user: currentUser } = await getCurrentUser();
        
        setSession(currentSession);
        setUser(currentUser);
        
        if (currentUser) {
          await loadUserProfile(currentUser.id);
        }
      } catch (error) {
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
  }, []);

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
    refreshSession: refreshUserSession
  };
}
