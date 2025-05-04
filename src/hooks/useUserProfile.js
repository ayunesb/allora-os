import { useState, useCallback } from 'react';
import { supabase } from '@/backend/supabase';
export function useUserProfile() {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [isProfileLoading, setIsProfileLoading] = useState(false);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [authError, setAuthError] = useState(null);
    const updateEmailVerification = useCallback((user) => {
        if (user?.email_confirmed_at || user?.confirmed_at) {
            setIsEmailVerified(true);
        }
        else {
            setIsEmailVerified(false);
        }
    }, []);
    const loadUserProfile = useCallback(async (userId) => {
        if (!userId)
            return;
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
        }
        catch (error) {
            console.error('Unexpected error loading profile:', error);
        }
        finally {
            setIsProfileLoading(false);
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
