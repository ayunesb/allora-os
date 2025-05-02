import { createContext, useContext, useEffect, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CONFIG } from '@/config/appConfig';
import { normalizeUserObject } from '@/utils/authCompatibility';
import { User } from '@/types/fixed/User';
import { AuthContextProps } from '@/types/fixed/Auth';

// Define the auth context with proper types
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Use values from config or fallback to environment variables
const supabaseUrl = SUPABASE_CONFIG.url;
const supabaseKey = SUPABASE_CONFIG.anonKey;

// Create the Supabase client with explicit URL and key
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined
  }
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(true); // Default to true for now
  const [isSessionExpired, setIsSessionExpired] = useState(false);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    };

    getSession();

    supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      if (session?.user) {
        await refreshUserData(session.user.id);
      } else {
        setUser(null);
      }
    });
  }, []);

  useEffect(() => {
    if (session?.user) {
      refreshUserData(session.user.id);
    } else {
      setUser(null);
    }
    setLoading(false);
    setHasInitialized(true);
  }, [session]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setAuthError(error.message);
        setLoading(false);
        return { success: false, error: error.message };
      }

      if (data.user) {
        const normalizedUser = normalizeUserObject(data.user);
        setUser(normalizedUser);
        setAuthError(null);
        setLoading(false);
        return { success: true, user: normalizedUser };
      }

      setLoading(false);
      return { success: false, error: 'Login failed' };
    } catch (err: any) {
      setLoading(false);
      return { success: false, error: err.message || 'Unexpected login error' };
    }
  };

  const signUp = async (email: string, password: string, metadata?: any) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      });

      if (error) {
        setLoading(false);
        return { success: false, error: error.message };
      }

      if (data.user) {
        const normalizedUser = normalizeUserObject(data.user);
        setUser(normalizedUser);
      }

      setLoading(false);
      return { success: true };
    } catch (err: any) {
      setLoading(false);
      return { success: false, error: err.message || 'Unexpected signup error' };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      return Promise.resolve();
    } catch (error: any) {
      console.error('Sign-out error:', error.message);
      return Promise.resolve();
    }
  };

  const updateUser = async (updates: any) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', session?.user?.id)
        .select()
        .single();

      if (error) {
        setLoading(false);
        return { data: null, error };
      }

      if (session?.user?.id) {
        await refreshUserData(session.user.id);
      }

      setLoading(false);
      return { data: normalizeUserObject(data) as User, error: null };
    } catch (err: any) {
      setLoading(false);
      return { data: null, error: err.message || 'Unexpected update error' };
    }
  };

  const refreshUserData = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          id,
          email,
          firstName,
          lastName,
          avatar,
          role,
          company,
          company_id,
          industry
        `)
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Profile fetch error:', error.message);
        return;
      }

      if (data) {
        const userProfile: User = {
          id: data.id,
          email: data.email || '',
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          name: `${data.firstName || ''} ${data.lastName || ''}`.trim(),
          avatar: data.avatar || '',
          avatar_url: data.avatar || '',
          role: data.role || 'user',
          company_id: data.company_id || '',
          company: data.company || '',
          industry: data.industry || '',
          app_metadata: { is_admin: data.role === 'admin' },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        setUser(userProfile);
      }
    } catch (err) {
      console.error('Refresh user error:', err);
    }
  };

  const refreshSession = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      return true;
    } catch (error) {
      console.error("Error refreshing session:", error);
      return false;
    }
  };

  const refreshProfile = async () => {
    if (session?.user?.id) {
      await refreshUserData(session.user.id);
    }
  };

  const value: AuthContextProps = {
    user,
    profile: user,
    loading,
    isLoading: loading,
    hasInitialized,
    isEmailVerified,
    isSessionExpired,
    authError,
    session,
    isAuthenticated: !!user,
    refreshProfile,
    refreshSession,
    signOut,
    login,
    signIn: login,
    logout: signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export interface AuthContextProps {
  user: User | null;
  session?: any;
  authError?: string;
  hasInitialized?: boolean;
  isEmailVerified?: boolean;
  isSessionExpired?: boolean;
  refreshSession?: () => Promise<boolean>;
  refreshProfile?: () => Promise<void>;
  signOut?: () => Promise<void>;
  login?: (email: string, password: string) => Promise<{ success: boolean; user?: User; error?: string }>;
  signIn?: (email: string, password: string) => Promise<{ success: boolean; user?: User; error?: string }>;
  logout?: () => Promise<void>;
  isAuthenticated?: boolean;
  isLoading: boolean;
}
