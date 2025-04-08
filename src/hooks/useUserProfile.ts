
import { useState, useCallback } from 'react';
import { User } from '@supabase/supabase-js';
import { UserProfile, fetchUserProfile } from '@/utils/profileHelpers';

export function useUserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const loadUserProfile = useCallback(async (userId: string) => {
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
  }, []);

  // Check if email is verified whenever user changes
  const updateEmailVerification = useCallback((currentUser: User | null) => {
    if (currentUser) {
      setIsEmailVerified(currentUser.email_confirmed_at !== null);
    } else {
      setIsEmailVerified(false);
    }
  }, []);

  return {
    user,
    setUser,
    profile,
    setProfile,
    isProfileLoading,
    isEmailVerified,
    authError,
    setAuthError,
    loadUserProfile,
    updateEmailVerification
  };
}
