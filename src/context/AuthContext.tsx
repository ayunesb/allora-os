import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useCallback,
} from 'react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Define the types
export interface User {
  id: string;
  email: string;
  user_metadata: {
    firstName: string;
    lastName: string;
    avatar?: string;
    role?: string;
  };
  aud: string;
  created_at: string;
}

interface AuthContextProps {
  supabase: SupabaseClient;
  user: User | null | undefined;
  session: any;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string; user?: User | undefined }>;
  signUp: (email: string, password: string, metadata?: any) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  updateUser: (updates: any) => Promise<{ data: User | null; error: any }>;
  refreshUserData: (userId: string) => Promise<void>;
  setUser: Dispatch<SetStateAction<User | null | undefined>>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [supabase] = useState(() => createClient(supabaseUrl, supabaseKey));
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

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
  }, [supabase]);

  useEffect(() => {
    if (session?.user) {
      refreshUserData(session.user.id);
    } else {
      setUser(null);
    }
    setLoading(false);
  }, [session, supabase]);

  const login = async (email: string, password: string): Promise<{ 
    success: boolean; 
    error?: string; 
    user?: User | undefined;
  }> => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setLoading(false);
        return { success: false, error: error.message };
      }

      if (data?.user) {
        await refreshUserData(data.user.id);
        setLoading(false);
        return { success: true, user: data.user as User };
      }

      setLoading(false);
      return { success: false, error: 'Login failed with unknown error' };
    } catch (err: any) {
      console.error('Login error:', err);
      setLoading(false);
      return { success: false, error: err.message || 'An unexpected error occurred during login' };
    }
  };

  const signUp = async (email: string, password: string, metadata?: any): Promise<{ success: boolean; error?: string }> => {
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
        await refreshUserData(data.user.id);
      }
      setLoading(false);
      return { success: true };
    } catch (err: any) {
      console.error('Signup error:', err);
      setLoading(false);
      return { success: false, error: err.message || 'An unexpected error occurred during signup' };
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error: any) {
      console.error('Error signing out:', error.message);
    }
  };

  const updateUser = async (updates: any): Promise<{ data: User | null; error: any }> => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', session?.user?.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating user:', error);
        setLoading(false);
        return { data: null, error };
      }

      // Refresh user data after update
      if (session?.user?.id) {
        await refreshUserData(session.user.id);
      }
      setLoading(false);
      return { data: data as User, error: null };
    } catch (err: any) {
      console.error('Update user error:', err);
      setLoading(false);
      return { data: null, error: err.message || 'An unexpected error occurred during user update' };
    }
  };

  const refreshUserData = async (userId: string): Promise<void> => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select(`
          id,
          email,
          firstName,
          lastName,
          avatar,
          role
        `)
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user data:', error);
        return;
      }

      if (profile) {
        const userProfile: User = {
          id: profile.id,
          email: profile.email,
          user_metadata: {
            firstName: profile.firstName,
            lastName: profile.lastName,
            avatar: profile.avatar,
            role: profile.role,
          },
          aud: 'authenticated',
          created_at: new Date().toISOString(),
        };
        setUser(userProfile);
      }
    } catch (err: any) {
      console.error('Error refreshing user data:', err);
    }
  };

  const value: AuthContextProps = {
    supabase,
    user,
    session,
    loading,
    login,
    signUp,
    signOut,
    updateUser,
    refreshUserData,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
