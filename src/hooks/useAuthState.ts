import { useState, useEffect } from 'react';
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

  const loadUserProfile = async (userId: string) => {
    if (!userId) return;
    
    setIsProfileLoading(true);
    try {
      const userProfile = await fetchUserProfile(userId);
      setProfile(userProfile);
    } catch (error) {
      console.error('Error loading user profile:', error);
    } finally {
      setIsProfileLoading(false);
    }
  };

  const updateLastActivity = () => {
    setLastActivity(new Date());
  };

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
  }, []);

  useEffect(() => {
    if (!session) return;
    
    const checkSessionRefresh = async () => {
      try {
        const expiresAt = session.expires_at;
        if (!expiresAt) return;
        
        const expiryTime = new Date(expiresAt * 1000);
        const now = new Date();
        
        if (expiryTime.getTime() - now.getTime() < 5 * 60 * 1000) {
          console.log('Session expiring soon, refreshing...');
          const { data, error } = await supabase.auth.refreshSession();
          
          if (error) {
            console.error('Error refreshing session:', error);
          } else if (data.session) {
            console.log('Session refreshed successfully');
            setSession(data.session);
            setUser(data.session.user);
          }
        }
      } catch (error) {
        console.error('Error in session refresh check:', error);
      }
    };
    
    const intervalId = setInterval(checkSessionRefresh, 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, [session, lastActivity]);

  useEffect(() => {
    if (user) {
      setIsEmailVerified(user.email_confirmed_at !== null);
    } else {
      setIsEmailVerified(false);
    }
  }, [user]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        console.log('Auth state change:', event);
        
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        if (newSession?.user) {
          setTimeout(() => {
            loadUserProfile(newSession.user.id);
          }, 0);
        } else {
          setProfile(null);
        }
        
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

    const initializeAuth = async () => {
      setIsLoading(true);
      try {
        const { session: currentSession } = await getSession();
        const { user: currentUser } = await getCurrentUser();
        
        setSession(currentSession);
        setUser(currentUser);
        
        if (currentUser) {
          await loadUserProfile(currentUser.id);
        }
      } catch (error) {
        console.error('Error loading auth:', error);
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
    setUser,
    setSession,
    loadUserProfile,
    updateLastActivity
  };
}
