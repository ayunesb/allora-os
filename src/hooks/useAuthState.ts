
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

  useEffect(() => {
    // Check email verification status when user changes
    if (user) {
      setIsEmailVerified(user.email_confirmed_at !== null);
    } else {
      setIsEmailVerified(false);
    }
  }, [user]);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        console.log('Auth state change:', event);
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        // Use setTimeout to avoid potential deadlocks with Supabase client
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
        }
      }
    );

    // THEN check for existing session
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
    loadUserProfile
  };
}
