
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { toast } from 'sonner';
import { logger } from '@/utils/loggingService';
import { handleError } from '@/utils/errorHandling/errorHandler';
import { ErrorType } from '@/utils/errorHandling/errorTypes';
import { useNavigate } from 'react-router-dom';
import { generateCsrfToken, validateCsrfToken } from '@/utils/csrfProtection';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  company?: string;
  company_id?: string;
  role?: string;
  industry?: string;
  settings?: Record<string, any>;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  updatePassword: (password: string) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Generate a CSRF token on mount
    generateCsrfToken();

    const getSession = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }
        
        setSession(data.session);
        
        if (data.session?.user) {
          setUser(data.session.user);
          await fetchUserProfile(data.session.user.id);
        }
      } catch (error) {
        handleError(error, {
          showToast: false,
          context: { source: 'AuthContext.getSession' }
        });
        logger.error('Error getting session:', error);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      logger.info(`Auth state changed: ${event}`);
      setSession(session);
      setUser(session?.user || null);
      
      if (session?.user) {
        await fetchUserProfile(session.user.id);
      } else {
        setProfile(null);
      }
      
      setLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setProfile(data as UserProfile);
      }
    } catch (error) {
      handleError(error, {
        showToast: false,
        context: { source: 'AuthContext.fetchUserProfile', userId }
      });
      logger.error('Error fetching user profile:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // Validate inputs
      if (!email || !password) {
        return { success: false, error: 'Email and password are required' };
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      return { success: true };
    } catch (error: any) {
      handleError(error, {
        context: { source: 'AuthContext.signIn' }
      });
      return { success: false, error: error.message || 'Failed to sign in' };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // Validate inputs
      if (!email || !password) {
        return { success: false, error: 'Email and password are required' };
      }
      
      // Validate CSRF token for security
      if (!validateCsrfToken()) {
        return { success: false, error: 'Security validation failed. Please reload the page and try again.' };
      }
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      // Check if email confirmation is required
      const needsEmailConfirmation = !data.session;
      
      if (needsEmailConfirmation) {
        toast.success('Registration successful! Please check your email to confirm your account.');
        return { success: true };
      }

      return { success: true };
    } catch (error: any) {
      handleError(error, {
        type: ErrorType.AUTHENTICATION_ERROR,
        context: { source: 'AuthContext.signUp' }
      });
      return { success: false, error: error.message || 'Failed to sign up' };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      navigate('/login');
    } catch (error) {
      handleError(error, {
        context: { source: 'AuthContext.signOut' }
      });
      logger.error('Error signing out:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setLoading(true);
      
      // Validate input
      if (!email) {
        return { success: false, error: 'Email is required' };
      }
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });

      if (error) {
        throw error;
      }

      return { success: true };
    } catch (error: any) {
      handleError(error, {
        context: { source: 'AuthContext.resetPassword' }
      });
      return { success: false, error: error.message || 'Failed to send password reset email' };
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (password: string) => {
    try {
      setLoading(true);
      
      // Validate input
      if (!password) {
        return { success: false, error: 'Password is required' };
      }
      
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        throw error;
      }

      return { success: true };
    } catch (error: any) {
      handleError(error, {
        context: { source: 'AuthContext.updatePassword' }
      });
      return { success: false, error: error.message || 'Failed to update password' };
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      setLoading(true);
      
      if (!user) {
        return { success: false, error: 'User not authenticated' };
      }
      
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) {
        throw error;
      }

      // Update local profile state
      setProfile(prev => prev ? { ...prev, ...updates } : null);

      return { success: true };
    } catch (error: any) {
      handleError(error, {
        context: { source: 'AuthContext.updateProfile' }
      });
      return { success: false, error: error.message || 'Failed to update profile' };
    } finally {
      setLoading(false);
    }
  };

  const refreshSession = async () => {
    try {
      setLoading(true);
      
      // Generate a new CSRF token
      generateCsrfToken();
      
      const { data, error } = await supabase.auth.refreshSession();
      
      if (error) {
        throw error;
      }
      
      setSession(data.session);
      setUser(data.session?.user || null);
      
      if (data.session?.user) {
        await fetchUserProfile(data.session.user.id);
      }
    } catch (error) {
      handleError(error, {
        showToast: false,
        context: { source: 'AuthContext.refreshSession' }
      });
      logger.error('Error refreshing session:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        loading,
        signIn,
        signUp,
        signOut,
        resetPassword,
        updatePassword,
        updateProfile,
        refreshSession
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
