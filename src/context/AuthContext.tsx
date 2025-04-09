
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
import { 
  handleSignIn, 
  handleSignUp, 
  handleSignOut, 
  handleGoogleSignIn,
  handleGitHubSignIn,
  sendPasswordResetEmail,
  verifyOtpCode,
  updateUserPassword
} from '@/services/authService';
import { AuthContextType } from '@/types/auth';

// Create the AuthContext with a default value
const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  profile: null,
  isProfileLoading: false,
  isEmailVerified: false,
  authError: null,
  isLoading: true,
  isSessionExpired: false,
  signIn: async () => ({ success: false }),
  signUp: async () => ({ success: false }),
  signOut: async () => ({ success: false }),
  refreshProfile: async () => {},
  refreshSession: async () => false,
  updateUserProfile: async () => false,
  sendPasswordReset: async () => ({ success: false }),
  verifyOtp: async () => ({ success: false }),
  updatePassword: async () => ({ success: false }),
  signInWithGoogle: async () => ({ success: false }),
  signInWithGitHub: async () => ({ success: false }),
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
  
  // Sign in function
  const signIn = async (email: string, password: string, rememberMe = false) => {
    try {
      const result = await handleSignIn(email, password, rememberMe);
      return result;
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };
  
  // Sign up function
  const signUp = async (email: string, password: string) => {
    try {
      const result = await handleSignUp(email, password);
      return result;
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };
  
  // Sign out function
  const signOut = useCallback(async () => {
    try {
      const result = await handleSignOut();
      
      if (!result.success) {
        throw new Error(result.error);
      }
      
      // Clear local state
      setProfile(null);
      
      // Redirect to home page
      navigate('/auth/login');
      return { success: true };
    } catch (error: any) {
      handleAuthError(error, {
        showToast: true,
        redirectTo: '/',
        logError: true
      });
      return { success: false, error: error.message };
    }
  }, [handleAuthError, navigate]);
  
  // Update user profile
  const updateUserProfile = async (data: Partial<Omit<UserProfile, 'id' | 'created_at'>>) => {
    try {
      if (!user) return false;
      
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id);
      
      if (error) throw error;
      
      // Refresh profile data
      await refreshProfile();
      return true;
    } catch (error) {
      console.error('Error updating profile:', error);
      return false;
    }
  };
  
  // Send password reset email
  const sendPasswordReset = async (email: string) => {
    try {
      return await sendPasswordResetEmail(email);
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };
  
  // Verify OTP
  const verifyOtp = async (email: string, token: string) => {
    try {
      return await verifyOtpCode(email, token);
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };
  
  // Update password
  const updatePassword = async (password: string) => {
    try {
      return await updateUserPassword(password);
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };
  
  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      return await handleGoogleSignIn();
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };
  
  // Sign in with GitHub
  const signInWithGitHub = async () => {
    try {
      return await handleGitHubSignIn();
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  // Initialize auth state and set up listener
  useEffect(() => {
    // Load profile data whenever the user changes
    if (user && !profile) {
      loadUserProfile(user.id);
    }
    
    // Update email verification status
    updateEmailVerification(user);
  }, [user, profile, loadUserProfile, updateEmailVerification]);

  const value: AuthContextType = {
    session,
    user,
    profile,
    isProfileLoading,
    isEmailVerified,
    authError,
    isLoading,
    isSessionExpired,
    signIn,
    signUp,
    signOut,
    refreshProfile,
    refreshSession,
    updateUserProfile,
    sendPasswordReset,
    verifyOtp,
    updatePassword,
    signInWithGoogle,
    signInWithGitHub,
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
