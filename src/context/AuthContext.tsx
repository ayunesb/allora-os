
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useAuthState } from '@/hooks/useAuthState';
import { 
  handleSignIn, 
  handleSignUp, 
  handleSignOut,
  handleGitHubSignIn,
  sendPasswordResetEmail,
  refreshSession as refreshSessionFunc
} from '@/services/authService';

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
    return await handleSignUp(email, password);
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

  // GitHub sign in
  const signInWithGitHub = async () => {
    return await handleGitHubSignIn();
  };

  // Password reset
  const resetPassword = async (email: string) => {
    return await sendPasswordResetEmail(email);
  };

  // Refresh user profile
  const refreshProfile = async () => {
    if (user) {
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

  // Create value object
  const value = {
    user,
    session,
    profile,
    isLoading,
    isProfileLoading,
    isEmailVerified,
    authError,
    signIn,
    signUp,
    signOut,
    signInWithGitHub,
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
