import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { logger } from '@/utils/loggingService';

// Comprehensive AuthContextType
export interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isProfileLoading: boolean;
  isEmailVerified: boolean;
  isSessionExpired: boolean;
  hasInitialized: boolean;
  authError?: Error | null;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string) => Promise<{ success: boolean; error?: string; user?: User }>;
  signOut: () => Promise<{ success: boolean; error?: string }>;
  refreshSession: () => Promise<boolean>;
  refreshProfile: () => Promise<void>;
  sendPasswordReset?: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<{ success: boolean; error?: string }>;
  isAuthenticated: boolean;
}

// Placeholder UserProfile type
export interface UserProfile {
  id?: string;
  email?: string;
  name?: string;
  avatar_url?: string;
  company?: string;
  industry?: string;
  role?: string;
  company_id?: string;
  goals?: string[];
  risk_appetite?: string;
  company_size?: number;
  phone?: string;
  location?: string;
  website?: string;
  bio?: string;
  personal_api_keys?: Record<string, string>;
}

// Create the context with a default empty object
export const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  profile: null,
  isLoading: true,
  isProfileLoading: true,
  isEmailVerified: false,
  isSessionExpired: false,
  hasInitialized: false,
  authError: null,
  signIn: async () => ({ success: false }),
  signUp: async () => ({ success: false }),
  signOut: async () => ({ success: false }),
  refreshSession: async () => false,
  refreshProfile: async () => {},
  updatePassword: async () => ({ success: false }),
  isAuthenticated: false
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isSessionExpired, setIsSessionExpired] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [authError, setAuthError] = useState<Error | null>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    const getSession = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          throw error;
        }

        setSession(data.session);
        setUser(data.session?.user || null);
        setIsSessionExpired(false); // Reset session expired state on refresh

        if (data.session?.user) {
          await fetchProfile(data.session.user.id);
        }
      } catch (error: any) {
        logger.error('Error getting session:', error);
        setAuthError(error);
      } finally {
        setIsLoading(false);
        setHasInitialized(true);
      }
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        logger.info(`Auth state change event: ${event}`);
        setSession(session);
        setUser(session?.user || null);
        setIsSessionExpired(false); // Reset session expired state on auth change

        if (session?.user) {
          await fetchProfile(session.user.id);
        } else {
          setProfile(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    // Check if the email is verified
    setIsEmailVerified(user?.email_confirmed_at !== undefined && user?.email_confirmed_at !== null);
  }, [user]);

  const fetchProfile = async (userId: string) => {
    try {
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) {
        logger.warn('Error fetching profile:', profileError);
        // Don't throw an error here; just log it
      }

      setProfile(profileData || null);
    } catch (error: any) {
      logger.error('Error fetching profile:', error);
      // setAuthError(error); // Consider whether to set an auth error here
    }
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }
      return { success: true };
    } catch (error: any) {
      logger.error('Sign-in error:', error);
      setAuthError(error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw error;
      }
      return { success: true, user: data.user };
    } catch (error: any) {
      logger.error('Sign-up error:', error);
      setAuthError(error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setProfile(null); // Clear profile on sign out
      return { success: true };
    } catch (error: any) {
      logger.error('Sign-out error:', error);
      setAuthError(error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const refreshSession = async (): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.refreshSession();
      
      if (error) {
        console.error("Error refreshing session:", error.message);
        setAuthError(error);
        setSession(null);
        setIsSessionExpired(true);
        return false;
      }
      
      if (data.session) {
        setSession(data.session);
        setUser(data.user);
        setIsSessionExpired(false);
        return true;
      }
      
      return false;
    } catch (err) {
      console.error("Error in refreshSession:", err);
      setIsSessionExpired(true);
      return false;
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  const sendPasswordReset = async (email: string) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) {
        throw error;
      }
    } catch (error: any) {
      logger.error('Password reset error:', error);
      setAuthError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updatePassword = async (password: string) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const { error } = await supabase.auth.updateUser({
        password
      });
      
      if (error) throw error;
      return { success: true };
    } catch (error: any) {
      logger.error('Password update error:', error);
      setAuthError(error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    session,
    profile,
    isLoading,
    isProfileLoading,
    isEmailVerified,
    isSessionExpired,
    hasInitialized,
    authError,
    signIn,
    signUp,
    signOut,
    refreshSession,
    refreshProfile,
    sendPasswordReset,
    updatePassword,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
