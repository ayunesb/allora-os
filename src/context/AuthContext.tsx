
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useAuthState } from '@/hooks/useAuthState';
import { 
  handleSignIn, 
  handleSignUp, 
  handleSignOut,
  sendPasswordResetEmail,
  refreshSession as refreshSessionFunc
} from '@/services/authService';
import { navigate } from '@/utils/navigation';

// Create the context
export const AuthContext = createContext<any>(null);

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

  // Sign in function
  const signIn = async (email: string, password: string, rememberMe: boolean = false) => {
    const result = await handleSignIn(email, password, rememberMe);
    
    if (result.success) {
      // Let the auth state listener handle the redirect
      return { success: true };
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
      return { success: true };
    } else {
      toast.error(result.error || 'Failed to sign out');
      return { success: false, error: result.error };
    }
  };

  // Password reset
  const resetPassword = async (email: string) => {
    return await sendPasswordResetEmail(email);
  };

  // Refresh user profile
  const refreshProfile = async () => {
    if (user) {
      console.log("Refreshing profile for user:", user.id);
      await loadUserProfile(user.id);
      return true;
    }
    return false;
  };

  // Combined refresh function
  const refreshSession = async () => {
    const result = await refreshSessionFunc();
    if (result.session) {
      await refreshAuthStateSession();
      return true;
    }
    return false;
  };

  // Check for new user signup and redirect to onboarding
  useEffect(() => {
    const isNewUser = sessionStorage.getItem('newUserSignup') === 'true';
    
    if (isNewUser && user && !isLoading) {
      console.log("New user detected, navigating to onboarding");
      navigate('/onboarding');
      sessionStorage.removeItem('newUserSignup');
    }
  }, [user, isLoading]);

  // Create value object with userEmail to ensure it's always accessible
  const value = {
    user,
    session,
    profile,
    userEmail: user?.email, // Explicitly expose the email from the user object
    isLoading,
    isProfileLoading,
    isEmailVerified,
    authError,
    signIn,
    signUp,
    signOut,
    resetPassword,
    refreshProfile,
    refreshSession,
    updateLastActivity,
    setProfile,
    hasInitialized
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
