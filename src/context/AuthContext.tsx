import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { User as AppUser } from '@/models/user';

export interface AuthContextProps {
  user: AppUser | null;
  profile: AppUser | null;
  session: Session | null;
  isLoading: boolean;
  isEmailVerified: boolean;
  authError: string | null;
  isSessionExpired: boolean;
  hasInitialized: boolean;
  refreshSession: () => Promise<boolean>;
  refreshProfile: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData?: object) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<AppUser | null>(null);
  const [profile, setProfile] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSessionExpired, setIsSessionExpired] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        if (currentSession?.user) {
          const mappedUser = mapUserToAppUser(currentSession.user);
          setUser(mappedUser);
          setIsEmailVerified(!!currentSession.user.email_confirmed_at);
          
          // Fetch user profile in a separate process to avoid Supabase deadlocks
          setTimeout(() => {
            fetchUserProfile(currentSession.user.id);
          }, 0);
        } else {
          setUser(null);
          setProfile(null);
          setIsEmailVerified(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      if (currentSession?.user) {
        const mappedUser = mapUserToAppUser(currentSession.user);
        setUser(mappedUser);
        setIsEmailVerified(!!currentSession.user.email_confirmed_at);
        fetchUserProfile(currentSession.user.id);
      }
      setIsLoading(false);
      setHasInitialized(true);
    });

    return () => {
      subscription.unsubscribe();
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
        console.error('Error fetching user profile:', error);
        return;
      }

      if (data) {
        setProfile(data as AppUser);
      }
    } catch (error) {
      console.error('Exception fetching user profile:', error);
    }
  };

  const refreshProfile = async () => {
    if (user?.id) {
      await fetchUserProfile(user.id);
    }
  };

  const mapUserToAppUser = (supabaseUser: User): AppUser => {
    return {
      id: supabaseUser.id,
      email: supabaseUser.email || '',
      role: (supabaseUser.app_metadata?.role as "user" | "admin") || "user",
      company_id: supabaseUser.user_metadata?.company_id,
      company: supabaseUser.user_metadata?.company,
      industry: supabaseUser.user_metadata?.industry,
      app_metadata: supabaseUser.app_metadata,
      user_metadata: supabaseUser.user_metadata
    };
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (error: any) {
      toast.error(`Error signing in: ${error.message}`);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, userData?: object) => {
    try {
      const { error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: userData
        }
      });
      if (error) throw error;
      toast.success('Signup successful! Please check your email to verify your account.');
    } catch (error: any) {
      toast.error(`Error signing up: ${error.message}`);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      setProfile(null);
      setSession(null);
    } catch (error: any) {
      toast.error(`Error signing out: ${error.message}`);
      throw error;
    }
  };
  
  const refreshSession = async () => {
    try {
      const { data, error } = await supabase.auth.refreshSession();
      
      if (error) {
        console.error("Error refreshing session:", error);
        setIsSessionExpired(true);
        return false;
      }
      
      setIsSessionExpired(false);
      return !!data.session;
    } catch (error) {
      console.error("Session refresh error:", error);
      setIsSessionExpired(true);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      profile, 
      session, 
      isLoading, 
      isEmailVerified,
      authError,
      isSessionExpired,
      hasInitialized,
      signIn, 
      signUp, 
      signOut, 
      refreshSession,
      refreshProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
