import React, { 
  createContext, 
  useState, 
  useEffect, 
  useContext, 
  useCallback 
} from 'react';
import { 
  Session, 
  User 
} from '@supabase/supabase-js';
import { 
  useNavigate, 
  useLocation 
} from 'react-router-dom';
import { supabase } from '@/backend/supabase';
import { fetchUserProfile, UserProfile } from '@/utils/profileHelpers';
import { useAuthErrorHandler } from '@/hooks/useAuthErrorHandler';
import { useSession } from '@/hooks/useSession';

// Define the AuthContext type
interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;
  isProfileLoading: boolean;
  isEmailVerified: boolean;
  authError: string | null;
  isLoading: boolean;
  isUserAdmin: boolean;
  refreshProfile: () => Promise<void>;
  signOut: () => Promise<void>;
}

// Create the AuthContext with a default value
const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  profile: null,
  isProfileLoading: false,
  isEmailVerified: false,
  authError: null,
  isLoading: true,
  isUserAdmin: false,
  refreshProfile: async () => {},
  signOut: async () => {},
});

// AuthProvider component
interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Use the useAuthErrorHandler hook
  const { handleAuthError } = useAuthErrorHandler();
  
  // Use the useSession hook
  const { 
    session, 
    setSession,
    isSessionExpired,
    isLoading,
    setIsLoading,
    refreshSession,
    updateLastActivity
  } = useSession();
  
  // Get the user from the session
  const user = session?.user || null;
  
  // Load user profile
  const loadUserProfile = useCallback(async (userId: string) => {
    if (!userId) return;
    
    setIsProfileLoading(true);
    try {
      const profileData = await fetchUserProfile(userId);
      setProfile(profileData);
    } catch (error) {
      console.error('Unexpected error loading profile:', error);
    } finally {
      setIsProfileLoading(false);
    }
  }, []);
  
  // Refresh user profile
  const refreshProfile = useCallback(async () => {
    if (user) {
      await loadUserProfile(user.id);
    }
  }, [user, loadUserProfile]);
  
  // Update email verification status
  const updateEmailVerification = useCallback((user: User | null) => {
    if (user?.email_confirmed_at || user?.confirmed_at) {
      setIsEmailVerified(true);
    } else {
      setIsEmailVerified(false);
    }
  }, []);
  
  // Check if the user is an admin
  const isUserAdmin = !!profile?.role && profile.role === 'admin';
  
  // Sign out function
  const signOut = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      
      // Clear local state
      setProfile(null);
      
      // Redirect to home page
      navigate('/auth/login');
    } catch (error: any) {
      handleAuthError(error, {
        showToast: true,
        redirectTo: '/',
        logError: true
      });
    }
  }, [handleAuthError, navigate]);

  // Initialize auth state and set up listener
  useEffect(() => {
    // Load profile data whenever the user changes
    if (user && !profile) {
      loadUserProfile(user.id);
    }
    
    // Update email verification status
    updateEmailVerification(user);
  }, [user, profile, loadUserProfile, updateEmailVerification]);

  const value = {
    session,
    user,
    profile,
    isProfileLoading,
    isEmailVerified,
    authError,
    isLoading,
    isUserAdmin,
    refreshProfile,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
