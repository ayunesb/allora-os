
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useAuthState } from '@/hooks/useAuthState';
import { 
  handleSignIn, 
  handleSignUp, 
  handleSignOut,
  sendPasswordResetEmail,
  refreshSession as refreshSessionFunc,
  verifyOtpCode,
  updateUserPassword
} from '@/services/authService';
import { navigate } from '@/utils/navigation';
import { supabase } from '@/integrations/supabase/client';
import { AuthContextType } from '@/types/auth';
import { UserProfile } from '@/utils/profileHelpers';

// Create the context
export const AuthContext = createContext<AuthContextType | null>(null);

// Create a hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth provider props type
interface AuthProviderProps {
  children: ReactNode;
}

// Auth provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { 
    user, 
    session, 
    profile,
    isLoading, 
    isProfileLoading,
    isEmailVerified,
    authError,
    loadUserProfile,
    refreshSession: refreshAuthStateSession,
    updateLastActivity,
    setProfile,
    hasInitialized
  } = useAuthState();
  
  const [isSessionExpired, setIsSessionExpired] = useState(false);

  // Calculate isAuthenticated based on user presence
  const isAuthenticated = !!user;

  // Sign in function
  const signIn = async (email: string, password: string, rememberMe: boolean = false) => {
    const result = await handleSignIn(email, password, rememberMe);
    
    if (result.success) {
      // Let the auth state listener handle the redirect
      return { success: true, user: result.user };
    } else {
      return { success: false, error: result.error };
    }
  };

  // Sign up function
  const signUp = async (email: string, password: string) => {
    const result = await handleSignUp(email, password);
    
    if (result.success && result.user) {
      // If we have a user object, load their profile
      await loadUserProfile(result.user.id);
      console.log("User signed up successfully, redirecting to onboarding soon");
      
      // Set a flag in sessionStorage to indicate this is a new user
      sessionStorage.setItem('newUserSignup', 'true');
      
      return { success: true, user: result.user };
    } else {
      return { success: false, error: result.error };
    }
  };

  // Sign out function
  const signOut = async () => {
    const result = await handleSignOut();
    
    if (result.success) {
      // Generate a new CSRF token after logout for security
      await regenerateCsrfToken();
      return { success: true };
    } else {
      toast.error(result.error || 'Failed to sign out');
      return { success: false, error: result.error };
    }
  };

  // Password reset
  const sendPasswordReset = async (email: string) => {
    return await sendPasswordResetEmail(email);
  };

  // Verify OTP token (for password reset)
  const verifyOtp = async (email: string, token: string) => {
    return await verifyOtpCode(email, token);
  };

  // Update password
  const updatePassword = async (password: string) => {
    return await updateUserPassword(password);
  };

  // Refresh user profile - change return type to void
  const refreshProfile = async (): Promise<void> => {
    if (user) {
      console.log("Refreshing profile for user:", user.id);
      await loadUserProfile(user.id);
    }
  };

  // Combined refresh function
  const refreshSession = async () => {
    try {
      const result = await refreshSessionFunc();
      if (result.session) {
        setIsSessionExpired(false);
        await refreshAuthStateSession();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Session refresh failed:", error);
      setIsSessionExpired(true);
      return false;
    }
  };

  // Generate a CSRF token
  const regenerateCsrfToken = async () => {
    try {
      const token = Math.random().toString(36).substring(2, 15) + 
                   Math.random().toString(36).substring(2, 15);
      sessionStorage.setItem('csrfToken', token);
      return token;
    } catch (error) {
      console.error("Error generating CSRF token:", error);
      return null;
    }
  };

  // Check for session expiration
  useEffect(() => {
    const checkSessionValidity = async () => {
      if (session) {
        const now = Math.floor(Date.now() / 1000);
        const expiresAt = session.expires_at;
        
        // If session is expired or about to expire in 5 minutes
        if (expiresAt && now > expiresAt - 300) {
          const refreshed = await refreshSession();
          if (!refreshed) {
            setIsSessionExpired(true);
          }
        }
      }
    };
    
    checkSessionValidity();
    
    // Set up interval to check session validity
    const interval = setInterval(checkSessionValidity, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [session]);

  // Check for new user signup and redirect to onboarding
  useEffect(() => {
    const isNewUser = sessionStorage.getItem('newUserSignup') === 'true';
    
    if (isNewUser && user && !isLoading) {
      console.log("New user detected, navigating to onboarding");
      navigate('/onboarding');
      sessionStorage.removeItem('newUserSignup');
    }
  }, [user, isLoading]);
  
  // Initialize CSRF token on auth state change
  useEffect(() => {
    if (user && !sessionStorage.getItem('csrfToken')) {
      regenerateCsrfToken();
    }
  }, [user]);

  // Function to convert Profile to UserProfile
  const updateUserProfile = async (data: Partial<Omit<UserProfile, 'id' | 'created_at'>>): Promise<boolean> => {
    if (!user?.id) return false;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id);
        
      if (error) throw error;
      
      // Update local profile
      if (profile) {
        const updatedProfile: UserProfile = {
          ...profile as unknown as UserProfile,
          ...data
        };
        setProfile(updatedProfile);
      }
      
      return true;
    } catch (error) {
      console.error("Error updating profile:", error);
      return false;
    }
  };

  // Create value object with userEmail to ensure it's always accessible
  const value: AuthContextType = {
    user,
    session,
    profile: profile as UserProfile | null,
    userEmail: user?.email,
    isLoading,
    isProfileLoading,
    isEmailVerified,
    authError,
    isSessionExpired,
    isAuthenticated,
    hasInitialized,
    signIn,
    signUp,
    signOut,
    sendPasswordReset,
    refreshProfile,
    refreshSession,
    updateUserProfile,
    verifyOtp,
    updatePassword,
    signInWithGoogle: async () => ({ success: false, error: "Not implemented" }),
    signInWithGitHub: async () => ({ success: false, error: "Not implemented" })
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
