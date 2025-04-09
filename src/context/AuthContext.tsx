
import { createContext, useContext, ReactNode } from 'react';
import { useAuthState } from '@/hooks/useAuthState';
import { AuthContextType } from '@/types/auth';
import { 
  handleSignIn, 
  handleSignUp, 
  handleSignOut, 
  refreshSession,
  sendPasswordResetEmail,
  verifyOtpCode,
  updateUserPassword,
  handleGoogleSignIn,
  handleGitHubSignIn
} from '@/services/authService';
import { updateUserProfile as updateProfile } from '@/utils/profileHelpers';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { 
    user, 
    session, 
    isLoading, 
    profile, 
    isProfileLoading, 
    isEmailVerified,
    authError,
    isSessionExpired,
    loadUserProfile,
    setUser,
    setSession,
    refreshSession: refreshUserSession
  } = useAuthState();

  const refreshProfile = async () => {
    if (user?.id) {
      await loadUserProfile(user.id);
    }
  };
  
  const refreshUserAuth = async () => {
    try {
      return await refreshUserSession();
    } catch (error) {
      console.error('Error refreshing session:', error);
      return false;
    }
  };

  const updateUserProfile = async (data: Parameters<typeof updateProfile>[1]) => {
    if (!user?.id) return false;
    const result = await updateProfile(user.id, data);
    if (result) {
      await refreshProfile();
    }
    return result;
  };

  const sendPasswordReset = async (email: string) => {
    return await sendPasswordResetEmail(email);
  };

  const verifyOtp = async (email: string, token: string) => {
    return await verifyOtpCode(email, token);
  };

  const updatePassword = async (password: string) => {
    return await updateUserPassword(password);
  };

  const signInWithGoogle = async () => {
    return await handleGoogleSignIn();
  };

  const signInWithGitHub = async () => {
    return await handleGitHubSignIn();
  };
  
  const signOut = async () => {
    try {
      const result = await handleSignOut();
      if (result.success) {
        setUser(null);
        setSession(null);
      }
      return result;
    } catch (error) {
      console.error('Error in signOut:', error);
      return { success: false, error: 'Failed to sign out' };
    }
  };

  const value: AuthContextType = {
    user,
    session,
    isLoading,
    profile,
    isProfileLoading,
    isEmailVerified,
    authError,
    isSessionExpired,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut,
    refreshProfile,
    refreshSession: refreshUserAuth,
    updateUserProfile,
    sendPasswordReset,
    verifyOtp,
    updatePassword,
    signInWithGoogle,
    signInWithGitHub
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
